import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Character } from "../hooks/useCharacters";
import { motion } from "framer-motion";
import ScoreBoard from "./ScoreBoard";
function Grid({
  loading,
  characters,
}: {
  loading: boolean;
  characters: Character[];
}) {
  const [shuffled, setShuffled] = useState<Character[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  useEffect(() => {});

  function handlePick(id: string) {
    if (picked.includes(id)) {
      return setGameEnded(true);
    }
    setPicked([...picked, id]);
    setShuffled(shuffled.toSorted(() => Math.random() - 0.5));
    if (picked.length === 11) {
      setGameEnded(true);
    }
  }

  useEffect(() => {
    setShuffled(characters);
  }, [characters]);
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <h1 className="text-6xl font-bold text-center">{picked.length}</h1>
          <div className="grid sm:grid-cols-4 grid-cols-2 w-dvw overflow-hidden">
            {shuffled.map((character) => {
              return (
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 2,
                    velocity: 2,
                  }}
                  className="relative  aspect-video border border-black shadow rounded-md"
                  key={character.id}
                  onClick={() => handlePick(character.id)}
                >
                  <Image
                    src={URL.createObjectURL(character.image)}
                    alt="image"
                    fill
                  />
                </motion.div>
              );
            })}
          </div>
          {gameEnded && <ScoreBoard {...{ picked, setGameEnded, setPicked }} />}
        </>
      )}
    </>
  );
}

export default Grid;
