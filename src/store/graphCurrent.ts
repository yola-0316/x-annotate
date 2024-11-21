import { atom } from "recoil";

import { type ToolType } from "./editorTool";

export type PointPair = number[];

export type Graph = {
  tool?: ToolType;
  points: PointPair;
  color?: string;
  strokeWidth?: number;
  draggable?: boolean;
  text?: string;
};

export const activeGraphState = atom<Graph>({
  key: "activeGraphState",
  default: {
    tool: undefined,
    points: [],
    draggable: false,
  },
});

export const globalAnnotateState = atom({
  key: "globalAnnotateState",
  default: false,
});
