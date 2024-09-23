import { useEffect, useRef } from "react";

const useCustomEffect = (callback: () => void, dependecies?: any[]) => {
  const isMounted = useRef(false);

  useEffect(
    () => {
      if (isMounted.current) {
        callback();
      }

      return () => {
        isMounted.current = true;
      };
    },
    dependecies ? [...dependecies] : undefined
  );
};

export default useCustomEffect;
