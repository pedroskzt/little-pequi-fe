import * as z from 'zod';

const menuItemSchema = z.object({
    id: z.number().or(z.string()),
    title: z.string().min(1, {message: 'Enter the Menu Item title'}),
    price: z.preprocess(Number, z.number().min(1, {message: 'Enter the Menu Item price'})),
    description: z.string().min(1, {message: 'Enter the Menu Item description'}),
    tags: z.array(z.object({value: z.string(), label: z.string()})),
    category: z.object({value: z.string(), label: z.string()}, {message: 'Enter the Menu Item category'}),
    featured: z.boolean(),
    delivery: z.boolean(),
    image: z.file().mime(['image/png', 'image/jpeg', 'image/jpg']).nullable().or(z.string()),
});

const tagSchema = z.object({
    id: z.number().or(z.string()),
    title: z.string().min(1, {message: 'Enter the Tag title'}),
    slug: z.string().readonly(),
})

const categorySchema = z.object({
    id: z.number().or(z.string()),
    title: z.string().min(1, {message: 'Enter the Category title'}),
    slug: z.string().readonly(),
})

const menuItemDefaultValues = {
    id: '',
    title: '',
    price: 0,
    description: '',
    tags: [],
    category: {},
    featured: false,
    delivery: false,
    image: null,
}

const tagDefaultValues = {
    id: '',
    title: '',
    slug: '',
}

const categoryDefaultValues = {
    id: '',
    title: '',
    slug: '',
}


export {
    menuItemSchema,
    menuItemDefaultValues,
    tagSchema,
    tagDefaultValues,
    categorySchema,
    categoryDefaultValues,
};
export type MenuItemSchema = z.infer<typeof menuItemSchema>;
export type TagSchema = z.infer<typeof tagSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
