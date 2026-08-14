import {GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import {useEffect} from "react";
import LpBackdrop from "../../components/LpBackdrop/LpBackdrop.tsx";
import LpListReorderDialog from "../../components/LpList/LpListReorderDialog.tsx";
import {apiClient} from "../../http";
import IAction from "../../interfaces/IAction.ts";
import ICategory from "../../interfaces/ICategory.ts";
import CrudAdminBase from "./components/CrudAdminBase.tsx";
import DataGridFormFrame from "./components/DataGridFormFrame.tsx";
import FormDialogCategory from "./components/formDialogs/FormDialogCategory.tsx";
import LpDeleteDialog from "./components/LpDeleteDialog.tsx";
import {useCrudAdminContext} from "./context/CrudAdminContext.ts";
import {CategorySchema} from "./types/DialogFormSchemas.ts";
import {TDialogFormData} from "./types/TDialogData.ts";


const CategoryCrud = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [toEdit, setToEdit] = useState<CategorySchema | undefined>();

    const {
        alertState,
        isLoading,
        openReorderDialog,
        setOpenForm,
        setOpenReorderDialog,
        setOpenDeleteDialog,
        setAlertState,
        setIsLoading,
        handleCloseAlert,
    } = useCrudAdminContext();

    // Get tags
    useEffect(() => {
        setIsLoading(true);
        apiClient.get<ICategory[]>('/api/v1/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
                // TODO: Show error message
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [setIsLoading,])

    /*
     *  This function maps the categories to an array of IListItem objects.
     */
    const getItems = () => {
        //
        return categories.map(category => ({
                id: category.id,
                label: category.title,
                image: undefined
            })
        )
    };


    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'title', headerName: 'Title', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'display_order', headerName: 'Display Order', flex: 1, headerAlign: 'left', align: 'left',
        }
    ]

    const handleCloseForm = () => {
        setToEdit(undefined);
        setOpenForm(false);
        setIsLoading(false);
        setOpenReorderDialog({open: false, label: ''});
        setOpenDeleteDialog(null);
    }

    const handleEditClick = (id: number | string) => {
        const category = categories.find(category => category.id === id)
        if (category) {
            setToEdit(category as CategorySchema)
            setOpenForm(true);
        }
    };

    const updateDataList = (action: IAction, response?: TDialogFormData[],) => {
        const newCategory = response as ICategory[];
        switch (action.type.toUpperCase()) {
            case 'CREATE': {
                if (newCategory && newCategory.length === 1) {
                    setCategories([...categories, newCategory[0]]);
                }
                break;
            }
            case 'UPDATE': {
                if (newCategory && newCategory.length === 1) {
                    const filteredCategories = categories.filter(category => category.id !== newCategory[0].id);
                    setCategories([...filteredCategories, newCategory[0]]);
                }
                break;
            }
            case 'DELETE': {
                if (action.id) {
                    const display_order = categories.find(category => category.id === action.id)?.display_order || -1;
                    const filteredCategories = categories.filter(category => category.id !== action.id)
                    filteredCategories.forEach(category => {
                            if (display_order === -1) return;
                            if (category.display_order > display_order)
                                category.display_order--;
                        }
                    );
                    setCategories(filteredCategories);
                }
                break;
            }
            case 'REORDER': {
                if (newCategory) {
                    // Sort the updated list by display_order
                    newCategory.sort((a, b) => a.display_order - b.display_order)

                    // Update the state with the sorted items
                    setCategories(newCategory);
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
            <CrudAdminBase label={"Categories"} reorder={true} rows={categories as ICategory[]} columns={columns}
                           handleEditClick={handleEditClick}>
                <DataGridFormFrame label={"Category"} formId={"category-form"}
                                   toEdit={toEdit ? toEdit.title : toEdit}
                                   handleClose={handleCloseForm}>

                    <FormDialogCategory formId={"category-form"} handleResponse={updateDataList} toEdit={toEdit}/>
                </DataGridFormFrame>
                <LpListReorderDialog
                    key={`reorder-dialog-${openReorderDialog.label}`} // Add a unique key to clear its states when opening a new dialog
                    apiUrl={'/api/v1/category/bulk'}
                    items={getItems()}
                    openReorder={openReorderDialog}
                    setAlertState={setAlertState}
                    handleResponse={updateDataList}
                    handleClose={handleCloseForm}/>
                <LpDeleteDialog label={"Category"} apiUrl={'/api/v1/category'}
                                updateDataList={updateDataList}/>
                <LpBackdrop isLoading={isLoading} alertState={alertState} closeAlert={handleCloseAlert}/>
            </CrudAdminBase>
        </>
    )
}

export default CategoryCrud;