"use client";

import { useRef, useState, useEffect } from "react";

export function ComingSoonVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const updateVideoSrc = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isHighRes =
        window.devicePixelRatio >= 2 || window.innerWidth >= 2560;

      let src = "";
      if (isPortrait) {
        // Vertical video for mobile/portrait
        src = isHighRes
          ? "/videos/AVA_Vertical_3840x2160.mp4"
          : "/videos/AVA_Vertical_1080x1920.mp4";
      } else {
        // Horizontal video for desktop/landscape
        src = isHighRes
          ? "/videos/AVA_Horizontal_3840x2160.mp4"
          : "/videos/AVA_Horizontal_1920x1080.mp4";
      }

      setVideoSrc(src);
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!videoSrc) return null;

  return (
    <>
      <video
        ref={videoRef}
        key={videoSrc}
        className="h-auto w-auto max-h-dvh max-w-full object-contain"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-8 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          // Muted icon
          <svg
            className="w-6 h-6 text-[#9f8560]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          // Unmuted icon
          <svg
            className="w-6 h-6 text-[#9f8560]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </>
  );
}
