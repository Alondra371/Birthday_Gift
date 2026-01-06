import { HomeScreen } from './screens/HomeScreen';
import { SplashScreen } from './screens/SplashScreen';
import { CharacterSelectScreen } from './screens/CharacterSelectScreen';
import { BattleScreen } from './screens/BattleScreen';
import { WinScreen } from './screens/WinScreen';
import { LoseScreen } from './screens/LoseScreen';
import { CreditsScreen } from './screens/CreditsScreen';
import type { CharacterEquipment } from './GameBoy';

type PowerState = 'off' | 'booting' | 'on';
type GameState = 'home' | 'splash' | 'character-creation' | 'battle' | 'win' | 'lose' | 'credits';

interface ScreenProps {
  powerState: PowerState;
  gameState: GameState;
  onStateChange: (state: GameState) => void;
  characterEquipment: CharacterEquipment;
  onEquipmentChange: (equipment: CharacterEquipment) => void;
  dpadDirection: string | null;
  aButtonPressed: boolean;
  bButtonPressed: boolean;
}

export function Screen({
  powerState,
  gameState,
  onStateChange,
  characterEquipment,
  onEquipmentChange,
  dpadDirection,
  aButtonPressed,
  bButtonPressed,
}: ScreenProps) {
  return (
    <div className="relative mb-6">
      <div
        className="rounded-xl p-4"
        style={{
          background: 'linear-gradient(145deg, var(--gb-bezel-top), var(--gb-bezel-bottom))',
          boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)',
        }}
      >
        <div
          className="rounded-lg p-1"
          style={{
            background: 'linear-gradient(145deg, var(--gb-gold-top), var(--gb-gold-bottom))',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <div
            className="relative rounded-md overflow-hidden"
            style={{
              aspectRatio: '10/9',
              background: powerState === 'off' ? 'var(--gb-lcd-off)' : 'var(--gb-lcd-on)',
            }}
          >
            {powerState === 'off' && <div className="absolute inset-0 bg-black" />}
            {powerState === 'booting' && (
              <div className="absolute inset-0 bg-white flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#6b7280' }}>Nintendo</div>
                  <div className="text-sm" style={{ color: '#9ca3af' }}>Game Boy Color</div>
                </div>
              </div>
            )}
            {powerState === 'on' && (
              <div className="absolute inset-0">
                {gameState === 'home' && <HomeScreen onStart={() => onStateChange('splash')} />}
                {gameState === 'splash' && <SplashScreen />}
                {gameState === 'character-creation' && (
                  <CharacterCreationScreen
                    equipment={characterEquipment}
                    onEquipmentChange={onEquipmentChange}
                    onComplete={() => onStateChange('battle')}
                    dpadDirection={dpadDirection}
                    aButtonPressed={aButtonPressed}
                  />
                )}
                {gameState === 'battle' && (
                  <BattleScreen
                    equipment={characterEquipment}
                    onWin={() => onStateChange('win')}
                    onLose={() => onStateChange('lose')}
                    aButtonPressed={aButtonPressed}
                    bButtonPressed={bButtonPressed}
                  />
                )}
                {gameState === 'win' && <WinScreen onContinue={() => onStateChange('credits')} />}
                {gameState === 'lose' && <LoseScreen onContinue={() => onStateChange('credits')} />}
                {gameState === 'credits' && <CreditsScreen onReturnHome={() => onStateChange('home')} />}
              </div>
            )}
            {powerState === 'on' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
                  mixBlendMode: 'multiply',
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 right-8 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: powerState === 'on' ? '#10b981' : '#374151',
            boxShadow: powerState === 'on' ? '0 0 8px #10b981' : 'none',
          }}
        />
        <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>POWER</span>
      </div>
    </div>
  );
}