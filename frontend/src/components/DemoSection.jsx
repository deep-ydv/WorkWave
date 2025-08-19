import { useRef, useState } from "react";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";

export default function DemoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0); // % progress

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip forward/back
  const skip = (seconds) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  // Playback speed toggle
  const changeSpeed = () => {
    if (!videoRef.current) return;
    let newRate = playbackRate === 2 ? 0.5 : playbackRate + 0.5;
    videoRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  // Seek when dragging progress bar
  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const newTime =
      (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
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
            <div id="Demo" className="relative bg-gray-800 rounded-t-xl p-2 shadow-2xl">
              <div className="bg-gray-700 rounded-t-lg p-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-black rounded-b-lg relative overflow-hidden">
                {/* Video */}
                <video
                  ref={videoRef}
                  src="/taskwavedemo.mp4"
                  className="w-full h-auto object-cover aspect-video"
                  onTimeUpdate={handleTimeUpdate}
                />

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-4 py-3">
                  {/* Progress Bar */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1 mb-2 accent-blue-500 cursor-pointer"
                  />

                  {/* Buttons */}
                  <div className="flex justify-center gap-6 items-center">
                    <button
                      onClick={() => skip(-10)}
                      className="text-white hover:text-blue-400"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-green-400"
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
                    >
                      <RotateCw className="w-6 h-6" />
                    </button>
                    <button
                      onClick={changeSpeed}
                      className="text-white hover:text-yellow-400 text-sm font-medium px-2 border border-white/30 rounded"
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
