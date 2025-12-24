import { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  top: number;
  left: number;
  dur: number;
  delay: number;
  opacity: number;
};

export function SplashScreen() {
  const [shimmer, setShimmer] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // ✅ Generate ONCE so render stays pure
  useEffect(() => {
    setSparkles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        dur: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.4,
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #b8d8f8 0%, #a8c8e8 100%)",
      }}
    >
      {/* Sparkles Background */}
      <div className="absolute inset-0">
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute text-yellow-300"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animation: `twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              opacity: s.opacity,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <div
          className="text-3xl font-bold mb-4 animate-pulse"
          style={{
            color: "#ffd93d",
            textShadow: `
              3px 3px 0 #c9a227,
              -2px -2px 0 #c9a227,
              2px -2px 0 #c9a227,
              -2px 2px 0 #c9a227,
              0 0 20px rgba(255, 217, 61, ${0.3 + shimmer / 200})
            `,
          }}
        >
          🎉 B-Day Gift 🎉
        </div>

        <div
          className="text-lg font-semibold mb-2"
          style={{
            color: "#ffd93d",
            textShadow: "2px 2px 0 #c9a227, -1px -1px 0 #c9a227",
          }}
        >
          Loading…
        </div>

        <div
          className="text-sm font-bold animate-bounce"
          style={{
            color: "#ffd93d",
            textShadow: "1px 1px 0 #c9a227",
          }}
        >
          Press START to continue
        </div>
      </div>

      {/* Loading Bar */}
      <div
        className="w-48 h-3 rounded-full overflow-hidden"
        style={{
          background: "#8b7ba8",
          border: "2px solid #f4d03f",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #ffd93d, #ffe066)",
            width: "100%",
          }}
        />
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
