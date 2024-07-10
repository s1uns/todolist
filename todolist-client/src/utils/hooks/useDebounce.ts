import { useState } from "react";

type CustomFunction = (...args: any[]) => void; //fix any[]
type Timer = ReturnType<typeof setTimeout>;

function useDebounce<Func extends CustomFunction>(func: Func, delay: number) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer);
    setTimer(newTimer);
  }) as Func;

  return debouncedFunction;
}

export default useDebounce;
