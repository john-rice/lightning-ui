import MuiTooltip, { TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";

import { Box, BoxProps } from "..";

export type TooltipProps = Omit<MuiTooltipProps, "disableInteractive" | "enterDelay" | "title"> & {
  title?: MuiTooltipProps["title"];
  width?: number | string;
  wrapperSx?: BoxProps["sx"];
  interactive?: boolean;
  delay?: number;
};

const Tooltip = ({
  title = "",
  children,
  placement = "top",
  width,
  wrapperSx,
  interactive = false,
  delay = 500,
  enterNextDelay = 400,
  ...otherTooltipProps
}: TooltipProps) => {
  return (
    <MuiTooltip
      title={title}
      placement={placement}
      disableInteractive={!interactive}
      enterDelay={delay}
      enterNextDelay={enterNextDelay}
      {...otherTooltipProps}>
      <Box component={"span"} sx={{ cursor: interactive ? "pointer" : "inherit", width, ...wrapperSx }}>
        {children}
      </Box>
    </MuiTooltip>
  );
};

export default Tooltip;
