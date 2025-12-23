import { useState, useEffect } from 'react';
import type { CharacterEquipment } from './GameBoy';
import { SnoopySprite } from './SnoopySprites';

interface SnoopyCharacterProps {
  equipment: CharacterEquipment;
  size?: 'small' | 'medium' | 'large';
  animation?: 'stance' | 'walk' | 'jump' | 'attack' | 'hurt' | 'defeat';
}

export function SnoopyCharacter({ 
  equipment, 
  size = 'medium',
  animation = 'stance'
}: SnoopyCharacterProps) {
  const [frame, setFrame] = useState(0);

  // Animation frame counts and speeds
  const animations = {
    stance: { frames: 2, speed: 500 },
    walk: { frames: 4, speed: 150 },
    jump: { frames: 2, speed: 300 },
    attack: { frames: 3, speed: 200 },
    hurt: { frames: 2, speed: 200 },
    defeat: { frames: 2, speed: 500 },
  };

  const currentAnim = animations[animation];

  // Animation frame cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % currentAnim.frames);
    }, currentAnim.speed);

    return () => clearInterval(interval);
  }, [animation, currentAnim.frames, currentAnim.speed]);

  // Pixel-perfect scaling
  const sizeMap = {
    small: 48,   // 1.5x scale
    medium: 64,  // 2x scale
    large: 96,   // 3x scale
  };

  const spriteSize = sizeMap[size];

  return (
    <div 
      className="relative inline-block"
      style={{
        width: `${spriteSize}px`,
        height: `${spriteSize}px`,
        imageRendering: 'pixelated',
      }}
    >
      {/* Base Snoopy Sprite */}
      <div
        style={{
          width: `${spriteSize}px`,
          height: `${spriteSize}px`,
          imageRendering: 'pixelated',
        }}
      >
        <SnoopySprite frame={frame} animation={animation} />
      </div>

      {/* Accessory Overlays - drawn on top */}
      <div className="absolute inset-0 pointer-events-none">
        {equipment.head && renderHeadAccessory(equipment.head, spriteSize)}
        {equipment.body && renderBodyAccessory(equipment.body, spriteSize)}
        {equipment.feet && renderFeetAccessory(equipment.feet, spriteSize)}
      </div>
    </div>
  );
}

// Accessory rendering - pixel art overlays that look worn
function renderHeadAccessory(id: string, size: number) {
  if (id === 'luffy-hat') {
    return (
      <svg 
        viewBox="0 0 32 32" 
        width={size} 
        height={size}
        style={{ imageRendering: 'pixelated' }}
        className="absolute inset-0"
      >
        {/* Straw hat sitting on head */}
        <ellipse cx="15" cy="8" rx="9" ry="3" fill="#ffe8b3" stroke="#d4a574" strokeWidth="1.5" />
        <ellipse cx="15" cy="8" rx="7" ry="2" fill="#fff4d6" opacity="0.6" />
        <path d="M 6 8 L 7 11 L 23 11 L 24 8" fill="#f4d4a0" stroke="#d4a574" strokeWidth="1.5" />
        {/* Ribbon wrapping around */}
        <ellipse cx="15" cy="11" rx="8" ry="1.5" fill="#ffb3ba" stroke="#ff8a94" strokeWidth="1" />
        <circle cx="13" cy="11" r="0.4" fill="#fff" opacity="0.8" />
        <circle cx="17" cy="11" r="0.4" fill="#fff" opacity="0.8" />
      </svg>
    );
  }
  
  if (id === 'zoro-bandana') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Bandana wrapped around head */}
        <ellipse cx="15" cy="9" rx="8" ry="2.5" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1.5" />
        <rect x="7" y="9" width="16" height="3" rx="0.5" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1.5" />
        <ellipse cx="15" cy="10" rx="7" ry="1" fill="#c7f5de" opacity="0.5" />
        {/* Knot on side */}
        <circle cx="23" cy="10" r="2" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1.5" />
        <circle cx="24" cy="9" r="1.2" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1" />
        <circle cx="22" cy="11" r="1.2" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1" />
        <circle cx="23" cy="10" r="0.4" fill="#fff" opacity="0.7" />
      </svg>
    );
  }
  
  if (id === 'usopp-goggles') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Goggles on face */}
        <circle cx="12" cy="11" r="3" fill="#ffd9a3" opacity="0.3" stroke="#d4a574" strokeWidth="1.5" />
        <circle cx="18" cy="11" r="3" fill="#ffd9a3" opacity="0.3" stroke="#d4a574" strokeWidth="1.5" />
        {/* Glass shine */}
        <circle cx="11" cy="10" r="0.8" fill="#fff" opacity="0.8" />
        <circle cx="17" cy="10" r="0.8" fill="#fff" opacity="0.8" />
        <ellipse cx="13" cy="11.5" rx="0.4" ry="0.8" fill="#fff" opacity="0.5" />
        <ellipse cx="19" cy="11.5" rx="0.4" ry="0.8" fill="#fff" opacity="0.5" />
        {/* Bridge */}
        <rect x="14.5" y="10.5" width="1" height="1" rx="0.3" fill="#d4a574" stroke="#b8936a" strokeWidth="0.8" />
        {/* Strap wrapping around head */}
        <path d="M 9 11 Q 7 10 6 11" stroke="#d4a574" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 21 11 Q 23 10 24 11" stroke="#d4a574" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  
  if (id === 'usopp-bandana') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Bandana wrapped on forehead */}
        <ellipse cx="15" cy="9" rx="7" ry="1.5" fill="#f4e4c1" stroke="#d4c5a0" strokeWidth="1.5" />
        <rect x="8" y="9" width="14" height="2" rx="0.5" fill="#f4e4c1" stroke="#d4c5a0" strokeWidth="1.5" />
        <rect x="9" y="9.5" width="12" height="0.8" fill="#fffef5" opacity="0.5" />
        {/* Star emblem */}
        <circle cx="15" cy="10" r="1.2" fill="#ffd93d" stroke="#e6c236" strokeWidth="0.8" />
        <path d="M 15 9 L 14.6 10 L 15.4 10 Z" fill="#fff" opacity="0.8" />
      </svg>
    );
  }
  
  if (id === 'chopper-hat') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Pink hat on head */}
        <ellipse cx="15" cy="7" rx="9" ry="3" fill="#ffc1cc" stroke="#ffaabb" strokeWidth="1.5" />
        <ellipse cx="15" cy="7" rx="7" ry="2" fill="#ffe8ee" opacity="0.5" />
        <rect x="9" y="7" width="12" height="4" rx="0.8" fill="#ffc1cc" stroke="#ffaabb" strokeWidth="1.5" />
        <ellipse cx="15" cy="8" rx="7" ry="1.5" fill="#ffe8ee" opacity="0.4" />
        {/* Medical cross */}
        <rect x="13.5" y="8.5" width="3" height="0.8" fill="#fff" opacity="0.9" />
        <rect x="14.5" y="7.5" width="1" height="2.8" fill="#fff" opacity="0.9" />
        {/* Sakura petals */}
        <circle cx="12" cy="8" r="0.4" fill="#ffb3c1" opacity="0.7" />
        <circle cx="18" cy="8" r="0.4" fill="#ffb3c1" opacity="0.7" />
      </svg>
    );
  }
  
  if (id === 'sanji-eyebrow') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Elegant curly eyebrow on face */}
        <path 
          d="M 17 10 Q 18.5 9.5 19.5 10 Q 20.5 10.5 21 10" 
          fill="none" 
          stroke="#333" 
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="19.5" cy="9.8" r="0.3" fill="#555" opacity="0.6" />
      </svg>
    );
  }
  
  return null;
}

function renderBodyAccessory(id: string, size: number) {
  if (id === 'luffy-vest') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Vest wrapping around body */}
        <ellipse cx="15" cy="23" rx="7" ry="6" fill="#ffb3ba" stroke="#ff8a94" strokeWidth="1.5" />
        <ellipse cx="15" cy="22" rx="6" ry="3" fill="#ffccd0" opacity="0.5" />
        {/* Vest opening in center */}
        <path d="M 15 19 L 15 29" stroke="#ff8a94" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 15 19 L 12 20" stroke="#ff8a94" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 15 19 L 18 20" stroke="#ff8a94" strokeWidth="1.5" strokeLinecap="round" />
        {/* Buttons on left side */}
        <circle cx="13" cy="22" r="0.7" fill="#ffd93d" stroke="#e6c236" strokeWidth="0.5" />
        <circle cx="13" cy="24.5" r="0.7" fill="#ffd93d" stroke="#e6c236" strokeWidth="0.5" />
        <circle cx="13" cy="27" r="0.7" fill="#ffd93d" stroke="#e6c236" strokeWidth="0.5" />
        {/* Highlights */}
        <circle cx="12.7" cy="21.7" r="0.3" fill="#fff" opacity="0.8" />
        <circle cx="12.7" cy="24.2" r="0.3" fill="#fff" opacity="0.8" />
      </svg>
    );
  }
  
  if (id === 'zoro-swords') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Three swords strapped to back */}
        {/* Sword 1 - left */}
        <rect x="8" y="20" width="1.2" height="11" fill="#c7f5de" stroke="#a8e6cf" strokeWidth="0.5" transform="rotate(-15 8.6 25.5)" />
        <rect x="7.5" y="19" width="2.2" height="1.8" rx="0.5" fill="#7cb89d" stroke="#6aa085" strokeWidth="0.5" />
        <circle cx="8.6" cy="19.8" r="0.3" fill="#ffd93d" />
        <line x1="8.6" y1="21" x2="8.6" y2="22" stroke="#fff" strokeWidth="0.3" opacity="0.6" />
        
        {/* Sword 2 - middle */}
        <rect x="10" y="19" width="1.2" height="12" fill="#c7f5de" stroke="#a8e6cf" strokeWidth="0.5" />
        <rect x="9.5" y="18" width="2.2" height="1.8" rx="0.5" fill="#7cb89d" stroke="#6aa085" strokeWidth="0.5" />
        <circle cx="10.6" cy="18.8" r="0.3" fill="#ffd93d" />
        <line x1="10.6" y1="20" x2="10.6" y2="21" stroke="#fff" strokeWidth="0.3" opacity="0.6" />
        
        {/* Sword 3 - right */}
        <rect x="12" y="20" width="1.2" height="11" fill="#c7f5de" stroke="#a8e6cf" strokeWidth="0.5" transform="rotate(15 12.6 25.5)" />
        <rect x="11.5" y="19" width="2.2" height="1.8" rx="0.5" fill="#7cb89d" stroke="#6aa085" strokeWidth="0.5" />
        <circle cx="12.6" cy="19.8" r="0.3" fill="#ffd93d" />
        <line x1="12.6" y1="21" x2="12.6" y2="22" stroke="#fff" strokeWidth="0.3" opacity="0.6" />
        
        {/* Straps holding swords */}
        <ellipse cx="15" cy="22" rx="6.5" ry="1" fill="#7cb89d" opacity="0.4" />
        <ellipse cx="15" cy="26" rx="6" ry="1" fill="#7cb89d" opacity="0.4" />
      </svg>
    );
  }
  
  if (id === 'zoro-haramaki') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Haramaki belt wrapped around belly */}
        <ellipse cx="15" cy="24" rx="6.5" ry="3" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1.5" />
        <rect x="8.5" y="23" width="13" height="3" fill="#a8e6cf" stroke="#7cb89d" strokeWidth="1.5" />
        <ellipse cx="15" cy="23.5" rx="6" ry="1.5" fill="#c7f5de" opacity="0.5" />
        <ellipse cx="15" cy="25.5" rx="5.5" ry="0.8" fill="#7cb89d" opacity="0.3" />
      </svg>
    );
  }
  
  if (id === 'usopp-slingshot') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Slingshot held/attached on side */}
        <path d="M 8 23 Q 9.5 21 8 19" fill="none" stroke="#d4a574" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 8.3 22.5 Q 9.3 21 8.3 19.5" fill="none" stroke="#8b7355" strokeWidth="1" />
        {/* Bands */}
        <line x1="8" y1="19" x2="11.5" y2="21" stroke="#8b7355" strokeWidth="1" />
        <line x1="8" y1="23" x2="11.5" y2="21" stroke="#8b7355" strokeWidth="1" />
        {/* Ammo pouch at waist */}
        <ellipse cx="12" cy="21" rx="2" ry="1.5" fill="#ffd93d" stroke="#e6c236" strokeWidth="1" />
        <circle cx="11.5" cy="20.5" r="0.4" fill="#fff" opacity="0.7" />
        <circle cx="11" cy="21.5" r="0.6" fill="#ff8a94" opacity="0.6" />
        <circle cx="12.5" cy="22" r="0.5" fill="#a8e6cf" opacity="0.6" />
      </svg>
    );
  }
  
  if (id === 'chopper-satchel') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Medical bag hanging on side */}
        <path d="M 17 21 Q 19 20 21 21 Q 22 22 22 24" fill="none" stroke="#8ab8e8" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="20" y="24" width="5" height="4.5" rx="0.8" fill="#b8d8f8" stroke="#8ab8e8" strokeWidth="1.5" />
        <rect x="20.5" y="24.5" width="4" height="1.5" fill="#d4e8ff" opacity="0.5" />
        {/* Medical cross */}
        <rect x="21.5" y="25.5" width="2" height="0.8" fill="#ffb3c1" />
        <rect x="22" y="25" width="1" height="1.8" fill="#ffb3c1" />
        {/* Buckle */}
        <circle cx="22.5" cy="27" r="0.6" fill="#ffd93d" stroke="#e6c236" strokeWidth="0.5" />
        <circle cx="22.3" cy="26.8" r="0.25" fill="#fff" opacity="0.8" />
      </svg>
    );
  }
  
  if (id === 'sanji-tie') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Tie hanging down from neck */}
        <rect x="14" y="17" width="2" height="1.5" rx="0.3" fill="#8ab8e8" stroke="#6a98c8" strokeWidth="0.5" />
        <circle cx="14.8" cy="17.5" r="0.25" fill="#fff" opacity="0.7" />
        {/* Tie following body curve */}
        <path d="M 15 18.5 L 14.5 20 L 14.8 25 L 15.2 25 L 15.5 20 Z" fill="#b8d8f8" stroke="#8ab8e8" strokeWidth="1" />
        <path d="M 15 18.5 L 14.8 20 L 15 24.5 L 15.2 20 Z" fill="#d4e8ff" opacity="0.5" />
      </svg>
    );
  }
  
  return null;
}

function renderFeetAccessory(id: string, size: number) {
  if (id === 'luffy-sandals') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Sandals on actual feet */}
        <ellipse cx="12" cy="31" rx="2.5" ry="1" fill="#d4a574" stroke="#b8936a" strokeWidth="0.8" />
        <ellipse cx="18" cy="31" rx="2.5" ry="1" fill="#d4a574" stroke="#b8936a" strokeWidth="0.8" />
        {/* Straps */}
        <rect x="11" y="30" width="2" height="0.5" rx="0.2" fill="#b8936a" />
        <rect x="17" y="30" width="2" height="0.5" rx="0.2" fill="#b8936a" />
        {/* Highlights */}
        <ellipse cx="12" cy="31" rx="1" ry="0.3" fill="#fff" opacity="0.4" />
        <ellipse cx="18" cy="31" rx="1" ry="0.3" fill="#fff" opacity="0.4" />
      </svg>
    );
  }
  
  if (id === 'chopper-slippers') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Fuzzy slippers on feet */}
        <ellipse cx="12" cy="31" rx="2.8" ry="1.3" fill="#ffe8d6" stroke="#ffc9b0" strokeWidth="1" />
        <ellipse cx="18" cy="31" rx="2.8" ry="1.3" fill="#ffe8d6" stroke="#ffc9b0" strokeWidth="1" />
        {/* Fuzzy top texture */}
        <ellipse cx="12" cy="30.5" rx="2.2" ry="0.8" fill="#fff5e8" opacity="0.6" />
        <ellipse cx="18" cy="30.5" rx="2.2" ry="0.8" fill="#fff5e8" opacity="0.6" />
        {/* Pom-poms on top */}
        <circle cx="11.2" cy="30" r="0.7" fill="#ffb3c1" opacity="0.8" />
        <circle cx="17.2" cy="30" r="0.7" fill="#ffb3c1" opacity="0.8" />
        <circle cx="11" cy="29.8" r="0.3" fill="#fff" opacity="0.7" />
        <circle cx="17" cy="29.8" r="0.3" fill="#fff" opacity="0.7" />
      </svg>
    );
  }
  
  if (id === 'sanji-shoes') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} className="absolute inset-0">
        {/* Dress shoes on feet */}
        <ellipse cx="12" cy="31" rx="2.5" ry="1.2" fill="#333" stroke="#222" strokeWidth="0.8" />
        <ellipse cx="18" cy="31" rx="2.5" ry="1.2" fill="#333" stroke="#222" strokeWidth="0.8" />
        {/* Shine on shoes */}
        <ellipse cx="12" cy="30.6" rx="1.2" ry="0.4" fill="#fff" opacity="0.4" />
        <ellipse cx="18" cy="30.6" rx="1.2" ry="0.4" fill="#fff" opacity="0.4" />
        <circle cx="11.5" cy="30.5" r="0.3" fill="#fff" opacity="0.8" />
        <circle cx="17.5" cy="30.5" r="0.3" fill="#fff" opacity="0.8" />
      </svg>
    );
  }
  
  return null;
}