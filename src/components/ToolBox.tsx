import {
  IconPencil,
  IconCursorText,
  IconEraser,
  IconSquare,
  IconCircle,
  IconLine,
} from "@tabler/icons-react";
import { Tooltip, rem } from "@mantine/core";

import { ToolType } from "./DynaGraph";

const iconNameMap = {
  line: IconLine,
  ellipse: IconCircle,
  rect: IconSquare,
};

interface ToolBoxProps {
  tool: ToolType;
  setTool: (tool: ToolType) => void;
}
export default function ToolBox({ tool, setTool }: ToolBoxProps) {
  const tools: ToolType[] = ["line", "ellipse", "rect"];

  return (
    <div className="tool-box flex flex-col items-center gap-4">
      <Tooltip label="Pencil">
        <button>
          <IconPencil />
        </button>
      </Tooltip>
      <Tooltip label="Eraser">
        <button>
          <IconEraser />
        </button>
      </Tooltip>
      {tools.map((t) => {
        const Icon = iconNameMap[t];
        return (
          <Tooltip key={t} label={t.charAt(0).toUpperCase() + t.slice(1)}>
            <button
              key={t}
              className={tool === t ? "text-blue-500" : ""}
              onClick={() => setTool(t)}
            >
              <Icon />
            </button>
          </Tooltip>
        );
      })}
      <Tooltip label="Text">
        <button>
          <IconCursorText />
        </button>
      </Tooltip>
    </div>
  );
}
