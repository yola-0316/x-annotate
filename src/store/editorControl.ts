import { atom } from "recoil";

export type EditorControl = {
  color: string;
  strokeWidth: number;
};

export const editorControlsState = atom({
  key: "editorControlsState",
  default: {
    color: "#a855f7",
    strokeWidth: 2,
  },
});
