import React, { useEffect, useMemo, useState } from 'react';
import type { CharacterDef, CharacterId } from '../types';

type Props = {
  selectedCharacter: CharacterId;
  onSelectCharacter: (id: CharacterId) => void;
  onStart: () => void;
};

export function CharacterSelectScreen({
  selectedCharacter,
  onSelectCharacter,
  onStart,
}: Props) {
  // You can replace these image paths with your own PNGs in /public or /src/assets
  const characters: CharacterDef[] = useMemo(
    () => [
      {
        id: 'snoopy',
        name: 'Snoopy',
        tagline: 'A cheerful fighter with sneaky combos.',
        spriteSrc: '/characters/snoopy_icon.png',
        portraitSrc: '/characters/snoopy_portrait.png',
      },
      {
        id: 'luffy',
        name: 'Luffy',
        tagline: 'Bouncy power — hits hard and keeps moving.',
        spriteSrc: '/characters/luffy_icon.png',
        portraitSrc: '/characters/luffy_portrait.png',
      },
      {
        id: 'zoro',
        name: 'Zoro',
        tagline: 'Heavy slashes — strong, stubborn, and precise.',
        spriteSrc: '/characters/zoro_icon.png',
        portraitSrc: '/characters/zoro_portrait.png',
      },
    ],
    []
  );

  // Local selection index for keyboard navigation (optional)
  const initialIndex = Math.max(
    0,
    characters.findIndex((c) => c.id === selectedCharacter)
  );
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    // Keep index synced if selectedCharacter changes from outside
    const idx = characters.findIndex((c) => c.id === selectedCharacter);
    if (idx >= 0) setIndex(idx);
  }, [selectedCharacter, characters]);

  useEffect(() => {
    // Keyboard controls: left/right to switch, Enter to start
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = (index - 1 + characters.length) % characters.length;
        setIndex(next);
        onSelectCharacter(characters[next].id);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (index + 1) % characters.length;
        setIndex(next);
        onSelectCharacter(characters[next].id);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, characters, onSelectCharacter, onStart]);

  const selected = characters[index];

  return (
    <div style={styles.root}>
      {/* LEFT: grid */}
      <div style={styles.left}>
        <div style={styles.titleRow}>
          <div style={styles.title}>Select Character</div>
          <div style={styles.hint}>← → to choose • Enter to Start</div>
        </div>

        <div style={styles.grid}>
          {characters.map((c) => {
            const active = c.id === selectedCharacter;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCharacter(c.id);
                  setIndex(characters.findIndex((x) => x.id === c.id));
                }}
                style={{
                  ...styles.tile,
                  ...(active ? styles.tileActive : null),
                }}
              >
                <div style={styles.tileInner}>
                  {/* icon (optional) */}
                  <div style={styles.iconWrap}>
                    {c.spriteSrc ? (
                      <img
                        src={c.spriteSrc}
                        alt={c.name}
                        style={styles.iconImg}
                        draggable={false}
                      />
                    ) : (
                      <div style={styles.iconFallback}>{c.name[0]}</div>
                    )}
                  </div>
                  <div style={styles.tileName}>{c.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={styles.footerRow}>
          <button style={styles.startBtn} onClick={onStart}>
            Start
          </button>
        </div>
      </div>

      {/* RIGHT: big preview (like Smash) */}
      <div style={styles.right}>
        <div style={styles.previewCard}>
          <div style={styles.previewTop}>
            <div style={styles.bigName}>{selected.name}</div>
            <div style={styles.tagline}>{selected.tagline}</div>
          </div>

          <div style={styles.portraitArea}>
            {selected.portraitSrc ? (
              <img
                src={selected.portraitSrc}
                alt={selected.name}
                style={styles.portraitImg}
                draggable={false}
              />
            ) : (
              <div style={styles.portraitFallback}>
                Add {selected.name} portrait PNG
              </div>
            )}
          </div>

          <div style={styles.pinkBar}>
            <div style={styles.pinkBarText}>{selected.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: 20,
    height: '100%',
    padding: 18,
    background:
      'linear-gradient(180deg, rgba(255,160,180,1) 0%, rgba(255,125,170,1) 45%, rgba(255,170,200,1) 100%)',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
  left: {
    background: 'rgba(0,0,0,0.12)',
    borderRadius: 16,
    padding: 14,
    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
    color: 'white',
    textShadow: '0 2px 0 rgba(0,0,0,0.25)',
  },
  title: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: 0.3,
  },
  hint: {
    fontSize: 12,
    opacity: 0.9,
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 10,
    padding: 6,
    flex: 1,
  },
  tile: {
    border: '3px solid rgba(255,255,255,0.45)',
    background: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    padding: 10,
    cursor: 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  },
  tileActive: {
    border: '4px solid rgba(255,255,255,0.95)',
    boxShadow: '0 0 0 4px rgba(255,0,150,0.55), 0 16px 40px rgba(0,0,0,0.22)',
    transform: 'translateY(-2px) scale(1.02)',
    background: 'rgba(255,255,255,0.26)',
  },
  tileInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 12,
    background: 'rgba(0,0,0,0.16)',
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
  },
  iconImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    imageRendering: 'pixelated',
  },
  iconFallback: {
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    color: 'white',
    fontWeight: 900,
    fontSize: 26,
  },
  tileName: {
    color: 'white',
    fontWeight: 900,
    fontSize: 14,
    textShadow: '0 2px 0 rgba(0,0,0,0.25)',
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  startBtn: {
    background: 'rgba(0,0,0,0.72)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.55)',
    borderRadius: 12,
    padding: '10px 14px',
    fontWeight: 900,
    cursor: 'pointer',
  },
  right: {
    display: 'flex',
    alignItems: 'stretch',
  },
  previewCard: {
    width: '100%',
    background: 'rgba(0,0,0,0.22)',
    borderRadius: 18,
    padding: 14,
    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  previewTop: {
    color: 'white',
    paddingBottom: 10,
    textShadow: '0 2px 0 rgba(0,0,0,0.25)',
  },
  bigName: {
    fontSize: 36,
    fontWeight: 1000,
    letterSpacing: 0.5,
    lineHeight: 1,
  },
  tagline: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 700,
    opacity: 0.95,
  },
  portraitArea: {
    flex: 1,
    background: 'rgba(0,0,0,0.28)',
    borderRadius: 16,
    overflow: 'hidden',
    display: 'grid',
    placeItems: 'center',
    border: '2px solid rgba(255,255,255,0.22)',
  },
  portraitImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  portraitFallback: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 800,
    padding: 18,
    textAlign: 'center',
  },
  pinkBar: {
    marginTop: 12,
    background: 'linear-gradient(90deg, rgba(255,0,150,0.9) 0%, rgba(255,90,190,0.95) 100%)',
    borderRadius: 14,
    border: '2px solid rgba(255,255,255,0.7)',
    padding: '10px 12px',
    display: 'flex',
    justifyContent: 'center',
  },
  pinkBarText: {
    color: 'white',
    fontWeight: 1000,
    fontSize: 22,
    textShadow: '0 3px 0 rgba(0,0,0,0.25)',
    letterSpacing: 0.4,
  },
};
