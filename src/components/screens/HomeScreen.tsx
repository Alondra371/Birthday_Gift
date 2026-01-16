import React from 'react';

export type HomeScreenProps = {
  onStart: () => void;
  onCredits: () => void;
};

export function HomeScreen({ onStart, onCredits }: HomeScreenProps) {
  return (
    <div style={{ padding: 16 }}>
      <h1>Birthday Gift</h1>

      <button onClick={onStart} style={{ marginRight: 8 }}>
        Start
      </button>

      <button onClick={onCredits}>Credits</button>
    </div>
  );
}
