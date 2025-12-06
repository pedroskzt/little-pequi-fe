import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {DataGrid} from "@mui/x-data-grid";
import {GridColDef,} from '@mui/x-data-grid';
import {ReactNode} from "react";
import DataGridToolBar from "../../../components/LpDataGrid/DataGridToolBar.tsx";
import LpList from "../../../components/LpList/LpList.tsx";
import ListFormFrame from "../components/ListFormFrame.tsx";
import {useCrudAdminContext} from "../context/CrudAdminContext.ts";
import {TDialogFormData} from "../types/TDialogData.ts";

interface ICrudAdminBaseProps {
    children?: ReactNode;
    label: string;
    rows: TDialogFormData[];
    columns: GridColDef[];
    reorder: boolean;

    handleEditClick: (id: number | string) => void;
}

const CrudAdminBase = (props: ICrudAdminBaseProps) => {

    const {children, label, rows, columns, reorder, handleEditClick} = props;

    const {
        isLoading,
        setOpenForm,
        setOpenReorderDialog,
        setOpenDeleteDialog,
        setIsLoading
    } = useCrudAdminContext();

    const onEditClick = (id: number | string) => {
        setOpenForm(true);
        handleEditClick(id);
    }

    const handleOpenForm = (form: "inputForm" | "displayOrder") => {
        switch (form) {
            case "inputForm":
                setOpenForm(true);
                break;
            case "displayOrder":
                setOpenReorderDialog({open: true, label: 'Category'});
        }
    }

    const handleDeleteClick = (itemId: number | string, title: string) => () => {
        setOpenDeleteDialog({open: true, id: itemId, title: title})
        setIsLoading(true)
    };

    const columnsWithAction: GridColDef[] = [
        ...columns,
        {
            field: 'actions', type: 'actions', width: 80, flex: 1, getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon/>}
                    label="Edit"
                    onClick={() => onEditClick(params.row.id)}/>,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={handleDeleteClick(params.row.id, params.row.title)}/>

            ]
        }];

    const mediaQueryMedium = useMediaQuery('(min-width:900px)');
    return (
        <>
            {/*Use a list for small screens*/}
            {!mediaQueryMedium &&
                <ListFormFrame label={label} onClick={handleOpenForm} reorder={reorder}>
                    {rows.length ? (
                        <LpList listItems={rows.map(row => ({
                            id: row.id,
                            label: row.title,
                            image: 'image' in row ? row.image as string : undefined,
                        }))} handleEditClick={onEditClick} handleDeleteClick={handleDeleteClick}/>) : (
                        <Box sx={{padding: 2}}>
                            <Skeleton height={56}/>
                            <Skeleton height={56}/>
                            <Skeleton height={56}/>
                        </Box>)}
                </ListFormFrame>
            }
            {mediaQueryMedium && <DataGrid
                columns={columnsWithAction}
                rows={rows}
                slots={{
                    toolbar: () => DataGridToolBar({
                        gridTitle: label, addButtonToolTip: "Add new item", reorderButtonToolTip: "Change items order", onClick: handleOpenForm, showFilter: true
                    })
                }}
                showToolbar
                loading={isLoading}
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton', noRowsVariant: 'skeleton'
                    },
                }}/>
            }
            {children}

        </>)
}

export default CrudAdminBase;