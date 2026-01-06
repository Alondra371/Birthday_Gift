import { useState } from "react";
import { Screen } from "./Screen";

/** Which character sheet to use */
export type CharacterId = "snoopy" | "luffy" | "zoro";

/** Basic game state */
export type GameState = "home" | "character-select" | "battle" | "win" | "lose" | "credits";

/** Optional: power state if your UI simulates a GameBoy boot */
export type PowerState = "off" | "booting" | "on";

export function GameBoy() {
  // If you don't care about power states, you can hardcode "on"
  const [powerState, setPowerState] = useState<PowerState>("on");

  const [gameState, setGameState] = useState<GameState>("home");

  // Selected character (no accessories, no equipment)
  const [character, setCharacter] = useState<CharacterId>("snoopy");

  // Example: if you had a power button before
  function togglePower() {
    setPowerState((prev) => (prev === "on" ? "off" : "on"));
    if (powerState === "on") setGameState("home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
      <div className="w-[420px] max-w-full rounded-3xl bg-neutral-900 p-6 shadow-2xl border border-neutral-800">
        {/* Optional top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-neutral-200 font-semibold">Birthday Gift</div>

          {/* Optional power button */}
          <button
            onClick={togglePower}
            className="px-3 py-1 rounded-lg bg-neutral-800 text-neutral-100 text-sm hover:bg-neutral-700"
          >
            Power
          </button>
        </div>

        {/* Screen */}
        <div className="rounded-2xl bg-black border border-neutral-800 overflow-hidden">
          <Screen
            powerState={powerState}
            gameState={gameState}
            onStateChange={setGameState}
            character={character}
            onCharacterChange={setCharacter}
          />
        </div>

        {/* Optional controls UI area */}
        <div className="mt-5 text-neutral-500 text-xs">
          Tip: Select a character → Battle Big Mom
        </div>
      </div>
    </div>
  );
}
