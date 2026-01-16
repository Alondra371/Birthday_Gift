import snoopy0 from "./snoopy/frame_00.png";
import snoopy1 from "./snoopy/frame_01.png";
import snoopy2 from "./snoopy/frame_02.png";
import snoopy3 from "./snoopy/frame_03.png";
import snoopy4 from "./snoopy/frame_04.png";
import snoopy5 from "./snoopy/frame_05.png";

import luffy0 from "./luffy/frame_00.png";
import luffy1 from "./luffy/frame_01.png";
// ...

import zoro0 from "./zoro/frame_00.png";
import zoro1 from "./zoro/frame_01.png";
// ...

export const CHARACTERS = {
  snoopy: [snoopy0, snoopy1, snoopy2, snoopy3, snoopy4, snoopy5],
  luffy: [luffy0, luffy1],
  zoro: [zoro0, zoro1],
};

export type CharacterId = keyof typeof CHARACTERS;
