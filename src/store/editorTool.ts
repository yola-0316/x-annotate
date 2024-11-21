import { atom } from "recoil";

export type ToolType =
  | "move"
  | "pencil"
  | "eraser"
  | "line"
  | "ellipse"
  | "rect"
  | "text";

export const tools: ToolType[] = [
  "move",
  "pencil",
  "eraser",
  "line",
  "ellipse",
  "rect",
  "text",
];

export const editorToolState = atom<ToolType>({
  key: "editorToolState",
  default: "line",
});
