import type {Meta, StoryObj} from '@storybook/react';

import {LpFooter} from '../components/LpFooter/LpFooter.tsx';

const meta: Meta<typeof LpFooter> = {
    title: "Components/LpFooter",
    component: LpFooter,
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {}
};
