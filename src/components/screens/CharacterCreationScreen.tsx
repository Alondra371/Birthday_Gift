import { useEffect, useState } from 'react';                               // ← ADD
import type { CharacterEquipment } from '../GameBoy';
import { SnoopyCharacter } from '../SnoopyCharacter';

type Slot = 'head' | 'body' | 'feet';                                     // ← ADD

const accessories: Record<Slot, { id: string; name: string }[]> = {       // ← ADD
  head: [
    { id: 'luffy-hat', name: 'Luffy Hat' },
    { id: 'zoro-bandana', name: 'Zoro Bandana' },
  ],
  body: [
    { id: 'luffy-vest', name: 'Luffy Vest' },
    { id: 'zoro-swords', name: 'Zoro Swords' },
  ],
  feet: [
    { id: 'luffy-sandals', name: 'Luffy Sandals' },
  ],
};

interface Props {
  equipment: CharacterEquipment;
  onEquipmentChange: (e: CharacterEquipment) => void;
  onComplete: () => void;
  dpadDirection: string | null;
  aButtonPressed: boolean;
}

export function CharacterCreationScreen({
  equipment,
  onEquipmentChange,
  onComplete,
  dpadDirection,
  aButtonPressed,
}: Props) {
  const [slot, setSlot] = useState<Slot>('head');                           // ← now useState exists
  const list = accessories[slot];
  const idx = list.findIndex((i) => i.id === equipment[slot]);

  useEffect(() => {
    if (dpadDirection === 'left' && idx > 0)
      onEquipmentChange({ ...equipment, [slot]: list[idx - 1].id });
    if (dpadDirection === 'right' && idx < list.length - 1)
      onEquipmentChange({ ...equipment, [slot]: list[idx + 1].id });
    if (dpadDirection === 'up') setSlot('head');
    if (dpadDirection === 'down') setSlot('body');
  }, [dpadDirection, idx, list, equipment, onEquipmentChange]);

  useEffect(() => {
    if (aButtonPressed) onComplete();
  }, [aButtonPressed, onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-between p-4" style={{ background: 'var(--gb-home-lilac-bottom)' }}>
      <div className="flex items-center gap-4">
        <SnoopyCharacter equipment={equipment} size="medium" />
        <div className="flex flex-col gap-2">
          {(['head', 'body', 'feet'] as Slot[]).map((s) => (
            <div
              key={s}
              className={`rounded-lg px-3 py-1 border ${slot === s ? 'border-yellow-400' : 'border-gray-300'}`}
              style={{ borderColor: slot === s ? 'var(--gb-yellow)' : 'var(--gb-gold-bottom)' }}
            >
              {s}: {equipment[s] ? accessories[s].find((i) => i.id === equipment[s])?.name : 'none'}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onComplete}
        className="rounded-lg px-4 py-2"
        style={{ background: 'var(--gb-yellow)', border: '2px solid var(--gb-gold-bottom)' }}
      >
        START battle
      </button>
    </div>
  );
}