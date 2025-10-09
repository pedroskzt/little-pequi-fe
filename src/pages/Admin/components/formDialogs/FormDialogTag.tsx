import Box from "@mui/material/Box";
import LpTextField from "../../../../components/LpTextField/LpTextField.tsx";
import IAction from "../../../../interfaces/IAction.ts";
import {useCrudAdminContext} from "../../context/CrudAdminContext.ts";
import useTagDialogForm from "../../hooks/useTagDialogForm.ts";
import {TagSchema} from "../../types/DialogFormSchemas.ts";
import {TDialogFormData} from "../../types/TDialogData.ts";

interface IFormDialogTagProps {
    formId: string;
    handleResponse: (action:IAction, response: TDialogFormData[]) => void;
    toEdit: TagSchema | undefined;
}


const FormDialogTag = (props: IFormDialogTagProps) => {
    const {formId, handleResponse, toEdit} = props;
    const {setAlertState, setIsLoading} = useCrudAdminContext();

    const {
        control,
        handleSubmit,
        onSubmit,
        onError,
    } = useTagDialogForm({
        toEdit,
        onSuccess: handleResponse,
        setAlertState,
        setIsLoading,
    });

    return (<>
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', width: '100%', gap: 2, paddingX: 3
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit, onError)}
            id={formId}>
            <LpTextField<TagSchema> label={"ID"} name={"id"} control={control}
                                            defaultValue={""} sx={{display: 'none'}}/>
            <LpTextField<TagSchema> label={"Title"} name={"title"} control={control}
                                            defaultValue={""} autoFocus/>
        </Box>
    </>);
}

export default FormDialogTag;