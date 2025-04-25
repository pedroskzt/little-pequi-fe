import {Meta, StoryObj} from "@storybook/react";
import {createElement} from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import example from "./assets/example.jpg"

const meta = {
    title: "Components/LpCard",
    component: LpCard
} satisfies Meta<typeof LpCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        cardProps: {
            title: "Title",
            image: example,
            imageAlt: "Image Alt",
            description: "Description",
            link: "https://example.com",
            linkText: "Link Text"
        },
        children: createElement('h1', null, 'Children Element')

    }
};
