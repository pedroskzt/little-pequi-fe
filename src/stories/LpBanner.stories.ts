import type { Meta, StoryObj } from '@storybook/react';

import LpBanner from '../components/LpBanner/LpBanner.tsx';

const meta: Meta<typeof LpBanner> = {
    title: "Components/LpBanner",
    component: LpBanner,
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {}
};