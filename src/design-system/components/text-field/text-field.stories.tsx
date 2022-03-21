import { ComponentMeta, ComponentStory } from "@storybook/react";
import TextField, { TextFieldProps } from "design-system/components/text-field";
import * as Icons from "design-system/icons";
import { SvgIcon } from "..";

export default {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/tLrz5T82EKYMnqgvnk1Ldo/UILibrary?node-id=34128%3A85206",
    },
  },
  argTypes: {
    label: {
      defaultValue: "Label",
      control: "text",
    },
    helperText: {
      defaultValue: "Helper Text",
      control: "text",
    },
    placeholder: {
      defaultValue: "Placeholder",
      control: "text",
    },
    icon: {
      options: [undefined, ...Object.keys(Icons)],
      defaultValue: undefined,
      control: "select",
    },
    status: {
      options: [undefined, "success", "warning", "error"],
      control: "select",
    },
    size: {
      defaultValue: "medium",
      options: ["medium", "small"],
      control: "select",
    },
    statusText: {
      defaultValue: "Status Text",
      control: "text",
    },
    fullWidth: {
      defaultValue: false,
      control: "boolean",
    },
    disabled: {
      defaultValue: false,
      control: "boolean",
    },
    type: {
      defaultValue: "text",
      options: ["text", "number", "password"],
      control: "select",
    },
    onChange: { action: "changed" },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = ({ icon, ...args }: TextFieldProps) => {
  // @ts-ignore
  const iconComponent = icon && <SvgIcon component={Icons[icon]} />;
  return <TextField {...args} icon={iconComponent} />;
};

export const Playground = Template.bind({});