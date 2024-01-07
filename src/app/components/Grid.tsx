import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Character } from "../hooks/useCharacters";
import { motion } from "framer-motion";
import ScoreBoard from "./ScoreBoard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          <div className="py-8 flex flex-wrap overflow-hidden ">
            {shuffled.map((character) => {
              return (
                <motion.div
                  layout
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 2,
                    velocity: 2,
                  }}
                  className="basis-1/2 md:basis-1/4 flex-grow-0 cursor-pointer ring-white md:hover:ring-2 md:hover:z-50 relative  aspect-video border border-black shadow rounded-md"
                  key={character.id}
                  onClick={() => handlePick(character.id)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={URL.createObjectURL(character.image)}
                          alt="image"
                          fill
                        />
                      </TooltipTrigger>
                      <TooltipContent>{character.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
