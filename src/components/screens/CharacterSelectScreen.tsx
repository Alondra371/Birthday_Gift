import React, { useEffect, useMemo, useState } from 'react';
import type { CharacterId } from '../GameBoy';

import snoopySheet from '../../assets/characters/snoopy_sheet.png';
import luffySheet from '../../assets/characters/luffy_sheet.png';
import zoroSheet from '../../assets/characters/zoro_sheet.png';

type Props = {
  character: CharacterId;
  onCharacterChange: (character: CharacterId) => void;
  onBack: () => void;
  onConfirm: () => void;
};

type Frame = { x: number; y: number };

function SpriteFromSheet({
  sheet,
  frame,
  frameW,
  frameH,
  cols,
  rows,
  size,
}: {
  sheet: string;
  frame: Frame;
  frameW: number;
  frameH: number;
  cols: number;
  rows: number;
  size: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sheet})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${frame.x * frameW}px -${frame.y * frameH}px`,
        backgroundSize: `${cols * frameW}px ${rows * frameH}px`,
        imageRendering: 'pixelated',
      }}
      aria-hidden
    />
  );
}

const CHARACTER_CONFIG: Record<
  CharacterId,
  {
    name: string;
    tagline: string;
    sheet: string;
    frameW: number;
    frameH: number;
    cols: number;
    rows: number;
    previewAnim: Frame[];
  }
> = {
  snoopy: {
    name: 'Snoopy',
    tagline: 'Classic — fast and clean combos.',
    sheet: snoopySheet,
    frameW: 256,
    frameH: 512,
    cols: 4,
    rows: 2,
    previewAnim: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
  luffy: {
    name: 'Luffy',
    tagline: 'Stretchy hits — big damage, big vibes.',
    sheet: luffySheet,
    frameW: 512,
    frameH: 512,
    cols: 3,
    rows: 2,
    previewAnim: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
  zoro: {
    name: 'Zoro',
    tagline: 'Heavy slashes — stubborn and precise.',
    sheet: zoroSheet,
    frameW: 256,
    frameH: 512,
    cols: 4,
    rows: 2,
    previewAnim: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
};

export function CharacterSelectScreen({
  character,
  onCharacterChange,
  onBack,
  onConfirm,
}: Props) {
  const characters = useMemo(() => Object.keys(CHARACTER_CONFIG) as CharacterId[], []);
  const initialIndex = Math.max(0, characters.indexOf(character));
  const [index, setIndex] = useState(initialIndex);

  // Keep local index synced if parent changes
  useEffect(() => {
    const i = characters.indexOf(character);
    if (i >= 0) setIndex(i);
  }, [character, characters]);

  // Animate the preview sprite
  const previewFrames = CHARACTER_CONFIG[characters[index]].previewAnim;
  const [frameIdx, setFrameIdx] = useState(0);
  useEffect(() => {
    setFrameIdx(0);
    const t = window.setInterval(() => {
      setFrameIdx((v) => (v + 1) % previewFrames.length);
    }, 150);
    return () => window.clearInterval(t);
  }, [previewFrames.length, characters, index]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = (index - 1 + characters.length) % characters.length;
        setIndex(next);
        onCharacterChange(characters[next]);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (index + 1) % characters.length;
        setIndex(next);
        onCharacterChange(characters[next]);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, characters, onCharacterChange, onConfirm, onBack]);

  const selectedId = characters[index];
  const selected = CHARACTER_CONFIG[selectedId];

  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: 14,
          padding: 14,
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Select Character</div>
          <div style={{ opacity: 0.85, fontSize: 12 }}>← → choose • Enter confirm</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 12 }}>
          {characters.map((id) => {
            const c = CHARACTER_CONFIG[id];
            const active = id === character;
            return (
              <button
                key={id}
                onClick={() => onCharacterChange(id)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 12,
                  padding: 10,
                  border: active ? '3px solid rgba(255,255,255,0.9)' : '2px solid rgba(255,255,255,0.25)',
                  background: active ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)',
                  color: 'white',
                  fontWeight: 900,
                }}
              >
                <div style={{ display: 'grid', placeItems: 'center', marginBottom: 8 }}>
                  <SpriteFromSheet
                    sheet={c.sheet}
                    frame={c.previewAnim[0]}
                    frameW={c.frameW}
                    frameH={c.frameH}
                    cols={c.cols}
                    rows={c.rows}
                    size={56}
                  />
                </div>
                {c.name}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 14 }}>
          <button
            onClick={onBack}
            style={{
              cursor: 'pointer',
              borderRadius: 12,
              padding: '10px 12px',
              border: '2px solid rgba(255,255,255,0.35)',
              background: 'rgba(0,0,0,0.35)',
              color: 'white',
              fontWeight: 900,
            }}
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            style={{
              cursor: 'pointer',
              borderRadius: 12,
              padding: '10px 12px',
              border: '2px solid rgba(255,255,255,0.35)',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: 1000,
            }}
          >
            Start
          </button>
        </div>
      </div>

      <div
        style={{
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: 14,
          padding: 14,
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ fontWeight: 1000, fontSize: 26, lineHeight: 1 }}>{selected.name}</div>
        <div style={{ opacity: 0.9, fontWeight: 800 }}>{selected.tagline}</div>

        <div
          style={{
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 14,
            border: '2px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.25)',
          }}
        >
          <SpriteFromSheet
            sheet={selected.sheet}
            frame={previewFrames[frameIdx]}
            frameW={selected.frameW}
            frameH={selected.frameH}
            cols={selected.cols}
            rows={selected.rows}
            size={180}
          />
        </div>

        <div style={{ opacity: 0.85, fontSize: 12 }}>
          Tip: If you only see a tiny corner of the sprite, it means the sheet isn’t a 32×32 grid. This screen
          uses the sheet’s real frame size to crop correctly.
        </div>
      </div>
    </div>
  );
}
