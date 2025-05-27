import type {Meta, StoryObj} from '@storybook/react';

import LpNavBar from '../components/LpNavBar/LpNavBar.tsx';

const meta: Meta<typeof LpNavBar> = {
    title: "Components/LpNavBar",
    component: LpNavBar,
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {}
};