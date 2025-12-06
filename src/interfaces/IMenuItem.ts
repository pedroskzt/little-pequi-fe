import ICategory from "./ICategory.ts";
import ITag from "./ITag.ts";

interface IMenuItem {
    id: number | string;
    title: string;
    price: number;
    description: string;
    featured: boolean;
    delivery: boolean;
    image: File | string | null;
    tags: ITag[];
    category: ICategory;
}


export default IMenuItem;