import { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";

export default function DemoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0); // 0..100
  const [showControls, setShowControls] = useState(false);
  const hideTimerRef = useRef(null);

  // --- helpers for control visibility ---
  const revealControls = () => {
    setShowControls(true);
    // reset inactivity timer
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const hideControls = () => {
    // don't hide immediately on desktop hover leave if user is interacting with slider
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(false);
  };

  // show controls briefly when play/pause/seek happens
  const pingControls = () => revealControls();

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // --- player actions ---
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
    pingControls();
  };

  const skip = (seconds) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
    pingControls();
  };

  const changeSpeed = () => {
    if (!videoRef.current) return;
    const newRate = playbackRate === 2 ? 0.5 : playbackRate + 0.5; // 0.5→1→1.5→2
    videoRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
    pingControls();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p || 0);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const val = Number(e.target.value);
    const newTime = (val / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(val);
    pingControls();
  };

  // click anywhere on the frame to toggle controls (good for mobile)
  const handleFrameClick = () => {
    if (showControls) {
      // if visible, keep them up for longer
      revealControls();
    } else {
      setShowControls(true);
      revealControls();
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-gray-950 border-gray-200">
            See TaskWave in Action
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Watch how easy it is to manage tasks
          </h2>
          <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
            See TaskWave in action - from creating tasks to real-time team collaboration
          </p>
        </div>

        {/* MacBook Demo Video */}
        <div className="relative max-w-6xl mx-auto mb-20">
          <div className="relative">
            {/* MacBook Frame */}
            <div
              id="Demo"
              className="relative bg-gray-800 rounded-t-xl p-2 shadow-2xl"
            >
              <div className="bg-gray-700 rounded-t-lg p-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Video area */}
              <div
                className="bg-black rounded-b-lg relative overflow-hidden group"
                onMouseEnter={revealControls}
                onMouseLeave={hideControls}
                onClick={handleFrameClick}
              >
                <video
                  ref={videoRef}
                  src="/taskwavedemo.mp4"
                  className="w-full h-auto object-cover aspect-video"
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => { setIsPlaying(true); pingControls(); }}
                  onPause={() => { setIsPlaying(false); pingControls(); }}
                />

                {/* Controls overlay */}
                <div
                  className={[
                    "absolute bottom-0 left-0 right-0 bg-black/55 backdrop-blur-sm px-4 py-3 transition-opacity duration-200",
                    showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                  ].join(" ")}
                  onMouseMove={revealControls} // keeps them visible while moving
                >
                  {/* Progress Bar */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    onMouseDown={revealControls}
                    onTouchStart={revealControls}
                    className="w-full h-1 mb-2 accent-blue-500 cursor-pointer"
                  />

                  {/* Buttons */}
                  <div className="flex justify-center gap-6 items-center select-none">
                    <button
                      onClick={() => skip(-10)}
                      className="text-white hover:text-blue-400"
                      aria-label="Rewind 10 seconds"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-green-400"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7" />
                      ) : (
                        <Play className="w-7 h-7" />
                      )}
                    </button>

                    <button
                      onClick={() => skip(10)}
                      className="text-white hover:text-blue-400"
                      aria-label="Forward 10 seconds"
                    >
                      <RotateCw className="w-6 h-6" />
                    </button>

                    <button
                      onClick={changeSpeed}
                      className="text-white hover:text-yellow-400 text-sm font-medium px-2 border border-white/30 rounded"
                      aria-label="Change playback speed"
                    >
                      {playbackRate}x
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* MacBook Base */}
            <div className="bg-gray-300 h-6 rounded-b-xl mx-auto" style={{ width: "60%" }}></div>
            <div className="bg-gray-400 h-2 rounded-full mx-auto mt-1" style={{ width: "20%" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
