import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { ActionIcon, ColorInput, Slider, Tooltip, rem } from "@mantine/core";
import {
  IconArrowBackUp,
  IconDownload,
  IconFocus2,
  IconTrash,
} from "@tabler/icons-react";

import ToolBox from "../components/ToolBox";
import DynaGraph, { Graph, ToolType } from "../components/DynaGraph";

export const ImageAnnotateKonva = () => {
  const [color, setColor] = useState("#ff4400");
  const [strokeWidth, setStrokeWidth] = useState(2);

  const [tool, setTool] = useState<ToolType>("line");

  const [activeGraph, setActiveGraph] = useState<Graph>({
    tool,
    points: [],
  });
  const [historyGraphs, setHistoryGraphs] = useState<Graph[]>([]);

  const handleMouseDown = (options: Konva.KonvaEventObject<MouseEvent>) => {
    const { layerX: x, layerY: y } = options.evt;
    if (!activeGraph.points?.length) {
      setActiveGraph({
        tool,
        points: [x, y],
      });
    } else if (activeGraph.points?.length === 2) {
      setActiveGraph((prev) => ({
        tool: prev.tool,
        points: [...prev.points, x, y],
      }));
    } else {
      setHistoryGraphs((prev) => [...prev, activeGraph]);
      setActiveGraph({ tool, points: [] });
    }
  };

  const handleMouseMove = (options: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeGraph.points?.length) {
      setActiveGraph((prev) => ({
        tool: prev.tool,
        points: [
          prev.points[0],
          prev.points[1],
          options.evt.layerX,
          options.evt.layerY,
        ],
      }));
    }
  };

  return (
    <div className="grid grid-cols-[3rem_1fr] h-full">
      <div className="argbar col-span-2 flex gap-4 items-center">
        <i className="text-2xl text-purple-500 font-bold px-4">X-Annotate</i>
        <ColorInput
          className="w-28"
          size="xs"
          value={color}
          onChange={setColor}
          eyeDropperIcon={
            <IconFocus2
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          swatches={[
            "#2e2e2e",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
        />
        <Slider
          className="w-40"
          value={strokeWidth}
          onChange={setStrokeWidth}
          min={1}
          max={32}
        />
        <span className="text-sm w-10">{strokeWidth}px</span>
        <Tooltip label="Undo">
          <ActionIcon>
            <IconArrowBackUp />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Clear">
          <ActionIcon>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Save">
          <ActionIcon>
            <IconDownload />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="sidebar">
        <ToolBox tool={tool} setTool={setTool} />
      </div>
      <div className="content flex-grow">
        <Stage
          width={1024}
          height={1024}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          className="border border-gray-300"
        >
          <Layer>
            <DynaGraph
              tool={tool}
              activeGraph={activeGraph}
              graphStack={historyGraphs}
              color={color}
              strokeWidth={strokeWidth}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default ImageAnnotateKonva;
