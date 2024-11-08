import { useState } from "react";

const ColorStart = 0x000000;
const ColorEnd = 0xffffff;

function randomColorValue() {
  return Math.floor(Math.random() * (ColorEnd - ColorStart + 1)) + ColorStart;
}

function hexValueToColorString(value: number) {
  return value.toString(16).padStart(6, "0");
}

function randomColor() {
  return hexValueToColorString(randomColorValue());
}

export default function ColorCompare() {
  const [diffValue, setDiffValue] = useState<number>(0xff);

  const initialLeftColorValue = randomColorValue();
  const initialRightColorValue = initialLeftColorValue - diffValue;
  const [leftColor, setLeftColor] = useState<string>(
    hexValueToColorString(initialLeftColorValue)
  );
  const [rightColor, setRightColor] = useState<string>(
    hexValueToColorString(initialRightColorValue)
  );

  const genNextColor = () => {
    const nextLeftColorValue = randomColorValue();
    const nextRightColorValue = nextLeftColorValue - diffValue;
    setLeftColor(hexValueToColorString(nextLeftColorValue));
    setRightColor(hexValueToColorString(nextRightColorValue));
  };

  return (
    <div className="flex flex-col h-screen">
      <h1>ColorCompare</h1>
      <div>
        Test Mode:{" "}
        {/* <b style={{ color: `#${randomColor()}` }}>#{randomColor()}</b> */}
        Diff Value:
        <input
          type="range"
          min="0"
          max="255"
          value={diffValue}
          onChange={(e) => setDiffValue(parseInt(e.target.value))}
        />
        <b>{diffValue}</b>
      </div>
      <div className="show-area flex">
        <div
          className="left-color h-20 w-1/2"
          style={{ backgroundColor: `#${leftColor}` }}
          data-color={leftColor}
        ></div>
        <div
          className="right-color h-20 w-1/2"
          style={{ backgroundColor: `#${rightColor}` }}
          data-color={rightColor}
        ></div>
      </div>
      <div>
        <button onClick={genNextColor}>Next Pair</button>
      </div>
    </div>
  );
}
