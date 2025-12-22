import { useState } from "react";
import { Screen } from "./Screen";
import { Controls } from "./Controls";

type PowerState = "off" | "booting" | "on";
type GameState =
  | "home"
  | "splash"
  | "character-creation"
  | "battle"
  | "win"
  | "lose"
  | "credits";

export interface CharacterEquipment {
  head: string | null;
  body: string | null;
  feet: string | null;
}

export function GameBoy() {
  const [powerState, setPowerState] = useState<PowerState>("off");
  const [gameState, setGameState] = useState<GameState>("home");
  const [characterEquipment, setCharacterEquipment] =
    useState<CharacterEquipment>({
      head: null,
      body: null,
      feet: null,
    });

  const [dpadDirection, setDpadDirection] = useState<string | null>(null);
  const [aButtonPressed, setAButtonPressed] = useState(false);
  const [bButtonPressed, setBButtonPressed] = useState(false);

  const handlePowerToggle = () => {
    if (powerState === "off") {
      setPowerState("booting");
      setTimeout(() => {
        setPowerState("on");
        setGameState("home");
      }, 1200);
    } else {
      setPowerState("off");
      setGameState("home");
      setCharacterEquipment({ head: null, body: null, feet: null });
    }
  };

  const handleButtonPress = (button: string) => {
    if (powerState !== "on") return;

    if (button === "a") {
      setAButtonPressed(true);
      setTimeout(() => setAButtonPressed(false), 120);
    }
    if (button === "b") {
      setBButtonPressed(true);
      setTimeout(() => setBButtonPressed(false), 120);
    }

    if (button === "start") {
      if (gameState === "home") setGameState("splash");
      else if (gameState === "splash") setGameState("character-creation");
      else if (gameState === "character-creation") setGameState("battle");
      else if (gameState === "win" || gameState === "lose")
        setGameState("credits");
    }

    if (button === "select") {
      if (gameState === "credits") {
        setGameState("home");
        setCharacterEquipment({ head: null, body: null, feet: null });
      }
    }

    // allow A as "continue" on win/lose
    if (button === "a") {
      if (gameState === "win" || gameState === "lose") setGameState("credits");
    }
  };

  const handleDPadPress = (direction: string) => {
    if (powerState !== "on") return;
    setDpadDirection(direction);
    setTimeout(() => setDpadDirection(null), 120);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="relative rounded-[2rem] p-6 shadow-2xl"
        style={{
          background:
            "linear-gradient(145deg, var(--gb-shell-top), var(--gb-shell-bottom))",
          boxShadow:
            "0 20px 60px var(--gb-plastic-shadow), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        <div className="text-center mb-4">
          <div
            className="text-sm font-bold tracking-wider"
            style={{ color: "#6b7280" }}
          >
            Nintendo
          </div>
          <div
            className="text-xs font-semibold tracking-widest"
            style={{ color: "#9ca3af" }}
          >
            GAME BOY COLOR
          </div>
        </div>

        <Screen
          powerState={powerState}
          gameState={gameState}
          onStateChange={setGameState}
          characterEquipment={characterEquipment}
          onEquipmentChange={setCharacterEquipment}
          dpadDirection={dpadDirection}
          aButtonPressed={aButtonPressed}
          bButtonPressed={bButtonPressed}
        />

        <Controls
          onPowerToggle={handlePowerToggle}
          onButtonPress={handleButtonPress}
          onDPadPress={handleDPadPress}
          powerState={powerState}
        />
      </div>
    </div>
  );
}
