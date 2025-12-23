interface LoseScreenProps {
  onContinue: () => void;
}

export function LoseScreen({ onContinue }: LoseScreenProps) {
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6e5a7d 0%, #9b89b3 100%)',
      }}
    >
      {/* Floating ghosts */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + (i % 2) * 30}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          👻
        </div>
      ))}

      {/* Defeat Message */}
      <div className="text-center z-10">
        <div className="mb-6 text-6xl animate-bounce">
          😈
        </div>

        <div 
          className="text-lg font-bold mb-4"
          style={{
            color: '#ffd93d',
            textShadow: '2px 2px 0 #8b4513',
          }}
        >
          Father Time has beaten you…
        </div>

        <div 
          className="text-xl font-bold mb-6 italic"
          style={{
            color: '#ffb3c1',
            textShadow: '2px 2px 0 #8b4757',
          }}
        >
          and it showsss hehehe
        </div>

        <div 
          className="text-2xl font-bold mb-2"
          style={{
            color: '#ffd93d',
            textShadow: '2px 2px 0 #c9a227',
          }}
        >
          HAPPY BIRTHDAY
        </div>

        <div 
          className="text-3xl font-bold mb-6"
          style={{
            color: '#ff9eb3',
            textShadow: '2px 2px 0 #c97a8f',
          }}
        >
          VIEJITO! 👴
        </div>

        {/* Playful elements */}
        <div className="flex justify-center gap-4 mb-6 text-2xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎂</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎈</span>
        </div>

        {/* CONTINUE Button */}
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(145deg, #ffd93d, #ffe066)',
            border: '3px solid #f4d03f',
            color: '#8b6f47',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          CONTINUE ▶
        </button>

        <div className="mt-4 text-xs font-semibold animate-pulse" style={{ color: '#d4a5d4' }}>
          Press to view Credits
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
