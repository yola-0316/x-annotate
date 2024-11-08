import "./App.css";

import { useState, useRef, useEffect } from "react";
import { Link, Route, Switch } from "wouter";

import { FileReader } from "@tanker/file-reader";
import { fileTypeFromBlob } from "file-type";

import {
  FileUpload,
  fileReader,
  calcImageBrightness,
} from "../components/FileUpload";
// import { PdfViewer } from "./components/PDFRender";

function App() {
  const [imgBuffer, setImgBuffer] = useState<ArrayBuffer | undefined>();
  // const [pdfFile, setPdfFile] = useState<File | undefined>();
  const [fileType, setFileType] = useState<string | undefined>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasSize = 0x1000;
  const blockSize = 1;

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader(file);
    const arrayBuffer = await reader.readAsArrayBuffer();
    setImgBuffer(arrayBuffer);
    // const result = await fileReader(file);
    // setFileType(result?.mime);
    // setPdfFile(file);
  };

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const brightness = calcImageBrightness(img);
    console.log("brightness:", brightness);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // for (let i = 0xf00000; i < 0xffffff; i++) {
    //   ctx.fillStyle = `#${i.toString(16).padStart(6, "0")}`;
    //   ctx.fillRect(
    //     (i % canvasSize) * blockSize,
    //     Math.floor(i / canvasSize) * blockSize,
    //     blockSize,
    //     blockSize
    //   );
    // }
  };

  useEffect(() => {
    draw();
  }, []);

  function renderImg(buffer?: ArrayBuffer) {
    if (!buffer) return null;
    return (
      <img
        src={URL.createObjectURL(new Blob([buffer]))}
        onLoad={handleImgLoad}
      />
    );
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <Link href="/users/1">Profile</Link>

      <Route path="/about">About Us</Route>

      {/*
Routes below are matched exclusively -
the first matched route gets rendered
*/}
      <Switch>
        <Route path="/inbox" component={InboxPage} />

        <Route path="/users/:name">
          {(params) => <>Hello, {params.name}!</>}
        </Route>

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <div className="image-container flex justify-center items-center bg-gray-200 p-4">
        {renderImg(imgBuffer)}
      </div>
      {/* <PdfViewer file={pdfFile} /> */}

      <div className="divider w-full h-1 bg-gray-400 my-4 flex-shrink-0"></div>

      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;

function InboxPage() {
  return <div>Inbox</div>;
}
