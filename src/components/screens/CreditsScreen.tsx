import { useEffect, useState } from 'react';

const CREDITS = [
  { label: 'Creator', value: 'Alondra Castro' },
  { label: 'Illustrator', value: 'Figma' },
  { label: 'Game Director', value: 'My sleepless nights' },
  { label: 'QA', value: 'Coffee ☕' },
  { label: 'Special Thanks', value: 'Ernesto 🎂' },
  { label: 'Powered By', value: 'Care, birthday magic,' },
  { label: '', value: 'and nostalgia ✨' },
];

interface CreditsScreenProps {
  onReturnHome: () => void;
}

export function CreditsScreen({ onReturnHome }: CreditsScreenProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
      }}
    >
      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-yellow-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.6,
          }}
        >
          ✨
        </div>
      ))}

      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <div 
          className="text-2xl font-bold mb-2"
          style={{
            color: '#ffd93d',
            textShadow: '2px 2px 0 #c9a227',
          }}
        >
          🎮 CREDITS 🎮
        </div>
      </div>

      {/* Scrolling Credits */}
      <div 
        className="absolute left-0 right-0 flex flex-col items-center gap-6 py-8"
        style={{
          transform: `translateY(${Math.max(-offset, -600)}px)`,
        }}
      >
        <div className="h-32" /> {/* Spacer */}
        
        {CREDITS.map((credit, index) => (
          <div key={index} className="text-center px-4">
            {credit.label && (
              <div 
                className="text-sm font-bold mb-1"
                style={{
                  color: '#b8d8f8',
                  textShadow: '1px 1px 0 #f4d03f',
                }}
              >
                {credit.label}
              </div>
            )}
            <div 
              className="text-lg font-bold"
              style={{
                color: '#ffd93d',
                textShadow: '2px 2px 0 #c9a227',
              }}
            >
              {credit.value}
            </div>
          </div>
        ))}

        <div className="mt-12 text-center">
          <div className="text-4xl mb-4">🎂</div>
          <div 
            className="text-xl font-bold mb-4"
            style={{
              color: '#ffc1cc',
              textShadow: '2px 2px 0 #c97a8f',
            }}
          >
            Thank you for playing!
          </div>
          
          {/* SELECT Button */}
          <button
            onClick={onReturnHome}
            className="px-8 py-3 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 mb-2"
            style={{
              background: 'linear-gradient(145deg, #a8e6cf, #88d4ab)',
              border: '3px solid #f4d03f',
              color: '#2d5016',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            SELECT - Return to Home
          </button>
          
          <div 
            className="text-xs font-semibold animate-pulse"
            style={{
              color: '#b8d8f8',
            }}
          >
            Press SELECT to restart
          </div>
        </div>

        <div className="h-64" /> {/* Bottom spacer */}
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