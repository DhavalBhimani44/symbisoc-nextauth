"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
export function Heading() {
  const words = [
    {
      text: "Club's",
      className: "text-white"
    },
    {
      text: "at",
      className: "text-white"
    },
    {
      text: "SIT.",
      className: "text-red-500 dark:text-red-500",
    },
  ];
  return (
    <h1 className="mt-6 mb-6 max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
      <TypewriterEffectSmooth words={words} />
    </h1>
  );
}
