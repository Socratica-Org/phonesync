"use client";
import { useEffect, useState } from "react";
import { getServerTime } from "./actions";

const LightShow = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentColor, setCurrentColor] = useState("white");
  const [timeOffset, setTimeOffset] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Sync with server time
  useEffect(() => {
    const syncTime = async () => {
      const start = Date.now();
      const serverTime = await getServerTime();
      const end = Date.now();
      const networkLatency = (end - start) / 2;
      setTimeOffset(serverTime + networkLatency - Date.now());
      console.log("Time sync:", {
        serverTime,
        networkLatency,
        offset: serverTime - Date.now(),
      });
    };
    syncTime();
  }, []);

  // Handle the light show sequence
  useEffect(() => {
    if (!isStarted || !startTime) return;

    const colors = ["blue", "green", "red", "yellow"];
    const showDuration = colors.length * 8 * 1000; // 8 seconds per color (5s display + 3s fade)

    const updateColor = () => {
      const currentTime = Date.now() + timeOffset;
      const elapsedTime = currentTime - startTime;

      console.log("Update frame:", {
        currentTime,
        startTime,
        elapsedTime,
        timeOffset,
      });

      if (elapsedTime >= showDuration) {
        console.log("Show ended");
        setIsStarted(false);
        setCurrentColor("white");
        return;
      }

      const cyclePosition = Math.floor(elapsedTime / 8000); // Which color we're on
      const cycleTime = elapsedTime % 8000; // Time within current color cycle

      console.log("Color cycle:", {
        cyclePosition,
        cycleTime,
        currentColor: cycleTime < 5000 ? colors[cyclePosition] : "black",
      });

      if (cycleTime < 5000) {
        // Show the current color
        setCurrentColor(colors[cyclePosition]);
      } else {
        // Fade to black
        setCurrentColor("black");
      }

      requestAnimationFrame(updateColor);
    };

    requestAnimationFrame(updateColor);
  }, [isStarted, startTime, timeOffset]);

  const handleStart = () => {
    const currentTime = Date.now() + timeOffset;
    const scheduledStart = currentTime + 5000;
    console.log("Starting show:", {
      currentTime,
      timeOffset,
      scheduledStart,
    });
    setStartTime(scheduledStart); // Start in 5 seconds
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="w-full h-screen transition-colors duration-1000"
        style={{ backgroundColor: currentColor }}
      >
        <div className="absolute top-4 left-4">
          {!isStarted && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-100"
            >
              Start Light Show
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LightShow;
