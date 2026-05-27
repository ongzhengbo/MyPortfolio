import { useState, useRef, useEffect, useCallback } from 'react';
import { DEMO_REEL_PLAYLIST } from '@/data/apps';

export default function DemoReelApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(DEMO_REEL_PLAYLIST[0].title);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const playVideo = useCallback(
    (index: number) => {
      const item = DEMO_REEL_PLAYLIST[index];
      if (videoRef.current) {
        videoRef.current.src = item.src;
        setCurrentTitle(item.title);
        setCurrentIndex(index);
        setVideoError(false);
        videoRef.current.play().catch(() => {
          setVideoError(true);
        });
      }
    },
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % DEMO_REEL_PLAYLIST.length;
      playVideo(nextIndex);
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Start playing
    playVideo(0);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [currentIndex, playVideo]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#000',
          display: 'block',
        }}
        autoPlay
        playsInline
        controls
      />

      {/* Title overlay */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            padding: '8px 14px',
            borderRadius: 2,
          }}
        >
          <span
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: '"Segoe UI", sans-serif',
            }}
          >
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Video error / no video fallback */}
      {videoError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a',
            zIndex: 3,
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              fontFamily: '"Segoe UI", sans-serif',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 16, marginBottom: 8 }}>
              Demo Reel — {currentTitle}
            </p>
            <p>Video files not available in this demo</p>
            <p style={{ fontSize: 12, marginTop: 8, color: 'rgba(255,255,255,0.3)' }}>
              Expected: /Videos/wahhotsia.mp4, /Videos/intothecanvas.mp4, /Videos/vestige.mp4
            </p>
          </div>
        </div>
      )}

      {/* Playlist controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          gap: 8,
        }}
      >
        {DEMO_REEL_PLAYLIST.map((item, index) => (
          <button
            key={item.title}
            onClick={() => playVideo(index)}
            style={{
              padding: '4px 12px',
              background:
                index === currentIndex
                  ? 'rgba(0,120,215,0.8)'
                  : 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: 2,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: '"Segoe UI", sans-serif',
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
