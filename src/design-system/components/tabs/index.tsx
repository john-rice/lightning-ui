import { MouseEventHandler, ReactNode, useEffect, useState } from "react";

import { TabContext } from "@mui/lab";
import { BoxProps, Tab as MuiTab, TabProps as MuiTabProps, Tabs as MuiTabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

import { Tooltip } from "..";
import { Box, Divider, SxProps, Theme } from "../";
import AnimateHeight, { AnimateHeightProps } from "react-animate-height";
import useResizeObserver from "../../../hooks/useResizeObserver";

type TabItemMetadata = {
  title: MuiTabProps["label"];
  icon?: MuiTabProps["icon"];
  disabled?: boolean;
  tooltip?: string;
};

type StaticTabItem = {
  content: ReactNode;
};

type NavigableTabItem = {
  path: string;
  content?: ReactNode;
};

export type TabItem = (StaticTabItem | NavigableTabItem) & TabItemMetadata;

export type LuiAnimateHeightProps = Omit<AnimateHeightProps, "height">;

export type TabsProps = {
  selectedTab?: number;
  tabItems: TabItem[];
  variant?: "text" | "outlined" | "grouped";
  /**
   * @default true
   */
  prerenderTabs?: boolean;
  divider?: boolean;
  sxTabs?: SxProps<Theme>;
  sxContent?: SxProps<Theme>;
  onTabChanged?: (tab: number) => void;
  animate?: boolean;
  animateHeightProps?: LuiAnimateHeightProps;
};

const Tabs = ({
  selectedTab: propSelectedTab,
  tabItems,
  variant,
  sxTabs,
  sxContent,
  onTabChanged,
  animate,
  animateHeightProps,
  prerenderTabs = true,
  divider = true,
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabItems.findIndex(tabItem => !tabItem.disabled));
  useEffect(() => {
    propSelectedTab && setSelectedTab(propSelectedTab);
  }, [propSelectedTab]);

  const navigate = useNavigate();
  const location = useLocation();

  const onTabChangeHandler = (event: any, value: number) => {
    onTabChanged?.(value);
    setSelectedTab(value);
  };

  const navigateHandler = (url: string, value: number): MouseEventHandler<HTMLButtonElement> => {
    return event => {
      event.preventDefault();
      onTabChangeHandler(event, value);
      navigate(url);
    };
  };

  const hasContent = tabItems.some(tabItem => typeof tabItem.content !== "undefined");
  const pathIndex = tabItems.findIndex(tabItem => "path" in tabItem && tabItem.path === location.pathname);
  const theme: any = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (pathIndex !== -1) {
      setSelectedTab(pathIndex);
      onTabChanged?.(pathIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we don't want to call this on onTabChanged change
  }, [pathIndex, location.pathname]);

  return (
    <TabContext value={selectedTab.toString()}>
      <MuiTabs
        value={selectedTab}
        onChange={onTabChangeHandler}
        variant={"scrollable"}
        sx={{
          ...sxTabs,
          "& .MuiTabs-indicator": { display: "none" },
        }}>
        {tabItems.map((tabItem, index) => {
          const tab = (
            // @ts-ignore
            <MuiTab
              key={index}
              icon={tabItem.icon}
              label={tabItem.title}
              variant={variant}
              disabled={tabItem.disabled}
              sx={{
                "display": "inline-flex",
                "flexDirection": "column",
                "justifyContent": "space-between",
                "alignItems": "center",
                "borderRadius": "8px !important",
                "padding": "8px 12px",
                "boxSizing": "border-box",
                "minHeight": "32px",
                "fontWeight": "400",
                "&.Mui-selected": {
                  background: (theme: any) => theme.palette.grey[10],
                  fontWeight: "600",
                  borderWidth: "0px !important",
                  boxShadow: variant === "outlined" ? "inset 0px 0px 0px 1px #792EE6" : "none",
                },
                "&:before": {
                  content: "'" + tabItem.title + "'",
                  fontWeight: "600",
                  height: "0px",
                  visibility: "hidden",
                  pointerEvents: "none",
                  overflow: "hidden",
                  userSelect: "none",
                },
                ...(variant === "grouped" && {
                  "fontSize": "12px",
                  "background": isDark ? "#262626" : "#f9fafb",
                  "position": "relative",
                  "zIndex": "1",
                  "margin": "0 -12px 0 0",
                  "padding": "4px 16px",
                  "height": "auto",
                  "minHeight": "0px",
                  "&.Mui-selected": {
                    zIndex: "9",
                    boxShadow: isDark ? "0 1px 1.5px 0.25px rgba(0,0,0,0.5)" : "0 1px 1.5px 0.5px rgba(0,0,0,0.175)",
                    background: isDark ? "#363636" : (`${theme.palette.common.white} !important` as any),
                    color: isDark
                      ? (`${theme.palette.common.white} !important` as any)
                      : (`${theme.palette.common.black} !important` as any),
                  },
                  "&:hover": {
                    color: isDark
                      ? (`${theme.palette.common.white} !important` as any)
                      : (`${theme.palette.common.black} !important` as any),
                  },
                  ...(isDark && {
                    color: "#828282",
                  }),
                }),
              }}
              onClick={"path" in tabItem ? navigateHandler(tabItem.path, index) : undefined}
            />
          );

          return tabItem.tooltip ? (
            <Tooltip key={index} title={tabItem.tooltip}>
              <Box>{tab}</Box>
            </Tooltip>
          ) : (
            tab
          );
        })}
      </MuiTabs>
      {divider && <Divider />}
      {hasContent && (
        <TabContent
          tabItems={tabItems}
          selectedTab={selectedTab}
          prerenderTabs={prerenderTabs}
          divider={divider}
          sxContent={sxContent}
          animate={animate}
          animateHeightProps={animateHeightProps}
        />
      )}
    </TabContext>
  );
};

const msPerPixel = 2.5;
function TabContent({
  tabItems,
  selectedTab,
  prerenderTabs,
  divider,
  sxContent,
  animate,
  animateHeightProps,
}: {
  tabItems: TabItem[];
  selectedTab: number;
  prerenderTabs: boolean;
  divider: boolean;
  sxContent?: SxProps<Theme>;
  animate?: boolean;
  animateHeightProps?: LuiAnimateHeightProps;
}) {
  const [contentDiv, setContentDiv] = useState<HTMLDivElement | null>(null);
  const content = (
    <Box ref={setContentDiv} paddingTop={divider ? 3 : 0} paddingBottom={1.5} sx={sxContent}>
      {tabItems.map((tabItem, index) => (
        <PrerenderableTabPanel
          sx={{ padding: 0, background: (theme: any) => theme.palette.background.default }}
          key={index}
          index={index}
          selectedIndex={selectedTab}
          prerender={prerenderTabs}>
          {tabItem.content}
        </PrerenderableTabPanel>
      ))}
    </Box>
  );

  const [height, setHeight] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const resizeObserver = useResizeObserver(contentDiv);

  useEffect(() => {
    setHeight(prevHeight => {
      const delta = Math.abs(resizeObserver?.height - prevHeight);
      setDuration(delta * msPerPixel);
      return resizeObserver?.height;
    });
  }, [resizeObserver?.height, selectedTab]);

  if (animate) {
    return (
      <AnimateHeight
        {...animateHeightProps}
        height={height || "auto"}
        duration={animateHeightProps?.duration || duration}>
        {content}
      </AnimateHeight>
    );
  }

  return content;
}

type PrerenderableTabPanelProps = {
  sx?: BoxProps["sx"];
  children: ReactNode;
  selectedIndex: number;
  index: number;
  prerender?: boolean;
};

export function PrerenderableTabPanel({ sx, children, selectedIndex, index, prerender }: PrerenderableTabPanelProps) {
  return (
    <Box
      data-testid={"prerenderable-tab-panel"}
      role={"tabpanel"}
      sx={{
        ...sx,
        ...(selectedIndex !== index
          ? { zIndex: -100500, opacity: 0, position: "absolute", minHeight: "50px", minWidth: "50px" }
          : undefined),
      }}>
      {prerender || selectedIndex === index ? children : null}
    </Box>
  );
}

export default Tabs;
