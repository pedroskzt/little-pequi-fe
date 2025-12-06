import IMenuItem from "./IMenuItem.ts";

interface ICategory {
    id: number;
    title: string;
    slug: string;
    menu_items: IMenuItem[];
    display_order: number;
}

export default ICategory;