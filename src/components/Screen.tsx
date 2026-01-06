import type { GameState, PowerState, CharacterId } from "./GameBoy";

import { HomeScreen } from "./screens/HomeScreen";
import { CharacterSelectScreen } from "./screens/CharacterSelectScreen";
import { BattleScreen } from "./screens/BattleScreen";
import { WinScreen } from "./screens/WinScreen";
import { LoseScreen } from "./screens/LoseScreen";
import { CreditsScreen } from "./screens/CreditsScreen";

interface ScreenProps {
  powerState: PowerState;
  gameState: GameState;
  onStateChange: (state: GameState) => void;

  //character selection (replaces equipment/outfits)
  character: CharacterId;
  onCharacterChange: (id: CharacterId) => void;
}

export function Screen({
  powerState,
  gameState,
  onStateChange,
  character,
  onCharacterChange,
}: ScreenProps) {
  //  power logic, remove this block and always render screens.
  if (powerState !== "on") {
    return (
      <div className="w-full h-[540px] bg-black flex items-center justify-center">
        <div className="text-neutral-500 text-sm">Power Off</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[540px]">
      {gameState === "home" && (
        <HomeScreen
          onStart={() => onStateChange("character-select")}
          onCredits={() => onStateChange("credits")}
        />
      )}

      {gameState === "character-select" && (
        <CharacterSelectScreen
          character={character}
          onCharacterChange={onCharacterChange}
          onBack={() => onStateChange("home")}
          onConfirm={() => onStateChange("battle")}
        />
      )}

      {gameState === "battle" && (
        <BattleScreen
          character={character}
          onWin={() => onStateChange("win")}
          onLose={() => onStateChange("lose")}
          onQuit={() => onStateChange("home")}
        />
      )}

      {gameState === "win" && <WinScreen onHome={() => onStateChange("home")} />}
      {gameState === "lose" && <LoseScreen onRetry={() => onStateChange("battle")} onHome={() => onStateChange("home")} />}
      {gameState === "credits" && <CreditsScreen onBack={() => onStateChange("home")} />}
    </div>
  );
}
