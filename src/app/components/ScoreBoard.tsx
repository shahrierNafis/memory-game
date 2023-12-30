import React, { useEffect, useState } from "react";

function ScoreBoard({
  picked,
  setGameEnded,
  setPicked,
}: {
  picked: string[];
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setPicked: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [highScore, setHighScore] = useState<number>(
    JSON.parse(localStorage.getItem("highScore") || "0")
  );

  useEffect(() => {
    if (highScore < picked.length) {
      localStorage.setItem("highScore", JSON.stringify(picked.length));
      setHighScore(picked.length);
    }
  }, [highScore, picked]);
  return (
    <>
      {
        <div className="z-50 flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-dvw h-dvh bg-zinc-900">
          <h1 className="text-3xl font-bold text-center">{picked.length}/12</h1>
          <h1 className="text-3xl font-bold text-center">
            High Score: {highScore}
          </h1>
          <button
            className="m-2 flex-grow-0 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              setGameEnded(false);
              setPicked([]);
            }}
          >
            Play Again
          </button>
        </div>
      }
    </>
  );
}

export default ScoreBoard;
