import {GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import {useEffect} from "react";
import LpBackdrop from "../../components/LpBackdrop/LpBackdrop.tsx";
import apiClient from "../../http";
import IAction from "../../interfaces/IAction.ts";
import ITag from "../../interfaces/ITag.ts";
import CrudAdminBase from "./components/CrudAdminBase.tsx";
import DataGridFormFrame from "./components/DataGridFormFrame.tsx";
import FormDialogTag from "./components/formDialogs/FormDialogTag.tsx";
import LpDeleteDialog from "./components/LpDeleteDialog.tsx";
import {useCrudAdminContext} from "./context/CrudAdminContext.ts";
import {TagSchema} from "./types/DialogFormSchemas.ts";
import {TDialogFormData} from "./types/TDialogData.ts";


const TagCrud = () => {
    const [tags, setTags] = useState<ITag[]>([]);
    const [toEdit, setToEdit] = useState<TagSchema | undefined>();


    const {
        alertState,
        isLoading,
        setOpenForm,
        setOpenDeleteDialog,
        setIsLoading,
        handleCloseAlert,
    } = useCrudAdminContext();

    // Get tags
    useEffect(() => {
        setIsLoading(true);
        apiClient.get<ITag[]>('/api/v1/tag')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.log(error);
                // TODO: Show error message
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [setIsLoading,])


    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'title', headerName: 'Title', flex: 1, headerAlign: 'left', align: 'left',
        },
    ]

    const handleCloseForm = () => {
        setToEdit(undefined);
        setOpenForm(false);
        setIsLoading(false);
        setOpenDeleteDialog(null);
    }

    const handleEditClick = (id: number | string) => {
        const tag = tags.find(tag => tag.id === id)
        if (tag) {
            setToEdit(tag as TagSchema)
            setOpenForm(true);
        }
    };

    const updateDataList = (action: IAction, response?: TDialogFormData[],) => {
        const newTag = response as ITag[];
        switch (action.type.toUpperCase()) {
            case 'CREATE':
                if (newTag && newTag.length === 1) {
                    setTags([...tags, newTag[0]]);
                }
                break;
            case 'UPDATE': {
                if (newTag && newTag.length === 1) {
                    const filteredTags = tags.filter(tag => tag.id !== newTag[0].id);
                    setTags([...filteredTags, newTag[0]]);
                }
                break;
            }
            case 'DELETE': {
                if (action.id) {
                    const filteredTags = tags.filter(tag => tag.id !== action.id);
                    setTags(filteredTags);
                }
                break;
            }
            default:
                throw new Error('Invalid action type');

        }
        handleCloseForm();
    }

    return (
        <>
            <CrudAdminBase label={"Tags"} rows={tags as ITag[]} columns={columns} reorder={false}
                           handleEditClick={handleEditClick}>
                <DataGridFormFrame label={"Tag"} formId={"tag-form"}
                                   toEdit={toEdit ? toEdit.title : toEdit}
                                   handleClose={handleCloseForm}>

                    <FormDialogTag formId={"tag-form"} handleResponse={updateDataList} toEdit={toEdit}/>
                </DataGridFormFrame>
                <LpDeleteDialog label={"Tag"} apiUrl={'/api/v1/tag'}
                                updateDataList={updateDataList}/>
                <LpBackdrop isLoading={isLoading} alertState={alertState} closeAlert={handleCloseAlert}/>
            </CrudAdminBase>
        </>
    )
}

export default TagCrud;