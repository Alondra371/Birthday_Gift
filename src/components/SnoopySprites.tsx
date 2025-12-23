// Hand-drawn pixel-art Snoopy sprite sheet
// Faithfully recreated from classic model, all original artwork

interface SpriteProps {
  frame: number;
  animation: 'stance' | 'walk' | 'jump' | 'attack' | 'hurt' | 'defeat';
}

export function SnoopySprite({ frame, animation }: SpriteProps) {
  if (animation === 'stance') {
    return frame === 0 ? <StanceFrame1 /> : <StanceFrame2 />;
  }
  if (animation === 'walk') {
    const frames = [<WalkFrame1 />, <WalkFrame2 />, <WalkFrame3 />, <WalkFrame4 />];
    return frames[frame % 4];
  }
  if (animation === 'jump') {
    return frame === 0 ? <JumpFrame1 /> : <JumpFrame2 />;
  }
  if (animation === 'attack') {
    const frames = [<AttackFrame1 />, <AttackFrame2 />, <AttackFrame3 />];
    return frames[frame % 3];
  }
  if (animation === 'hurt') {
    return frame === 0 ? <HurtFrame1 /> : <HurtFrame2 />;
  }
  if (animation === 'defeat') {
    return frame === 0 ? <DefeatFrame1 /> : <DefeatFrame2 />;
  }
  return <StanceFrame1 />;
}

// STANCE ANIMATION - Idle standing with subtle head bob
function StanceFrame1() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 8 L 8 10 L 7 12 L 7 14 L 8 15 L 10 14 L 10 10 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="11" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 9 L 22 11 L 23 13 L 22 15 L 20 14 L 20 11 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="13" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="12" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="10" r="1" fill="#000" />
      <circle cx="17" cy="10" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 15 Q 20 16 21 15" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="18" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot on body */}
      <ellipse cx="11" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Back Arm */}
      <line x1="10" y1="22" x2="7" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Front Arm */}
      <line x1="20" y1="22" x2="23" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="12" y1="28" x2="12" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="28" x2="18" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="12" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="18" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function StanceFrame2() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 9 L 8 11 L 7 13 L 7 15 L 8 16 L 10 15 L 10 11 Z" fill="#000" />
      
      {/* Head - slightly lower */}
      <ellipse cx="15" cy="12" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 10 L 22 12 L 23 14 L 22 16 L 20 15 L 20 12 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="14" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="13" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="11" r="1" fill="#000" />
      <circle cx="17" cy="11" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 16 Q 20 17 21 16" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="19" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot on body */}
      <ellipse cx="11" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Arms */}
      <line x1="10" y1="22" x2="7" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="22" x2="23" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="12" y1="28" x2="12" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="28" x2="18" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="12" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="18" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

// WALK ANIMATION - 4 frame walk cycle
function WalkFrame1() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 8 L 8 10 L 7 12 L 7 14 L 8 15 L 10 14 L 10 10 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="11" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 9 L 22 11 L 23 13 L 22 15 L 20 14 L 20 11 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="13" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="12" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="10" r="1" fill="#000" />
      <circle cx="17" cy="10" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 15 Q 20 16 21 15" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="18" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="23" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="22" rx="2" ry="3" fill="#000" />
      
      {/* Arms - swinging */}
      <line x1="10" y1="21" x2="7" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="21" x2="23" y2="23" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - left forward */}
      <line x1="12" y1="27" x2="11" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="27" x2="19" y2="29" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="11" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="19" cy="30" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function WalkFrame2() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 9 L 8 11 L 7 13 L 7 15 L 8 16 L 10 15 L 10 11 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="12" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 10 L 22 12 L 23 14 L 22 16 L 20 15 L 20 12 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="14" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="13" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="11" r="1" fill="#000" />
      <circle cx="17" cy="11" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 16 Q 20 17 21 16" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="19" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Arms */}
      <line x1="10" y1="22" x2="7" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="22" x2="23" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - both down */}
      <line x1="12" y1="28" x2="12" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="28" x2="18" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="12" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="18" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function WalkFrame3() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 8 L 8 10 L 7 12 L 7 14 L 8 15 L 10 14 L 10 10 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="11" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear - bouncing up */}
      <path d="M 21 8 L 22 10 L 23 12 L 22 14 L 20 13 L 20 10 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="13" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="12" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="10" r="1" fill="#000" />
      <circle cx="17" cy="10" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 15 Q 20 16 21 15" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="18" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="23" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="22" rx="2" ry="3" fill="#000" />
      
      {/* Arms - opposite swing */}
      <line x1="10" y1="21" x2="7" y2="23" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="21" x2="23" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - right forward */}
      <line x1="12" y1="27" x2="13" y2="29" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="27" x2="17" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="13" cy="30" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="17" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function WalkFrame4() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 9 L 8 11 L 7 13 L 7 15 L 8 16 L 10 15 L 10 11 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="12" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 10 L 22 12 L 23 14 L 22 16 L 20 15 L 20 12 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="14" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="13" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="11" r="1" fill="#000" />
      <circle cx="17" cy="11" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 16 Q 20 17 21 16" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="19" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Arms */}
      <line x1="10" y1="22" x2="7" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="22" x2="23" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="12" y1="28" x2="12" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="28" x2="18" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="12" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="18" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

// JUMP ANIMATION
function JumpFrame1() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 6 L 8 8 L 7 10 L 7 12 L 8 13 L 10 12 L 10 8 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="9" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear - up */}
      <path d="M 21 6 L 22 8 L 23 10 L 22 12 L 20 11 L 20 8 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="11" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="10" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="8" r="1" fill="#000" />
      <circle cx="17" cy="8" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 13 Q 20 14 21 13" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="16" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="21" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="20" rx="2" ry="3" fill="#000" />
      
      {/* Arms - raised */}
      <line x1="10" y1="19" x2="6" y2="18" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="19" x2="24" y2="18" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - tucked */}
      <line x1="12" y1="25" x2="11" y2="27" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="25" x2="19" y2="27" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="11" cy="28" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="19" cy="28" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function JumpFrame2() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 5 L 8 7 L 7 9 L 7 11 L 8 12 L 10 11 L 10 7 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="8" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 5 L 22 7 L 23 9 L 22 11 L 20 10 L 20 7 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="10" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="9" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="7" r="1" fill="#000" />
      <circle cx="17" cy="7" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 12 Q 20 13 21 12" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="15" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="20" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="19" rx="2" ry="3" fill="#000" />
      
      {/* Arms - spread */}
      <line x1="10" y1="18" x2="5" y2="19" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="18" x2="25" y2="19" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - extended */}
      <line x1="12" y1="24" x2="12" y2="28" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="24" x2="18" y2="28" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="12" cy="29" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="18" cy="29" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

// ATTACK ANIMATION - Friendly kick
function AttackFrame1() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 8 L 8 10 L 7 12 L 7 14 L 8 15 L 10 14 L 10 10 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="11" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 9 L 22 11 L 23 13 L 22 15 L 20 14 L 20 11 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="13" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="12" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="10" r="1" fill="#000" />
      <circle cx="17" cy="10" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 15 Q 20 16 21 15" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="18" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body - leaning back */}
      <ellipse cx="14" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="10" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Arms - pulled back */}
      <line x1="9" y1="22" x2="5" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="19" y1="22" x2="21" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - wind up */}
      <line x1="11" y1="28" x2="11" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="28" x2="19" y2="26" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="11" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="20" cy="26" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function AttackFrame2() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 9 L 8 11 L 7 13 L 7 15 L 8 16 L 10 15 L 10 11 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="12" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 10 L 22 12 L 23 14 L 22 16 L 20 15 L 20 12 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="14" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="13" rx="2" ry="2" fill="#000" />
      
      {/* Eyes - determined */}
      <circle cx="14" cy="11" r="1" fill="#000" />
      <circle cx="17" cy="11" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 16 Q 20 17 21 16" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="19" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="14" cy="25" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="10" cy="24" rx="2" ry="3" fill="#000" />
      
      {/* Arms */}
      <line x1="9" y1="23" x2="6" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="19" y1="23" x2="22" y2="26" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - kick extended */}
      <line x1="11" y1="29" x2="11" y2="31" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="27" x2="24" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="11" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="25" cy="24" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function AttackFrame3() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 8 L 8 10 L 7 12 L 7 14 L 8 15 L 10 14 L 10 10 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="11" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 9 L 22 11 L 23 13 L 22 15 L 20 14 L 20 11 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="13" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="12" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <circle cx="14" cy="10" r="1" fill="#000" />
      <circle cx="17" cy="10" r="1" fill="#000" />
      
      {/* Smile */}
      <path d="M 19 15 Q 20 16 21 15" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="18" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body - returning */}
      <ellipse cx="15" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Arms */}
      <line x1="10" y1="22" x2="7" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="22" x2="23" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs - recovery */}
      <line x1="12" y1="28" x2="12" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="28" x2="20" y2="29" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="12" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="20" cy="30" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

// HURT ANIMATION
function HurtFrame1() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 7 9 L 7 11 L 6 13 L 6 15 L 7 16 L 9 15 L 9 11 Z" fill="#000" />
      
      {/* Head - recoiling */}
      <ellipse cx="14" cy="12" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 20 10 L 21 12 L 22 14 L 21 16 L 19 15 L 19 12 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="19" cy="14" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="23" cy="13" rx="2" ry="2" fill="#000" />
      
      {/* Eyes - shocked */}
      <circle cx="13" cy="11" r="1" fill="#000" />
      <circle cx="16" cy="11" r="1" fill="#000" />
      
      {/* Frown */}
      <path d="M 18 17 Q 19 16 20 17" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="12" y="19" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body - tilted */}
      <ellipse cx="13" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="9" cy="23" rx="2" ry="3" fill="#000" />
      
      {/* Arms - back */}
      <line x1="8" y1="22" x2="4" y2="24" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="22" x2="20" y2="25" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="10" y1="28" x2="9" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="28" x2="17" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="9" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="17" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function HurtFrame2() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 8 10 L 8 12 L 7 14 L 7 16 L 8 17 L 10 16 L 10 12 Z" fill="#000" />
      
      {/* Head */}
      <ellipse cx="15" cy="13" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 21 11 L 22 13 L 23 15 L 22 17 L 20 16 L 20 13 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="20" cy="15" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="24" cy="14" rx="2" ry="2" fill="#000" />
      
      {/* Eyes */}
      <line x1="13" y1="11" x2="15" y2="13" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="11" x2="18" y2="13" stroke="#000" strokeWidth="1" />
      
      {/* Frown */}
      <path d="M 19 17 Q 20 16 21 17" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="13" y="20" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body */}
      <ellipse cx="15" cy="25" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="11" cy="24" rx="2" ry="3" fill="#000" />
      
      {/* Arms */}
      <line x1="10" y1="23" x2="7" y2="26" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="23" x2="23" y2="26" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="12" y1="29" x2="11" y2="31" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="29" x2="19" y2="31" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="11" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="19" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

// DEFEAT ANIMATION
function DefeatFrame1() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Back Ear */}
      <path d="M 6 12 L 6 14 L 5 16 L 5 18 L 6 19 L 8 18 L 8 14 Z" fill="#000" />
      
      {/* Head - falling */}
      <ellipse cx="12" cy="16" rx="7" ry="8" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Front Ear */}
      <path d="M 18 14 L 19 16 L 20 18 L 19 20 L 17 19 L 17 16 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Snout */}
      <ellipse cx="17" cy="18" rx="5" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <ellipse cx="21" cy="17" rx="2" ry="2" fill="#000" />
      
      {/* Eyes - closed */}
      <line x1="10" y1="15" x2="12" y2="15" stroke="#000" strokeWidth="1" />
      <line x1="13" y1="15" x2="15" y2="15" stroke="#000" strokeWidth="1" />
      
      {/* Frown */}
      <path d="M 16 20 Q 17 19 18 20" stroke="#000" strokeWidth="1" fill="none" />
      
      {/* Neck */}
      <rect x="10" y="23" width="4" height="1" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Body - tilted */}
      <ellipse cx="12" cy="26" rx="6" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="8" cy="25" rx="2" ry="3" fill="#000" />
      
      {/* Arms - falling */}
      <line x1="7" y1="24" x2="3" y2="26" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="24" x2="19" y2="27" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="10" y1="29" x2="8" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="29" x2="16" y2="30" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="8" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="16" cy="31" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function DefeatFrame2() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Lying down - sleeping/defeated */}
      
      {/* Body on ground */}
      <ellipse cx="16" cy="26" rx="8" ry="4" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Spot */}
      <ellipse cx="12" cy="25" rx="2" ry="2" fill="#000" />
      
      {/* Head */}
      <ellipse cx="24" cy="24" rx="6" ry="5" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Ear - one visible */}
      <path d="M 26 20 L 27 21 L 28 23 L 27 24 L 26 23 Z" fill="#000" />
      
      {/* Snout */}
      <ellipse cx="28" cy="25" rx="4" ry="3" fill="#fff" stroke="#000" strokeWidth="1" />
      
      {/* Nose */}
      <circle cx="31" cy="24" r="1" fill="#000" />
      
      {/* Eye - closed */}
      <line x1="23" y1="23" x2="25" y2="23" stroke="#000" strokeWidth="1" />
      
      {/* Legs */}
      <line x1="10" y1="28" x2="8" y2="29" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="28" x2="12" y2="29" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Arms */}
      <line x1="18" y1="26" x2="18" y2="29" stroke="#000" strokeWidth="1" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="8" cy="30" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="12" cy="30" rx="2" ry="1" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
  );
}
