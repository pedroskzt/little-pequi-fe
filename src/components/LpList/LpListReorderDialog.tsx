import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {useReducer} from "react";
import {MouseEvent, SetStateAction} from "react";
import {Dispatch} from "react";
import {useState} from "react";
import apiClient from "../../http";
import IAction from "../../interfaces/IAction.ts";
import IAlert from "../../interfaces/IAlert.ts";
import IListItem from "../../interfaces/IListItem.ts";
import {TDialogFormData} from "../../pages/Admin/types/TDialogData.ts";
import LpButton from "../LpButton/LpButton.tsx";
import LpListDraggable from "./LpListDraggable.tsx";

interface ILpReorderFormProps {
    apiUrl: string;
    items: IListItem[];
    openReorder: { open: boolean, label: string };
    setAlertState: Dispatch<SetStateAction<IAlert>>;
    handleResponse: (action: IAction, response: TDialogFormData[]) => void;
    handleClose: () => void;
}

type ReorderAction =
    | { type: 'INITIALIZE'; payload: IListItem[] }
    | { type: 'MOVE_UP'; payload: string | number }
    | { type: 'MOVE_DOWN'; payload: string | number }
    | { type: 'MOVE_TO_TOP'; payload: string | number }
    | { type: 'MOVE_TO_BOTTOM'; payload: string | number }
    | { type: 'REORDER'; payload: IListItem[] };

const reorderReducer = (state: IListItem[], action: ReorderAction): IListItem[] => {

    const moveItem = (fromIndex: number, toIndex: number) => {
        const newItems = [...state];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        return newItems;
    };

    switch (action.type) {
        case "INITIALIZE":
            return action.payload;

        case "MOVE_UP": {
            const index = state.findIndex(item => item.id === action.payload);
            if (index > 0) {
                return moveItem(index, index - 1);
            }
            return state;

        }
        case "MOVE_DOWN": {
            const index = state.findIndex(item => item.id === action.payload);
            if (index < state.length - 1) {
                return moveItem(index, index + 1);
            }
            return state;
        }

        case "MOVE_TO_TOP": {
            const index = state.findIndex(item => item.id === action.payload);
            if (index > 0) {
                return moveItem(index, 0);
            }
            return state;
        }
        case "MOVE_TO_BOTTOM": {
            const index = state.findIndex(item => item.id === action.payload);
            if (index < state.length - 1) {
                return moveItem(index, state.length - 1);
            }
            return state;
        }
        case "REORDER": {
            return action.payload;
        }

        default:
            return state;
    }
}


const LpListReorderDialog = (props: ILpReorderFormProps) => {
    const {apiUrl, items, openReorder, setAlertState, handleResponse, handleClose} = props;
    const [localItems, dispatch] = useReducer(reorderReducer, []);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
    const [isTop, setIsTop] = useState<boolean>(false);
    const [isBottom, setIsBottom] = useState<boolean>(false);

    // Initialize localItems with items if they are empty
    useEffect(() => {
        if (items.length > 0) {
            dispatch({type: "INITIALIZE", payload: items})
        }
    }, [items]);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, itemId: string | number) => {
        const index = localItems.findIndex(item => item.id === itemId);
        if (index === 0) setIsTop(true);
        if (index === localItems.length - 1) setIsBottom(true);
        setAnchorEl(event.currentTarget);
        setSelectedItemId(itemId);

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItemId(null);
        setIsTop(false);
        setIsBottom(false);
    };

    const handleMoveUp = () => {
        if (selectedItemId !== null){
            dispatch({type: "MOVE_UP", payload: selectedItemId})
        }
        handleMenuClose();
    };

    const handleMoveDown = () => {
        if (selectedItemId !== null){
            dispatch({type: "MOVE_DOWN", payload: selectedItemId})
        }
        handleMenuClose();
    };

    const handleMoveToTop = () => {
        if (selectedItemId !== null){
            dispatch({type: "MOVE_TO_TOP", payload: selectedItemId})
        }
        handleMenuClose();
    };

    const handleMoveToBottom = () => {
        if (selectedItemId !== null){
            dispatch({type: "MOVE_TO_BOTTOM", payload: selectedItemId})
        }
        handleMenuClose();
    };

    const handleRender = (item: IListItem, display_order: number) => {
        display_order += 1
        return (
            <>
                <Stack direction={"row"} spacing={2}
                       sx={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
                    <Box>
                        <Typography>
                            {display_order < 9 ? `0${display_order}` : `${display_order}`}
                        </Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem/>

                    <Box display={'flex'} flexDirection={'row'}
                         sx={{justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                        <Typography fontWeight={'bold'}>
                            {item.label}
                        </Typography>

                        <IconButton
                            aria-label={`reorder-menu-${item.label}`}
                            id={`reorder-menu-${item.id}`}
                            onClick={(e) => handleMenuOpen(e, item.id)}>
                            <MoreVertIcon fontSize="small"/>
                        </IconButton>
                    </Box>
                </Stack>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedItemId === item.id}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <MenuItem onClick={handleMoveToTop} disabled={isTop}>
                        <ListItemIcon>
                            <KeyboardDoubleArrowUpIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Move to top</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMoveUp} disabled={isTop}>
                        <ListItemIcon>
                            <KeyboardArrowUpIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Move up</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMoveDown} disabled={isBottom}>
                        <ListItemIcon>
                            <KeyboardArrowDownIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Move down</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMoveToBottom} disabled={isBottom}>
                        <ListItemIcon>
                            <KeyboardDoubleArrowDownIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Move to bottom</ListItemText>
                    </MenuItem>
                </Menu>
            </>
        )
    }

    /*
     *  This function handles the reordering of categories.
     *  It takes an array of IListItem objects representing the new display order.
     *  It updates the display_order property of each category in the state.
     *  It then sends a POST request to the backend to update the display order.
     */
    const handleSave = (reorderedItems: IListItem[]) => {

        const payload = reorderedItems.map((item) => ({
            id: item.id,
            display_order: reorderedItems.findIndex((rItem) => rItem.id === item.id)
        }))

        console.log(payload)
        // Send the updated display order to the backend
        apiClient.patch(`${apiUrl}`, payload)
            .then(response => {
                setAlertState({
                    open: true,
                    message: `Display order updated successfully!`,
                    severity: 'success'
                });
                // setOpenReorderDialog({open: false, label: ''});
                handleResponse({type: "REORDER"}, response.data)
            })
            .catch(error => {
                console.log(error.response.data)
                const response_data = error.response.data;

                setAlertState({
                    open: true,
                    message: `${response_data.error}`,
                    severity: 'error'
                });
            })
    };
    console.log("test")
    return (
        <>
            <Dialog
                open={openReorder.open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            minWidth: '20rem'
                        }
                    }
                }}>
                <DialogTitle sx={{px: 1}}>Reorder {openReorder.label}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}>
                    <CloseIcon/>
                </IconButton>
                <DialogContent sx={{
                    paddingTop: 0,
                    paddingBottom: 1,
                    paddingX: 1
                }}>

                    <Box flexDirection={'column'}
                         alignItems={'flex-end'}>
                        <Typography variant={'h4'}>Menu Items</Typography>
                        <Typography variant={'subtitle2'}>Drag and Drop or use the menu to reorder</Typography>
                        {items.length ? (
                            <LpListDraggable<IListItem>
                                items={localItems}
                                onReorder={(reorderedItems) => dispatch({type: "REORDER", payload: reorderedItems})}
                                renderItem={handleRender}/>) : (
                            <Box sx={{padding: 2}}>
                                <Skeleton height={56}/>
                                <Skeleton height={56}/>
                                <Skeleton height={56}/>
                            </Box>
                        )}
                    </Box>
                    <DialogActions sx={{paddingTop: 4, justifyContent: 'center'}}>
                        <LpButton onClick={handleClose} autoFocus>Cancel</LpButton>
                        <LpButton type="submit" onClick={() => handleSave(localItems)}>Save</LpButton>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default LpListReorderDialog;