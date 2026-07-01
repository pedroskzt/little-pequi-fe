import {zodResolver} from "@hookform/resolvers/zod";
import {SetStateAction} from "react";
import {Dispatch} from "react";
import {useEffect} from "react";
import {UseFormHandleSubmit} from "react-hook-form";
import {Control} from "react-hook-form";
import {useForm} from "react-hook-form";

import {apiClient} from "../../../http";
import IAction from "../../../interfaces/IAction.ts";
import IAlert from "../../../interfaces/IAlert.ts";
import ITag from "../../../interfaces/ITag.ts";
import {TagSchema} from "../types/DialogFormSchemas.ts";
import {tagDefaultValues} from "../types/DialogFormSchemas.ts";
import {tagSchema} from "../types/DialogFormSchemas.ts";


interface IUseTagDialogFormProps {
    toEdit: TagSchema | undefined;
    onSuccess: (action: IAction, response: ITag[]) => void;
    setAlertState: Dispatch<SetStateAction<IAlert>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface IUseTagDialogFormReturn {
    // Form controls
    control: Control<TagSchema>;
    handleSubmit: UseFormHandleSubmit<TagSchema>;

    // Handlers
    onSubmit: (data: TagSchema) => void;
    onError: (errors: unknown) => void;
}

const useTagDialogForm = (props: IUseTagDialogFormProps): IUseTagDialogFormReturn => {

    // Props
    const {toEdit, onSuccess, setAlertState, setIsLoading} = props;

    // Form setup
    const {control, handleSubmit, reset} = useForm<TagSchema>({
        mode: "onSubmit", resolver: zodResolver(tagSchema), defaultValues: tagDefaultValues,
    });

    const onSubmit = (data: TagSchema) => {
        const payload = {
            id: data.id,
            title: data.title,
        };
        setIsLoading(true);

        const apiCall = toEdit ? apiClient.put(`/api/v1/tag/${toEdit.id}`, payload) : apiClient.post('/api/v1/tag', payload);

        apiCall
            .then(response => {
                setAlertState({
                    open: true,
                    message: `Tag ${toEdit ? 'updated' : 'created'} successfully!`,
                    severity: 'success'
                });
                onSuccess({type: toEdit ? 'update' : 'create'}, [response.data]);
            })
            .catch(error => {
                console.error('Tag operation failed:', error);
                setAlertState({
                    open: true,
                    message: `Tag ${toEdit ? 'update' : 'create'} failed!`,
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
            reset(tagDefaultValues);
        }
    }, [toEdit, reset]);

    return {
        // Form controls
        control, handleSubmit,

        // Handlers
        onSubmit, onError,
    };
};

export default useTagDialogForm;