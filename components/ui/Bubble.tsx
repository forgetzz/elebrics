"use client";

import { useEffect, useState } from "react";

type Bubble = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  width: number;
  height: number;
};

export default function Bubble() {
  const [bubbles, setBubbles] =
    useState<Bubble[]>([]);

  useEffect(() => {
    const generated =
      Array.from({
        length: 25,
      }).map((_, i) => ({
        id: i,
        left:
          Math.random() * 100,
        delay:
          Math.random() * 8,
        duration:
          6 +
          Math.random() * 8,
        width:
          8 +
          Math.random() * 18,
        height:
          8 +
          Math.random() * 18,
      }));

    setBubbles(generated);
  }, []);

  return (
    <div className="bubbleContainer">
      {bubbles.map(
        (bubble) => (
          <span
            key={bubble.id}
            className="spriteBubble"
            style={{
              left:
                `${bubble.left}%`,
              animationDelay:
                `${bubble.delay}s`,
              animationDuration:
                `${bubble.duration}s`,
              width:
                `${bubble.width}px`,
              height:
                `${bubble.height}px`,
            }}
          />
        )
      )}
    </div>
  );
}