/** @jsx h */
import { FunctionalComponent, h } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { tw } from "@twind";

const useAnimationFrame = (callback: (d: number) => void) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a render on their change
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = self.requestAnimationFrame(animate);
    return () => self.cancelAnimationFrame(requestRef.current ?? 0);
  }, [animate]); // Make sure the effect runs only once
};

const Anim: FunctionalComponent = () => {
  const [rotate, setRotate] = useState(0);

  useAnimationFrame((deltaTime) => {
    setRotate((prevCount) => (prevCount + deltaTime * (30 / 100)) % 360);
  });

  return (
    <svg
      class={tw`ml-1 mr-3 h-5 w-5 text-indigo-600`}
      style={{ transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class={tw`opacity-25`}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      >
      </circle>
      <path
        class={tw`opacity-75`}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      >
      </path>
    </svg>
  );
};

export default Anim;
