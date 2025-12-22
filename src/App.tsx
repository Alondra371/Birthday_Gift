import { GameBoy } from "./components/GameBoy";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center p-4">
      <GameBoy />
    </div>
  );
}
