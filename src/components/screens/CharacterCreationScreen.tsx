import { useEffect, useMemo } from "react";
import { SnoopyCharacter } from "../SnoopyCharacter";
import type { Outfit } from "../SnoopyCharacter";

const OUTFITS: { label: string; outfit: Outfit }[] = [
  { label: "Base Snoopy", outfit: null },
  { label: "🏴‍☠️ Luffy", outfit: "luffy" as Outfit },
  { label: "⚔️ Zoro", outfit: "zoro" as Outfit },
  { label: "🎯 Usopp", outfit: "usopp" as Outfit },
];

interface CharacterCreationScreenProps {
  outfit: Outfit;
  onOutfitChange: (outfit: Outfit) => void;
  onComplete: () => void;
  dpadDirection: string | null;
  dpadTick: number;
  aButtonPressed: boolean;
}

export function CharacterCreationScreen({
  outfit,
  onOutfitChange,
  onComplete,
  dpadDirection,
  dpadTick,
  aButtonPressed,
}: CharacterCreationScreenProps) {
  const selectedIndex = useMemo(() => {
    const idx = OUTFITS.findIndex((o) => o.outfit === outfit);
    return idx === -1 ? 0 : idx;
  }, [outfit]);

  const current = OUTFITS[selectedIndex];

  const setIndex = (idx: number) => {
    const wrapped = (idx + OUTFITS.length) % OUTFITS.length;
    onOutfitChange(OUTFITS[wrapped].outfit);
  };

  const handleNext = () => setIndex(selectedIndex + 1);
  const handlePrev = () => setIndex(selectedIndex - 1);
  const handleConfirm = () => onOutfitChange(current.outfit);

  // ✅ D-pad: edge-triggered by dpadTick; no local setState in effect
  useEffect(() => {
    if (!dpadDirection) return;

    if (dpadDirection === "left") handlePrev();
    if (dpadDirection === "right") handleNext();
    // up/down reserved for future UI if you want

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpadTick]);

  // ✅ A button confirms selection (equip)
  useEffect(() => {
    if (aButtonPressed) handleConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aButtonPressed]);

  return (
    <div
      className="w-full h-full flex flex-col p-4"
      style={{
        background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
      }}
    >
      {/* Title */}
      <div className="text-center mb-2">
        <div
          className="text-sm font-bold"
          style={{
            color: "#ffd93d",
            textShadow: "1px 1px 0 #c9a227",
          }}
        >
          🎨 Dress Up Snoopy
        </div>
      </div>

      {/* Character Display */}
      <div className="flex-1 flex items-center justify-center mb-2">
        <SnoopyCharacter outfit={current.outfit} size="large" animation="walk" />
      </div>

      {/* Item Selector */}
      <div
        className="rounded-lg p-3 mb-2"
        style={{
          background: "linear-gradient(145deg, #ffc1cc, #ffb3c1)",
          border: "2px solid #f4d03f",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handlePrev}
            className="px-2 py-1 rounded bg-yellow-300 hover:bg-yellow-400 active:scale-95 transition-all text-xs font-bold"
            style={{ border: "2px solid #f4d03f" }}
          >
            ◀
          </button>

          <div className="flex-1 text-center px-2">
            <div className="text-xs font-bold mb-1" style={{ color: "#8b6f9e" }}>
              Outfit
            </div>
            <div
              className="text-sm font-bold"
              style={{
                color: "#ffd93d",
                textShadow: "1px 1px 0 #c9a227",
              }}
            >
              {current.label}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="px-2 py-1 rounded bg-yellow-300 hover:bg-yellow-400 active:scale-95 transition-all text-xs font-bold"
            style={{ border: "2px solid #f4d03f" }}
          >
            ▶
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(145deg, #a8e6cf, #88d4ab)",
              border: "2px solid #f4d03f",
              color: "#2d5016",
            }}
          >
            ✓ Equip (A)
          </button>

          <button
            onClick={onComplete}
            className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(145deg, #ffd93d, #ffe066)",
              border: "2px solid #f4d03f",
              color: "#8b6f47",
            }}
          >
            ⚔️ Battle!
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <div className="text-xs" style={{ color: "#a584b5" }}>
          D-Pad: Cycle • A: Equip • START: Battle
        </div>
      </div>
    </div>
  );
}
