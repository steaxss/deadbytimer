param(
  [Parameter(Mandatory = $true)]
  [int]$RootProcessId,
  [int]$SampleSeconds = 60
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$artifactDirectory = Join-Path $root 'perf\artifacts\soak-8h'
$soakReportPath = Join-Path $artifactDirectory 'report.json'
$outputPath = Join-Path $artifactDirectory 'process-monitor.json'
$temporaryPath = "$outputPath.tmp"
$soak = Get-Content -LiteralPath $soakReportPath -Raw | ConvertFrom-Json
$deadline = ([DateTimeOffset]::Parse($soak.startedAt)).AddMilliseconds([double]$soak.durationMs)
$startedAt = [DateTimeOffset]::Now
$samples = @()

function Get-ProcessTree([int]$ParentId) {
  $ids = @($ParentId)
  $changed = $true
  while ($changed) {
    $changed = $false
    $children = Get-CimInstance Win32_Process | Where-Object {
      $ids -contains $_.ParentProcessId -and $ids -notcontains $_.ProcessId
    }
    foreach ($child in $children) {
      $ids += [int]$child.ProcessId
      $changed = $true
    }
  }
  return $ids
}

function Get-ProcessType($CimProcess, [int]$ParentId) {
  if ($CimProcess.ProcessId -eq $ParentId) { return 'Browser' }
  if ($CimProcess.CommandLine -match '--type=([^ ]+)') { return $Matches[1] }
  return 'Child'
}

function Write-Checkpoint([string]$Status, $ErrorText = $null) {
  $payload = [ordered]@{
    status = $Status
    error = $ErrorText
    rootProcessId = $RootProcessId
    startedAt = $startedAt.ToString('o')
    updatedAt = [DateTimeOffset]::Now.ToString('o')
    deadline = $deadline.ToString('o')
    sampleSeconds = $SampleSeconds
    samples = $samples
  }
  $payload | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $temporaryPath -Encoding utf8
  Move-Item -LiteralPath $temporaryPath -Destination $outputPath -Force
}

try {
  while ([DateTimeOffset]::Now -lt $deadline) {
    $cim = Get-CimInstance Win32_Process
    $treeIds = Get-ProcessTree $RootProcessId
    $metrics = @()
    foreach ($processId in $treeIds) {
      $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
      $cimProcess = $cim | Where-Object { $_.ProcessId -eq $processId } | Select-Object -First 1
      if (-not $process -or -not $cimProcess) { continue }
      $metrics += [ordered]@{
        pid = $processId
        type = Get-ProcessType $cimProcess $RootProcessId
        handles = $process.HandleCount
        threads = $process.Threads.Count
        privateBytes = $process.PrivateMemorySize64
        workingSetBytes = $process.WorkingSet64
      }
    }
    $samples += [ordered]@{
      at = [DateTimeOffset]::Now.ToString('o')
      processes = $metrics
    }
    Write-Checkpoint 'running'
    if (-not (Get-Process -Id $RootProcessId -ErrorAction SilentlyContinue)) { break }
    Start-Sleep -Seconds $SampleSeconds
  }
  Write-Checkpoint 'complete'
} catch {
  Write-Checkpoint 'failed' $_.Exception.ToString()
  exit 1
}
