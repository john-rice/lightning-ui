import { Box, Stack } from "../../design-system/components";
import { CircleOutlined, Circle } from "../../design-system/icons";

export enum StatusEnum {
  NOT_YET_RUN = "Not yet run",
  UNSPECIFIED = "Unspecified",
  BUILDING = "Building",
  REQUESTING = "Requesting",
  PENDING = "Pending",
  BLOCKING = "Blocking",
  STARTING = "Starting",
  RESTARTING = "Restarting",
  RUNNING = "Running",
  STOPPING = "Stopping",
  STOPPED = "Stopped",
  DELETED = "Deleted",
  SUCCEEDED = "Succeeded",
  FAILED = "Failed",
}

const StatusColor: Record<StatusEnum, string> = {
  [StatusEnum.NOT_YET_RUN]: "#B3B9BB",
  [StatusEnum.UNSPECIFIED]: "#B3B9BB",
  [StatusEnum.BUILDING]: "#792EE5",
  [StatusEnum.REQUESTING]: "#792EE5",
  [StatusEnum.PENDING]: "#FCBE2E",
  [StatusEnum.BLOCKING]: "#FCBE2E",
  [StatusEnum.STARTING]: "#792EE5",
  [StatusEnum.RESTARTING]: "#792EE5",
  [StatusEnum.RUNNING]: "#19A004",
  [StatusEnum.STOPPING]: "#65676B",
  [StatusEnum.STOPPED]: "#65676B",
  [StatusEnum.DELETED]: "#FCBE2E",
  [StatusEnum.SUCCEEDED]: "#19A004",
  [StatusEnum.FAILED]: "#E02C2D",
};

export type StatusProps = {
  status: StatusEnum;
};

const Status = (props: StatusProps) => {
  const iconStyle = { fontSize: "14px", color: StatusColor[props.status] };
  const statusIcon =
    props.status === StatusEnum.NOT_YET_RUN ? <CircleOutlined sx={iconStyle} /> : <Circle sx={iconStyle} />;
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      {statusIcon} <Box>{props.status.toString()}</Box>
    </Stack>
  );
};

export default Status;