import { useEffect, useRef } from "react";

export default function useScrollToBottomAction(
  container,
  callback,
  offset = 0
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!container) return;

    const handleScroll = () => {
      let scrollContainer =
        container === document ? document.scrollingElement : container;

      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [container, offset]);
}
