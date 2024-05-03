import { useEffect, useState } from "react";

export default function useResizeObserver(element: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0, offsetTop: 0 });

  useEffect(() => {
    if (window.ResizeObserver === undefined) {
      console.warn("ResizeObserver is not supported in this browser");
      return;
    }

    /* eslint-disable compat/compat */
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        setSize({
          width: element?.clientWidth ?? 0,
          height: element?.clientHeight ?? 0,
          offsetTop: element?.offsetTop ?? 0,
        });
      });
    });

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [element]);

  return size;
}
