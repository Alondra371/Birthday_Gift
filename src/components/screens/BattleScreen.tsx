import { useEffect, useMemo, useState } from "react";
import type { CharacterId } from "../GameBoy";
import arena from "../../assets/backgrounds/big_mom_arena.png";
import bigMom from "../../assets/enemies/big_mom.png";
import snoopySheet from "../../assets/characters/snoopy_sheet.png";
import luffySheet from "../../assets/characters/luffy_sheet.png";
import zoroSheet from "../../assets/characters/zoro_sheet.png";

type Anim = "idle" | "walk" | "attack" | "hurt";

interface BattleScreenProps {
  character: CharacterId;
  onWin: () => void;
  onLose: () => void;
  onQuit: () => void;
}

export function BattleScreen({ character, onWin, onLose, onQuit }: BattleScreenProps) {
  const [anim, setAnim] = useState<Anim>("idle");
  const [frame, setFrame] = useState(0);

  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(200);

  const sheet = useMemo(() => {
    if (character === "luffy") return luffySheet;
    if (character === "zoro") return zoroSheet;
    return snoopySheet;
  }, [character]);

  // Sprite animations
  const animMap: Record<Anim, { frames: number; speedMs: number; row: number }> = {
    idle: { frames: 2, speedMs: 450, row: 0 },
    walk: { frames: 2, speedMs: 160, row: 0 },
    attack: { frames: 2, speedMs: 140, row: 1 },
    hurt: { frames: 2, speedMs: 220, row: 1 },
  };

  const current = animMap[anim];

  useEffect(() => {
    const t = setInterval(() => {
      setFrame((prev) => (prev + 1) % current.frames);
    }, current.speedMs);
    return () => clearInterval(t);
  }, [current.frames, current.speedMs]);

  // Win/Lose
  useEffect(() => {
    if (bossHp <= 0) onWin();
    if (playerHp <= 0) onLose();
  }, [bossHp, playerHp, onWin, onLose]);

  function doAttack() {
    setAnim("attack");
    setFrame(0);

    // player hits boss
    setBossHp((hp) => Math.max(0, hp - 25));

    // boss hits back sometimes
    const bossHitsBack = Math.random() < 0.6;
    if (bossHitsBack) {
      setTimeout(() => {
        setAnim("hurt");
        setFrame(0);
        setPlayerHp((hp) => Math.max(0, hp - 15));
      }, 160);
    }

    // return to idle
    setTimeout(() => {
      setAnim("idle");
      setFrame(0);
    }, 400);
  }

  return (
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${arena})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top UI */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between">
        <button
          onClick={onQuit}
          className="px-3 py-1 rounded-lg bg-black/60 text-white text-sm border border-white/10"
        >
          Quit
        </button>

        <div className="text-white text-sm bg-black/60 px-3 py-1 rounded-lg border border-white/10">
          Battle: Big Mom
        </div>
      </div>

      {/* Health bars */}
      <div className="absolute top-12 left-3 right-3 flex gap-3">
        <HpBar label="You" value={playerHp} />
        <HpBar label="Big Mom" value={bossHp} />
      </div>

      {/* Center stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full flex items-end justify-between px-10 pb-16">
          {/* Player */}
          <div className="flex flex-col items-center gap-2">
            <SpriteFromSheet
              src={sheet}
              tile={32}
              scale={4}
              row={current.row}
              col={frame}
            />
            <div className="text-white text-xs bg-black/60 px-2 py-1 rounded border border-white/10">
              {character.toUpperCase()}
            </div>
          </div>

          {/* Boss */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={bigMom}
              alt="Big Mom"
              style={{
                width: 200,
                height: 200,
                imageRendering: "pixelated",
                objectFit: "contain",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.6))",
              }}
            />
            <div className="text-white text-xs bg-black/60 px-2 py-1 rounded border border-white/10">
              BIG MOM
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 left-0 right-0 px-3 flex gap-3 justify-center">
        <button
          onClick={() => setAnim("walk")}
          className="px-4 py-2 rounded-xl bg-black/60 text-white border border-white/10"
        >
          Walk
        </button>

        <button
          onClick={doAttack}
          className="px-4 py-2 rounded-xl bg-red-600/80 text-white border border-white/10"
        >
          Attack
        </button>

        <button
          onClick={() => {
            setAnim("idle");
            setFrame(0);
          }}
          className="px-4 py-2 rounded-xl bg-black/60 text-white border border-white/10"
        >
          Idle
        </button>
      </div>
    </div>
  );
}

/** Pixel sprite renderer from a sprite sheet */
function SpriteFromSheet(props: {
  src: string;
  tile: number;   // 32
  scale: number;  // 3,4,5...
  row: number;    // which row in the sheet
  col: number;    // which column in the sheet
}) {
  const { src, tile, scale, row, col } = props;
  const size = tile * scale;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        // Move sheet so selected frame appears inside the box
        backgroundPosition: `-${col * tile}px -${row * tile}px`,
        imageRendering: "pixelated",
        transform: "translateZ(0)",
      }}
    />
  );
}

function HpBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex-1 bg-black/60 border border-white/10 rounded-lg px-2 py-1">
      <div className="flex justify-between text-white text-xs mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-white/10 rounded">
        <div
          className="h-2 bg-white/70 rounded"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
