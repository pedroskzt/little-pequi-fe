import {zodResolver} from "@hookform/resolvers/zod";
import {SetStateAction} from "react";
import {Dispatch} from "react";
import {useEffect} from "react";
import {UseFormHandleSubmit} from "react-hook-form";
import {Control} from "react-hook-form";
import {useForm} from "react-hook-form";

import apiClient from "../../../http";
import IAction from "../../../interfaces/IAction.ts";
import IAlert from "../../../interfaces/IAlert.ts";
import ICategory from "../../../interfaces/ICategory.ts";
import {CategorySchema} from "../types/DialogFormSchemas.ts";
import {categoryDefaultValues} from "../types/DialogFormSchemas.ts";
import {categorySchema} from "../types/DialogFormSchemas.ts";


interface IUseCategoryDialogFormProps {
    toEdit: CategorySchema | undefined;
    onSuccess: (action: IAction, response: ICategory[]) => void;
    setAlertState: Dispatch<SetStateAction<IAlert>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface IUseCategoryDialogFormReturn {
    // Form controls
    control: Control<CategorySchema>;
    handleSubmit: UseFormHandleSubmit<CategorySchema>;

    // Handlers
    onSubmit: (data: CategorySchema) => void;
    onError: (errors: unknown) => void;
}

const useCategoryDialogForm = (props: IUseCategoryDialogFormProps): IUseCategoryDialogFormReturn => {

    // Props
    const {toEdit, onSuccess, setAlertState, setIsLoading} = props;

    // Form setup
    const {control, handleSubmit, reset} = useForm<CategorySchema>({
        mode: "onSubmit", resolver: zodResolver(categorySchema), defaultValues: categoryDefaultValues,
    });

    const onSubmit = (data: CategorySchema) => {
        const payload = {
            id: data.id,
            title: data.title,
        };
        setIsLoading(true);

        const apiCall = toEdit ? apiClient.put(`/api/v1/category/${toEdit.id}`, payload) : apiClient.post('/api/v1/category', payload);

        apiCall
            .then(response => {
                setAlertState({
                    open: true,
                    message: `Category ${toEdit ? 'updated' : 'created'} successfully!`,
                    severity: 'success'
                });
                onSuccess({type: toEdit ? 'update' : 'create'}, [response.data]);
            })
            .catch(error => {
                console.error('Category operation failed:', error);
                setAlertState({
                    open: true,
                    message: `Category ${toEdit ? 'update' : 'create'} failed!`,
                    severity: 'error'
                });
            });
    };

    const onError = (errors: unknown) => {
        console.log("Validation errors:", errors);
    };

    // Effects
    // Populate form when editing
    useEffect(() => {
        if (toEdit) {
            reset(toEdit);
        } else {
            // Clean up when switching to create mode
            reset(categoryDefaultValues);
        }
    }, [toEdit, reset]);

    return {
        // Form controls
        control, handleSubmit,

        // Handlers
        onSubmit, onError,
    };
};

export default useCategoryDialogForm;