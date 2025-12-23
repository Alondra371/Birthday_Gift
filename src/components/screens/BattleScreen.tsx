import { useState, useEffect } from 'react';
import { SnoopyCharacter } from '../SnoopyCharacter';
import type { CharacterEquipment } from '../GameBoy';

interface BattleScreenProps {
  equipment: CharacterEquipment;
  onWin: () => void;
  onLose: () => void;
  aButtonPressed: boolean;
  bButtonPressed: boolean;
}

export function BattleScreen({ equipment, onWin, onLose, aButtonPressed, bButtonPressed }: BattleScreenProps) {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [bossHealth, setBossHealth] = useState(100);
  const [timer, setTimer] = useState(99);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // Handle A button for attack
  useEffect(() => {
    if (aButtonPressed) {
      handleAttack();
    }
  }, [aButtonPressed]);

  // Handle B button for block
  useEffect(() => {
    if (bButtonPressed) {
      handleBlock();
    }
  }, [bButtonPressed]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (playerHealth <= 0) {
      setTimeout(() => onLose(), 2000);
    } else if (bossHealth <= 0) {
      setTimeout(() => onWin(), 2000);
    } else if (timer <= 0) {
      setTimeout(() => onLose(), 2000);
    }
  }, [playerHealth, bossHealth, timer, onWin, onLose]);

  useEffect(() => {
    // Boss auto-attack
    const bossInterval = setInterval(() => {
      if (playerHealth > 0 && bossHealth > 0) {
        setIsBossAttacking(true);
        const damage = Math.floor(Math.random() * 15) + 5;
        setPlayerHealth(prev => Math.max(0, prev - damage));
        setBattleLog(prev => [...prev.slice(-2), `Boss attacks! -${damage} HP`]);
        setTimeout(() => setIsBossAttacking(false), 300);
      }
    }, 3000);

    return () => clearInterval(bossInterval);
  }, [playerHealth, bossHealth]);

  const handleAttack = () => {
    if (isPlayerAttacking || playerHealth <= 0 || bossHealth <= 0) return;
    
    setIsPlayerAttacking(true);
    const damage = Math.floor(Math.random() * 20) + 10;
    setBossHealth(prev => Math.max(0, prev - damage));
    setBattleLog(prev => [...prev.slice(-2), `Snoopy attacks! -${damage} HP`]);
    setTimeout(() => setIsPlayerAttacking(false), 300);
  };

  const handleBlock = () => {
    if (playerHealth <= 0 || bossHealth <= 0) return;
    setBattleLog(prev => [...prev.slice(-2), 'Snoopy blocks!']);
  };

  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #ffd9e8 0%, #ffb3c1 100%)',
      }}
    >
      {/* Top HUD */}
      <div className="flex justify-between items-center px-3 py-2">
        {/* Player Health */}
        <div className="flex-1">
          <div className="text-xs font-bold mb-1" style={{ color: '#8b6f9e' }}>
            SNOOPY
          </div>
          <div 
            className="h-3 rounded-full overflow-hidden"
            style={{
              background: '#d4a5a5',
              border: '2px solid #f4d03f',
            }}
          >
            <div 
              className="h-full transition-all duration-300"
              style={{
                width: `${playerHealth}%`,
                background: playerHealth > 50 ? '#a8e6cf' : playerHealth > 25 ? '#ffe066' : '#ff6b6b',
              }}
            />
          </div>
          <div className="text-xs font-bold mt-1" style={{ color: '#8b6f9e' }}>
            {playerHealth}/100
          </div>
        </div>

        {/* Timer */}
        <div className="mx-4 text-center">
          <div 
            className="text-2xl font-bold"
            style={{
              color: timer < 10 ? '#ff6b6b' : '#ffd93d',
              textShadow: '1px 1px 0 #c9a227',
            }}
          >
            {timer}
          </div>
        </div>

        {/* Boss Health */}
        <div className="flex-1">
          <div className="text-xs font-bold mb-1 text-right" style={{ color: '#8b6f9e' }}>
            BIG MOM
          </div>
          <div 
            className="h-3 rounded-full overflow-hidden"
            style={{
              background: '#d4a5a5',
              border: '2px solid #f4d03f',
            }}
          >
            <div 
              className="h-full transition-all duration-300"
              style={{
                width: `${bossHealth}%`,
                background: '#ff6b6b',
              }}
            />
          </div>
          <div className="text-xs font-bold mt-1 text-right" style={{ color: '#8b6f9e' }}>
            {bossHealth}/100
          </div>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="flex-1 flex items-end justify-between px-4 pb-8">
        {/* Player - Left Side */}
        <div 
          className={`transition-transform duration-300 ${isPlayerAttacking ? 'translate-x-4' : ''}`}
        >
          <SnoopyCharacter 
            equipment={equipment} 
            size="medium" 
            animation={isPlayerAttacking ? 'attack' : 'stance'}
          />
        </div>

        {/* Boss */}
        <div 
          className={`transition-transform duration-300 ${isBossAttacking ? '-translate-x-4' : ''}`}
        >
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Big Mom inspired boss - cute pastel version */}
              <ellipse cx="50" cy="60" rx="30" ry="35" fill="#ffc1e3" stroke="#f4d03f" strokeWidth="2" />
              <ellipse cx="50" cy="35" rx="25" ry="28" fill="#ffc1e3" stroke="#f4d03f" strokeWidth="2" />
              
              {/* Crown */}
              <polygon points="30,25 35,15 40,25 45,15 50,25 55,15 60,25 65,15 70,25" fill="#ffd93d" stroke="#f4d03f" strokeWidth="2" />
              
              {/* Eyes */}
              <circle cx="40" cy="35" r="4" fill="#333" />
              <circle cx="60" cy="35" r="4" fill="#333" />
              
              {/* Mouth */}
              <path d="M 35 45 Q 50 55 65 45" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
              
              {/* Arms */}
              <ellipse cx="20" cy="60" rx="8" ry="15" fill="#ffc1e3" stroke="#f4d03f" strokeWidth="2" />
              <ellipse cx="80" cy="60" rx="8" ry="15" fill="#ffc1e3" stroke="#f4d03f" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div 
        className="mx-3 mb-2 p-2 rounded-lg"
        style={{
          background: 'rgba(255,255,255,0.7)',
          border: '2px solid #f4d03f',
          minHeight: '40px',
        }}
      >
        {battleLog.map((log, index) => (
          <div key={index} className="text-xs font-semibold" style={{ color: '#8b6f9e' }}>
            {log}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 pb-3 px-3">
        <button
          onClick={handleAttack}
          disabled={isPlayerAttacking}
          className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          style={{
            background: 'linear-gradient(145deg, #ff6b6b, #ff5252)',
            border: '2px solid #f4d03f',
            color: '#fff',
          }}
        >
          ⚔️ Attack (A)
        </button>
        
        <button
          onClick={handleBlock}
          className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(145deg, #a8e6cf, #88d4ab)',
            border: '2px solid #f4d03f',
            color: '#2d5016',
          }}
        >
          🛡️ Block (B)
        </button>
      </div>
    </div>
  );
}