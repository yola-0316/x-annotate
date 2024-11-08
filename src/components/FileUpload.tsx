import { fileTypeFromBlob } from "file-type";

export function FileUpload({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) {
  return (
    <input
      type="file"
      // accept=".pdf, .jpg, .png, .mp4"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onFileUpload(file);
      }}
    />
  );
}

export async function fileReader(file: File) {
  const first100Bytes = file.slice(0, 100);
  const result = await fileTypeFromBlob(first100Bytes);
  console.log(result);
  return result;
}

export function calcImageBrightness(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;
  let brightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    brightness += (r + g + b) / 3;
  }
  return brightness / (img.width * img.height);
}
