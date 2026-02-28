import React, { useEffect, useState } from 'react';

export default function UpdateModal() {
  const [updateInfo, setUpdateInfo] = useState<{
    version: string;
    isPortable: boolean;
  } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cleanup1 = window.api.updater.onAvailable((data) => {
      setUpdateInfo({
        version: data.version,
        isPortable: !!data.isPortable,
      });
    });

    const cleanup2 = window.api.updater.onProgress((data) => {
      setProgress(Math.round(data.percent));
    });

    const cleanup3 = window.api.updater.onDownloaded(() => {
      setIsDownloading(false);
      setIsReady(true);
    });

    const cleanup4 = window.api.updater.onError((data) => {
      setError(data.message);
      setIsDownloading(false);
    });

    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
    };
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    setError(null);
    try {
      await window.api.updater.startDownload();
    } catch (err: any) {
      setError(err.message || 'Download failed');
      setIsDownloading(false);
    }
  };

  const handleInstall = () => {
    window.api.updater.installNow();
  };

  if (!updateInfo) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-zinc-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shrink-0">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Update Required</h2>
            <p className="text-sm text-zinc-400">Version {updateInfo.version}</p>
          </div>
        </div>

        {/* Portable: no download/install, just a link */}
        {updateInfo.isPortable ? (
          <div>
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-300">
              You're using the <strong>portable version</strong>. Auto-install is not supported — please download the new version manually.
            </div>
            <button
              onClick={() => window.api.updater.openReleases()}
              className="w-full rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white hover:from-violet-600 hover:to-fuchsia-600 transition"
            >
              Download on GitHub
            </button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            {isDownloading && (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Downloading...</span>
                  <span className="font-semibold text-violet-400">{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!isReady && !isDownloading && !error && (
                <button
                  onClick={handleDownload}
                  className="flex-1 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white hover:from-violet-600 hover:to-fuchsia-600 transition"
                >
                  Download Update
                </button>
              )}

              {!isReady && !isDownloading && error && (
                <button
                  onClick={handleDownload}
                  className="flex-1 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white hover:from-violet-600 hover:to-fuchsia-600 transition"
                >
                  Retry Download
                </button>
              )}

              {isReady && (
                <button
                  onClick={handleInstall}
                  className="flex-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 font-semibold text-white hover:from-emerald-600 hover:to-green-600 transition"
                >
                  Install Now & Restart
                </button>
              )}
            </div>
          </>
        )}

        <p className="mt-4 text-center text-xs text-zinc-500">
          You must update to continue using DBD Timer.
        </p>
      </div>
    </div>
  );
}
