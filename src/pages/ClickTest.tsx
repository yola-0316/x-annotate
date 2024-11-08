import { useState } from "react";

export default function ClickTest() {
  const [lastClickedTime, setLastClickedTime] = useState<number | null>(null);
  const [currentClickedTime, setCurrentClickedTime] = useState<number | null>(
    null
  );
  const [clickTimeDiff, setClickTimeDiff] = useState<number | null>(null);

  const handleClick = () => {
    const now = Date.now();
    setLastClickedTime(currentClickedTime);
    setCurrentClickedTime(now);
    if (currentClickedTime !== null) {
      setClickTimeDiff(now - currentClickedTime);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1>ClickTest</h1>
      <div className="flex gap-4 items-center justify-center">
        <div>Last Clicked Time:</div>
        <div>
          {lastClickedTime !== null
            ? new Date(lastClickedTime).toISOString()
            : "N/A"}
        </div>
        <div>Current Click Time:</div>
        <div>
          {currentClickedTime !== null
            ? new Date(currentClickedTime).toISOString()
            : "N/A"}
        </div>
        <div>Click Time Diff:</div>
        <div>{clickTimeDiff !== null ? `${clickTimeDiff} ms` : "N/A"}</div>
      </div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
