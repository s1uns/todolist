import { useEffect, useState } from "react";

const useDebounce = <T>(val: T, delay = 500) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val]);

  return debounceVal;
};

export default useDebounce;
