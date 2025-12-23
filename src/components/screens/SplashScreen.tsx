import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [shimmer, setShimmer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #b8d8f8 0%, #a8c8e8 100%)',
      }}
    >
      {/* Sparkles Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6,
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
            color: '#ffd93d',
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
            color: '#ffd93d',
            textShadow: '2px 2px 0 #c9a227, -1px -1px 0 #c9a227',
          }}
        >
          Loading…
        </div>

        <div 
          className="text-sm font-bold animate-bounce"
          style={{
            color: '#ffd93d',
            textShadow: '1px 1px 0 #c9a227',
          }}
        >
          Press START to continue
        </div>
      </div>

      {/* Loading Bar - Visual only, no auto-advance */}
      <div 
        className="w-48 h-3 rounded-full overflow-hidden"
        style={{
          background: '#8b7ba8',
          border: '2px solid #f4d03f',
        }}
      >
        <div 
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #ffd93d, #ffe066)',
            width: '100%',
          }}
        />
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}