import {Meta, StoryObj} from '@storybook/react';
import {LpHeader} from '../components/LpHeader/LpHeader.tsx';


const meta: Meta<typeof LpHeader> = {
    title: "Components/LpHeader",
    component: LpHeader,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {}
};