param(
  [int]$Runs = 5,
  [int]$WarmupMilliseconds = 500,
  [int]$DurationSeconds = 5,
  [string]$ExecutablePath = '',
  [string]$OutputPath = ''
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$candidate = if ($ExecutablePath) { $ExecutablePath } else { Join-Path $root 'native\xinput_bridge.exe' }
$executable = (Resolve-Path $candidate).Path
$samples = @()

for ($run = 1; $run -le $Runs; $run += 1) {
  $process = Start-Process -FilePath $executable -PassThru -WindowStyle Hidden
  try {
    Start-Sleep -Milliseconds $WarmupMilliseconds
    $process.Refresh()
    $cpuStart = $process.TotalProcessorTime.TotalMilliseconds
    $timer = [System.Diagnostics.Stopwatch]::StartNew()
    Start-Sleep -Seconds $DurationSeconds
    $timer.Stop()
    $process.Refresh()
    $cpuMilliseconds = $process.TotalProcessorTime.TotalMilliseconds - $cpuStart
    $samples += [PSCustomObject]@{
      Run = $run
      WallMilliseconds = [Math]::Round($timer.Elapsed.TotalMilliseconds, 3)
      CpuMilliseconds = [Math]::Round($cpuMilliseconds, 3)
      OneCorePercent = [Math]::Round(($cpuMilliseconds / $timer.Elapsed.TotalMilliseconds) * 100, 4)
      WorkingSetMegabytes = [Math]::Round($process.WorkingSet64 / 1MB, 3)
      ThreadCount = $process.Threads.Count
    }
  }
  finally {
    if (-not $process.HasExited) {
      Stop-Process -Id $process.Id -Force
    }
  }
}

$cpuValues = @($samples | ForEach-Object { $_.OneCorePercent } | Sort-Object)
$memoryValues = @($samples | ForEach-Object { $_.WorkingSetMegabytes } | Sort-Object)
$summary = [PSCustomObject]@{
  Timestamp = (Get-Date).ToString('o')
  Executable = $executable
  Sha256 = (Get-FileHash -LiteralPath $executable -Algorithm SHA256).Hash
  Runs = $Runs
  DurationSeconds = $DurationSeconds
  CpuOneCoreMeanPercent = [Math]::Round(($cpuValues | Measure-Object -Average).Average, 4)
  CpuOneCoreMedianPercent = $cpuValues[[Math]::Floor($cpuValues.Count / 2)]
  CpuOneCoreMaximumPercent = $cpuValues[-1]
  WorkingSetMeanMegabytes = [Math]::Round(($memoryValues | Measure-Object -Average).Average, 3)
  WorkingSetMaximumMegabytes = $memoryValues[-1]
}

$resolvedOutput = if ($OutputPath) { $OutputPath } else { Join-Path $root 'perf\artifacts\phase-0\metrics\xinput-bridge.json' }
$outputDirectory = Split-Path -Parent $resolvedOutput
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
@{ summary = $summary; samples = $samples } |
  ConvertTo-Json -Depth 5 |
  Set-Content -LiteralPath $resolvedOutput -Encoding utf8

$summary | Format-List
$samples | Format-Table -AutoSize
