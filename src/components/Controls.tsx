import { Power } from "lucide-react";

interface ControlsProps {
  onPowerToggle: () => void;
  onButtonPress: (button: string) => void;
  onDPadPress: (direction: string) => void;
  powerState: "off" | "booting" | "on";
}

export function Controls({
  onPowerToggle,
  onButtonPress,
  onDPadPress,
  powerState,
}: ControlsProps) {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-32 h-32">
          <DPad onPress={onDPadPress} />
        </div>

        <div className="relative flex items-center gap-4 -rotate-12">
          <ActionButton
            label="B"
            color="bg-yellow-300"
            onClick={() => onButtonPress("b")}
          />
          <ActionButton
            label="A"
            color="bg-pink-300"
            onClick={() => onButtonPress("a")}
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mb-6">
        <StartSelectButton
          label="SELECT"
          onClick={() => onButtonPress("select")}
        />
        <StartSelectButton
          label="START"
          onClick={() => onButtonPress("start")}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onPowerToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
          style={{
            background: powerState === "on" ? "#10b981" : "#374151",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <Power size={16} className="text-white" />
          <span className="text-xs font-bold text-white">
            {powerState === "on" ? "ON" : "OFF"}
          </span>
        </button>
      </div>
    </div>
  );
}

function DPad({ onPress }: { onPress: (direction: string) => void }) {
  const buttonStyle =
    "absolute bg-gray-700 hover:bg-gray-600 active:bg-gray-800 transition-all cursor-pointer shadow-lg";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className={`${buttonStyle} w-10 h-12 rounded-t-lg`}
        style={{ top: "0", left: "50%", transform: "translateX(-50%)" }}
        onClick={() => onPress("up")}
      />
      <div
        className={`${buttonStyle} w-10 h-12 rounded-b-lg`}
        style={{ bottom: "0", left: "50%", transform: "translateX(-50%)" }}
        onClick={() => onPress("down")}
      />
      <div
        className={`${buttonStyle} w-12 h-10 rounded-l-lg`}
        style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
        onClick={() => onPress("left")}
      />
      <div
        className={`${buttonStyle} w-12 h-10 rounded-r-lg`}
        style={{ right: "0", top: "50%", transform: "translateY(-50%)" }}
        onClick={() => onPress("right")}
      />
      <div
        className="absolute w-10 h-10 bg-gray-800 rounded-sm"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

function ActionButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-16 h-16 ${color} rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all`}
      style={{
        boxShadow:
          "0 4px 8px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
        {label}
      </span>
    </button>
  );
}

function StartSelectButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-gray-600 hover:bg-gray-500 active:bg-gray-700 rounded-full shadow-md transition-all"
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.3)", transform: "rotate(-20deg)" }}
    >
      <span className="text-xs font-bold text-white">{label}</span>
    </button>
  );
}
