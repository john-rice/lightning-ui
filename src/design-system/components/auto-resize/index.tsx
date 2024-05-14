import { ReactNode, useEffect, useState } from "react";
import useResizeObserver from "../../../hooks/useResizeObserver";
import AnimateHeight, { AnimateHeightProps } from "react-animate-height";
import { Box } from "../";

export type LuiAnimateHeightProps = Omit<AnimateHeightProps, "height">;

// See https://github.com/Stanko/react-animate-height#props for more props
export type AutoResizeProps = {
  pace?: number; // in ms / pixel
  children: ReactNode;
} & LuiAnimateHeightProps;

export default function AutoResize({ duration, pace, children, ...animateHeightProps }: AutoResizeProps) {
  const [contentDiv, setContentDiv] = useState<HTMLDivElement | null>(null);
  const defaultPace = 2.5;

  const content = <Box ref={setContentDiv}>{children}</Box>;

  const [height, setHeight] = useState<number>(0);
  const [autoDuration, setAutoDuration] = useState<number>(0);
  const resizeObserver = useResizeObserver(contentDiv);

  // Whenever the resizeObserver notices that the content height changes,
  // store that height and use the prevHeight to calculate the time to spend animating the transition
  // Passing `duration` prop will always animate in a fixed time.
  // Else, passing `pace` prop will calculate the duration based on the pace.
  // Else, it will calculate the duration based on the default pace.
  useEffect(() => {
    setHeight(prevHeight => {
      const delta = Math.abs(resizeObserver?.height - prevHeight);
      setAutoDuration(delta * (pace ?? defaultPace));
      return resizeObserver?.height;
    });
  }, [pace, resizeObserver?.height]);

  return (
    <AnimateHeight {...animateHeightProps} height={height || "auto"} duration={duration ?? autoDuration}>
      {content}
    </AnimateHeight>
  );
}
