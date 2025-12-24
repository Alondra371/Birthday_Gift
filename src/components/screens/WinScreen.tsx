import { useEffect, useState } from "react";

interface WinScreenProps {
  onContinue: () => void;
}

type Piece = {
  id: number;
  left: number;
  delay: number;
  color: string;
  dur: number;
};

export function WinScreen({ onContinue }: WinScreenProps) {
  const [confetti, setConfetti] = useState<Piece[]>([]);

  // ✅ Precompute randomness ONCE so render stays pure
  useEffect(() => {
    const colors = ["#ffd93d", "#ffc1cc", "#b8d8f8", "#a8e6cf"];
    const pieces: Piece[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      dur: 3 + Math.random() * 2,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffd9e8 0%, #b8d8f8 20%, #a8e6cf 40%, #ffd93d 60%, #ffc1cc 80%, #e0c3fc 100%)",
      }}
    >
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            background: piece.color,
            animation: `fall ${piece.dur}s linear infinite`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Victory Message */}
      <div className="text-center z-10">
        <div className="mb-6 text-6xl animate-bounce">🏆</div>

        <div
          className="text-2xl font-bold mb-4 animate-pulse"
          style={{
            color: "#ffd93d",
            textShadow: `
              3px 3px 0 #c9a227,
              -2px -2px 0 #c9a227,
              2px -2px 0 #c9a227,
              -2px 2px 0 #c9a227,
              0 0 20px rgba(255,217,61,0.5)
            `,
          }}
        >
          VICTORY IS YOURS!!!
        </div>

        <div
          className="text-xl font-bold mb-2"
          style={{
            color: "#ffd93d",
            textShadow: "2px 2px 0 #c9a227",
          }}
        >
          Happy Birthday
        </div>

        <div
          className="text-3xl font-bold mb-4"
          style={{
            color: "#ff6b9d",
            textShadow: "2px 2px 0 #c9427f",
          }}
        >
          Ernesto!!
        </div>

        <div
          className="text-lg font-bold mb-6"
          style={{
            color: "#ffd93d",
            textShadow: "2px 2px 0 #c9a227",
          }}
        >
          HAVE A GREAT DAY!!
        </div>

        {/* Sparkles */}
        <div className="flex justify-center gap-4 mb-6 text-3xl">
          <span className="animate-spin" style={{ animationDuration: "3s" }}>
            ✨
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            🎉
          </span>
          <span
            className="animate-spin"
            style={{ animationDuration: "3s", animationDelay: "0.5s" }}
          >
            ✨
          </span>
        </div>

        {/* CONTINUE Button */}
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(145deg, #ffd93d, #ffe066)",
            border: "3px solid #f4d03f",
            color: "#8b6f47",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          CONTINUE ▶
        </button>

        <div
          className="mt-4 text-xs font-semibold animate-pulse"
          style={{ color: "#8b6f9e" }}
        >
          Press to view Credits
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
