import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {ToolbarButton} from "@mui/x-data-grid";
import {Toolbar} from "@mui/x-data-grid";
import LpButton from "../LpButton/LpButton.tsx";
import DataGridQuickFilter from "./DataGridQuickFilter.tsx";

interface IDataGridToolBarProps {
    gridTitle: string;
    showFilter?: boolean;
    reorder?: boolean;
    onClick?: (form: "inputForm" | "displayOrder") => void;
    addButtonToolTip?: string;
    reorderButtonToolTip?: string;
}


const DataGridToolBar = (props: IDataGridToolBarProps) => {
    const {gridTitle, showFilter, reorder, onClick, addButtonToolTip, reorderButtonToolTip} = props;

    return (
        <Toolbar>
            <Typography variant={'h4'} sx={{flex: 1, mx: 0.5}}>
                {gridTitle}
            </Typography>
            {(addButtonToolTip && onClick) &&
                <Tooltip title={addButtonToolTip}>
                    <ToolbarButton render={(triggerProps) => {
                        const {color: _, ...props} = triggerProps;
                        return (
                            <LpButton variant={'outlined'} onClick={() => onClick('inputForm')} {...props}>
                                <AddIcon/>
                            </LpButton>
                        )
                    }}>
                    </ToolbarButton>
                </Tooltip>}
            {(reorder && onClick) &&
                <Tooltip title={reorderButtonToolTip}>
                    <ToolbarButton render={(triggerProps) => {
                        const {color: _, ...props} = triggerProps;
                        return (
                            <LpButton variant={'outlined'} onClick={() => onClick("displayOrder")} {...props}>
                                <ReorderIcon/>
                            </LpButton>
                        )
                    }}>
                    </ToolbarButton>
                </Tooltip>}

            {showFilter && <DataGridQuickFilter/>}
        </Toolbar>
    )
}

export default DataGridToolBar;