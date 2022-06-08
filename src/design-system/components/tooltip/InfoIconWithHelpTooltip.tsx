import React from "react";
import { InfoRounded } from "@mui/icons-material";

import HelpMessage, { HelpMessageProps } from "./HelpMessage";

export type InfoIconWithHelpTooltipProps = {
  message: HelpMessageProps["title"];
};

export default function InfoIconWithHelpTooltip({ message }: InfoIconWithHelpTooltipProps) {
  return (
    <HelpMessage title={message} placement={"top"}>
      <InfoRounded sx={{ fontSize: "15px", color: (theme: any) => theme.palette.grey[70] }} />
    </HelpMessage>
  );
}