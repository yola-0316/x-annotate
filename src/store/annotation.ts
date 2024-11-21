import { atom, selector } from "recoil";

/**
 * Start Annotation by file
 */
export const annotateFileState = atom<File | null>({
  key: "AnnotateFile",
  default: null,
});

/**
 * Start Annotation by canvas
 */
type CanvasState = {
  initialized: boolean;
  width: number;
  height: number;
};

export const annotateCanvasState = atom<CanvasState>({
  key: "AnnotateCanvas",
  default: {
    initialized: false,
    width: 640,
    height: 480,
  },
});

export const annotationState = selector({
  key: "Annotation",
  get: ({ get }) => {
    const file = get(annotateFileState);
    const canvas = get(annotateCanvasState);

    const fileUrl = file ? URL.createObjectURL(file) : null;

    console.log(file, canvas);

    return {
      initialized: file !== null || canvas.initialized,
      file,
      fileUrl,
      canvas,
    };
  },
});
