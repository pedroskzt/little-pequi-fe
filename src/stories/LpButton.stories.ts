import {Meta, StoryObj} from "@storybook/react";
import LpButton from "../components/LpButton/LpButton.tsx";

const meta = {
  title: "Components/LpButton",
  component: LpButton
} satisfies Meta<typeof LpButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true
  }
};
