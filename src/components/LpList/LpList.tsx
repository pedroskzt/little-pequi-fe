import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {Box} from "@mui/material";
import {ListProps} from "@mui/material";
import {ListItemAvatar} from "@mui/material";
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IListItem from "../../interfaces/IListItem.ts";

interface ILpListProps extends ListProps {
    listItems: IListItem[];
    handleEditClick: (id: number | string) => void;
    handleDeleteClick: (id: number | string, title: string) => () => void;
}

const LpList = (props: ILpListProps) => {

    const {listItems, handleEditClick, handleDeleteClick, ...renderProps} = props


    return (
        <>
            <List {...renderProps}>
                {listItems && listItems.map(listItem => (
                    <Box key={`menu-item-${listItem.id}`}>
                        <ListItem
                            disablePadding
                            alignItems={"flex-start"}
                            secondaryAction={
                                <>
                                    <IconButton
                                        edge={"end"}
                                        aria-label={"edit item"}
                                        onClick={()=>handleEditClick(listItem.id)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        edge={"end"}
                                        aria-label={"delete item"}
                                        onClick={handleDeleteClick(listItem.id, listItem.label)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </>
                            }>
                            <ListItemButton onClick={()=>handleEditClick(listItem.id)}>
                                <ListItemAvatar>
                                    <Avatar alt={listItem.label} src={listItem.image}/>
                                </ListItemAvatar>
                                <ListItemText primary={listItem.label}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="fullWidth" component="li"/>
                    </Box>
                ))}
            </List>
        </>
    )
}

export default LpList;


