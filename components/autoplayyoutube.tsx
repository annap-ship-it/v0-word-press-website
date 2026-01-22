"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface AutoPlayYouTubeProps {
  videoId: string;          // "lfoiSdUgsX0"
  title?: string;           // "Idea Team Intro"
  className?: string;
}

function AutoPlayYouTube({
  videoId,
  title = "Video",
  className = "",
}: AutoPlayYouTubeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5,          // 50% видимості → запуск
    triggerOnce: false,      // можна запускати/паузити багато разів
    rootMargin: "0px",       // без додаткового відступу
  });

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const srcBase = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&controls=1&playsinline=1`;

    // Оновлюємо src тільки раз (щоб уникнути перезавантаження)
    if (!iframe.src) {
      iframe.src = srcBase;
    }

    // Функції керування через YouTube IFrame API
    const playVideo = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "playVideo" }),
          "*"
        );
      }
    };

    const pauseVideo = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo" }),
          "*"
        );
      }
    };

    if (inView) {
      playVideo();
    } else {
      pauseVideo();
    }

    // Очищення не потрібна, бо ref живий
  }, [inView, videoId]);

  return (
    <div 
      ref={ref} 
      className={`relative w-full aspect-video max-w-[975px] mx-auto ${className}`}
    >
      <iframe
        ref={iframeRef}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
      />
    </div>
  );
}

export { AutoPlayYouTube };
export default AutoPlayYouTube;
