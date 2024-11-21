import { atom } from "recoil";

import { type Graph } from "./graphCurrent";

export const graphStackState = atom<Graph[]>({
  key: "graphStackState",
  default: [],
});
