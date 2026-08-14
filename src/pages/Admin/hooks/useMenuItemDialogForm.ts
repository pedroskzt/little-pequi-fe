import {zodResolver} from "@hookform/resolvers/zod";
import {SetStateAction} from "react";
import {Dispatch} from "react";
import {useEffect, useState} from "react";
import {UseFormHandleSubmit} from "react-hook-form";
import {Control} from "react-hook-form";
import {useForm} from "react-hook-form";

import apiClient from "../../../http";
import IAction from "../../../interfaces/IAction.ts";
import IAlert from "../../../interfaces/IAlert.ts";
import ICategory from "../../../interfaces/ICategory.ts";
import IMenuItem from "../../../interfaces/IMenuItem.ts";

import ITag from "../../../interfaces/ITag.ts";
import {menuItemSchema, menuItemDefaultValues, MenuItemSchema} from "../types/DialogFormSchemas.ts";


interface IUseMenuItemDialogFormProps {
    toEdit: MenuItemSchema | undefined;
    onSuccess: (action: IAction, response: IMenuItem[]) => void;
    setAlertState: Dispatch<SetStateAction<IAlert>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface IUseMenuItemDialogFormReturn {
    // Form controls
    control: Control<MenuItemSchema>;
    handleSubmit: UseFormHandleSubmit<MenuItemSchema>;

    // Data state
    tags: ITag[];
    categories: ICategory[];
    imageUrl: string | null;

    // Handlers
    onSubmit: (data: MenuItemSchema) => void;
    onError: (errors: unknown) => void;
    setImageUrl: (url: string | null) => void;
}

const useMenuItemDialogForm = (props: IUseMenuItemDialogFormProps): IUseMenuItemDialogFormReturn => {
    // Props
    const {toEdit, onSuccess, setAlertState, setIsLoading} = props;

    // Form setup
    const {control, handleSubmit, reset} = useForm<MenuItemSchema>({
        mode: "onSubmit", resolver: zodResolver(menuItemSchema), defaultValues: menuItemDefaultValues,
    });

    // State management
    const [tags, setTags] = useState<ITag[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // Internal state for handling async operations
    const [uploadImage, setUploadImage] = useState<{ file: File, itemId: number } | false>(false);
    const [pendingResponse, setPendingResponse] = useState<IMenuItem | null>(null);

    const onSubmit = (data: MenuItemSchema) => {
        const payload = {
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            tags: tags
                .filter((tag) => data.tags
                    .map(selectedTag => selectedTag.value)
                    .includes(tag.slug))
                .map(tag => tag.id),
            category: categories
                .filter((category) => category.slug === data.category.value)[0].id,
            featured: data.featured,
            delivery: data.delivery,
        };
        const image = data.image;
        setIsLoading(true);

        const apiCall = toEdit ? apiClient.put(`/api/v1/menu-item/${toEdit.id}`, payload) : apiClient.post('/api/v1/menu-item', payload);

        apiCall
            .then(response => {
                const itemId = toEdit ? toEdit.id as number : response.data.id;

                if (image && image instanceof File) {
                    setUploadImage({file: image, itemId});
                } else {
                    // No image upload needed, complete the operation
                    setAlertState({
                        open: true,
                        message: `Menu Item ${toEdit ? 'updated' : 'created'} successfully!`,
                        severity: 'success'
                    });
                    onSuccess({type: toEdit ? 'update' : 'create'}, [response.data]);
                }
                setPendingResponse(response.data);
            })
            .catch(error => {
                console.error('Menu item operation failed:', error);
                setAlertState({
                    open: true,
                    message: `Menu Item ${toEdit ? 'update' : 'create'} failed!`,
                    severity: 'error'
                });
            });
    };

    const onError = (errors: unknown) => {
        console.log("Validation errors:", errors);
    };

    // Effects
    // Handle image upload after menu item create/update
    useEffect(() => {
        if (uploadImage && pendingResponse) {
            const imageFormData = new FormData();
            imageFormData.append('image', uploadImage.file, uploadImage.file.name);
            apiClient.post(`/api/v1/menu-item/${uploadImage.itemId}/image`, imageFormData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then(response => {
                    const updatedData = {...pendingResponse};
                    updatedData.image = response.data.image;

                    setAlertState({
                        open: true,
                        message: `Menu Item ${toEdit ? 'updated' : 'created'} successfully!`,
                        severity: 'success'
                    });
                    onSuccess({type: toEdit ? 'update' : 'create'}, [updatedData]);
                    setUploadImage(false);
                    setPendingResponse(null);
                })
                .catch(error => {
                    console.error('Image upload failed:', error);
                    setUploadImage(false);
                    setAlertState({
                        open: true,
                        message: `Menu Item ${toEdit ? 'update' : 'create'} failed!`,
                        severity: 'error'
                    });
                });
        }
    }, [uploadImage, pendingResponse, toEdit, onSuccess, setAlertState, setIsLoading]);

    // Populate form when editing
    useEffect(() => {
        if (toEdit) {
            reset(toEdit);
        } else {
            // Clean up when switching to create mode
            reset(menuItemDefaultValues);
        }
    }, [toEdit, reset]);

    // Fetch categories and tags on mount
    useEffect(() => {
        apiClient.get<ITag[]>('/api/v1/tag')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch tags:', error);
            });

        apiClient.get<ICategory[]>('/api/v1/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch categories:', error);
            });

    }, []);

    // Cleanup effect for image URLs
    useEffect(() => {
        return () => {
            if (imageUrl && imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    return {
        // Form controls
        control, handleSubmit,

        // Data state
        categories, tags, imageUrl,

        // Handlers
        onSubmit, onError, setImageUrl,
    };
};

export default useMenuItemDialogForm;