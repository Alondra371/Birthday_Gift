interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div 
      className="w-full h-full flex items-center justify-center p-8"
      style={{
        background: 'linear-gradient(135deg, #e0c3fc 0%, #d5c3e8 100%)',
      }}
    >
      <button
        onClick={onStart}
        className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95"
        style={{
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <div 
          className="rounded-2xl p-6 text-center"
          style={{
            background: 'linear-gradient(145deg, #ffc1cc, #ffb3c1)',
            border: '3px solid #f4d03f',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2), 0 0 20px rgba(244,208,63,0.3)',
          }}
        >
          <div className="text-4xl mb-2">🎂</div>
          <div 
            className="text-xl font-bold mb-1"
            style={{
              color: '#ffd93d',
              textShadow: '2px 2px 0 #c9a227, -1px -1px 0 #c9a227, 1px -1px 0 #c9a227, -1px 1px 0 #c9a227',
            }}
          >
            Happy Birthday
          </div>
          <div className="text-xs font-semibold" style={{ color: '#8b6f9e' }}>
            Press START ▶
          </div>
        </div>

        {/* Confetti */}
        <div className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '3s' }}>
          ✨
        </div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
          🎉
        </div>
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}