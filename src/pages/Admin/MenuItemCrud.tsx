import Avatar from "@mui/material/Avatar";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import {useEffect} from "react";
import LpBackdrop from "../../components/LpBackdrop/LpBackdrop.tsx";
import GridCellExpand from "../../components/LpDataGrid/GridCellExpand.tsx";
import {apiClient} from "../../http";
import IAction from "../../interfaces/IAction.ts";
import IMenuItem from "../../interfaces/IMenuItem.ts";
import ITag from "../../interfaces/ITag.ts";
import CrudAdminBase from "./components/CrudAdminBase.tsx";
import DataGridFormFrame from "./components/DataGridFormFrame.tsx";
import FormDialogMenuItem from "./components/formDialogs/FormDialogMenuItem.tsx";
import LpDeleteDialog from "./components/LpDeleteDialog.tsx";
import {useCrudAdminContext} from "./context/CrudAdminContext.ts";
import {MenuItemSchema} from "./types/DialogFormSchemas.ts";
import {TDialogFormData} from "./types/TDialogData.ts";

const MenuItemCrud = () => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const [toEdit, setToEdit] = useState<MenuItemSchema | undefined>();

    const {
        alertState,
        isLoading,
        setOpenForm,
        setOpenDeleteDialog,
        setIsLoading,
        handleCloseAlert
    } = useCrudAdminContext();

    // Get menu items
    useEffect(() => {
        setIsLoading(true);
        apiClient.get<IMenuItem[]>('/api/v1/menu-item')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.log(error);
                // TODO: Show error message
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [setIsLoading,])

    const renderCellExpand = (params: GridRenderCellParams) => {
        return (<GridCellExpand values={params.value.map((value: ITag) => value.title) || ''}
                                width={params.colDef.computedWidth}/>);
    }

    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'image',
            renderCell: (params: GridRenderCellParams) => (<Avatar alt={"test"} src={params.value}/>),
            headerName: 'Image',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'title', headerName: 'Title', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'price', headerName: 'Price', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'description', headerName: 'Description', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'featured', headerName: 'Featured', type: 'boolean', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'delivery', headerName: 'For Delivery', type: 'boolean', flex: 1, headerAlign: 'left', align: 'left',
        },
        {
            field: 'category',
            headerName: 'Category',
            renderCell: (params: GridRenderCellParams) => params.value.title,
            flex: 1,
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'tags',
            renderCell: renderCellExpand,
            headerName: 'Tags',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
        },
    ]

    const handleCloseForm = () => {
        setToEdit(undefined);
        setOpenForm(false);
        setIsLoading(false);
        setOpenDeleteDialog(null);
    }

    const handleEditClick = (id: number | string) => {
        const menuItem = menuItems.find(menuItem => menuItem.id === id)
        if (menuItem) {
            const {tags, category, ...partialMenuItem} = menuItem;
            const mappedMenuItem: MenuItemSchema = {
                ...partialMenuItem,
                tags: tags?.map(tag => ({value: tag.slug, label: tag.title})) || [],
                category: {value: category.slug, label: category.title},

            };
            setToEdit(mappedMenuItem)
            setOpenForm(true);
        }
    };

    const updateDataList = (action: IAction, response?: TDialogFormData[],) => {
        const newMenuItem = response as IMenuItem[];
        switch (action.type.toUpperCase()) {
            case 'CREATE':
                if (newMenuItem && newMenuItem.length === 1) {
                    setMenuItems([...menuItems, newMenuItem[0]]);
                }
                break;
            case 'UPDATE': {
                if (newMenuItem && newMenuItem.length === 1) {
                    const filteredMenuItems = menuItems.filter(menuItems => menuItems.id !== newMenuItem[0].id);
                    setMenuItems([...filteredMenuItems, newMenuItem[0]]);
                }
                break;
            }
            case 'DELETE': {
                if (action.id) {
                    const filteredMenuItems = menuItems.filter(menuItems => menuItems.id !== action.id);
                    setMenuItems(filteredMenuItems);
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
            <CrudAdminBase label={"Menu Item"} rows={menuItems as IMenuItem[]} columns={columns} reorder={false}
                           handleEditClick={handleEditClick}>
                <DataGridFormFrame label={"Menu Item"} formId={"menu-item-form"}
                                   toEdit={toEdit ? toEdit.title : toEdit}
                                   handleClose={handleCloseForm}>

                    <FormDialogMenuItem formId={"menu-item-form"} handleResponse={updateDataList} toEdit={toEdit}/>
                </DataGridFormFrame>
                <LpDeleteDialog label={"Menu Item"} apiUrl={'/api/v1/menu-item'}
                                updateDataList={updateDataList}/>
                <LpBackdrop isLoading={isLoading} alertState={alertState} closeAlert={handleCloseAlert}/>
            </CrudAdminBase>
        </>
    )
}

export default MenuItemCrud;