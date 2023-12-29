"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Start from "./components/Start";
import useCharacters from "./hooks/useCharacters";
import characterData from "./characterData";
export default function Home() {
  const { loading, progress, characters } = useCharacters(characterData);

  return (
    <>
      <Start {...{ loading, progress }} />
    </>
  );
}
