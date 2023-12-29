import axios from "axios";
import { useEffect, useState } from "react";

export type Character = {
  name: string;
  image: Blob;
  id: string;
};

function useCharacter(characterData: { imageUrl: string; name: string }[]) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [characters, setCharacter] = useState<Character[]>([]);
  useEffect(() => {
    const abortControllerArr: AbortController[] = [];
    (async () => {
      for (const [index, character] of Array.from(characterData.entries())) {
        const abortController = new AbortController();
        abortControllerArr.push(abortController);
        // Download image
        const image = (
          await axios.get(character.imageUrl, {
            signal: abortController.signal,
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // Update progress
                setProgress(
                  (index * 100 + percentCompleted) / characterData.length
                );
              }
            },
          })
        ).data;

        // Add character
        setCharacter((characters) => [
          ...characters,
          { name: character.name, image, id: String(index) },
        ]);
      }
      setLoading(false);
    })();

    return () => {
      for (const abortController of abortControllerArr) {
        abortController.abort();
      }
    };
  }, [characterData]);
  return {
    loading,
    progress,
    characters,
  };
}

export default useCharacter;
