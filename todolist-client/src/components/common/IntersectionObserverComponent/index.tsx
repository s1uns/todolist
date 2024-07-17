import { useEffect, useRef } from "react";
interface IntersectionObserverProps {
  hasMore: boolean;
  fetchMore: () => void;
}

const IntersectionObserverComponent = (props: IntersectionObserverProps) => {
  const { hasMore, fetchMore } = props;
  if (!hasMore) {
    return null;
  }

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return <div ref={observerTarget}>Loading...</div>;
};

export default IntersectionObserverComponent;
