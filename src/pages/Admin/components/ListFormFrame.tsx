import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {ReactNode} from "react";
import LpButton from "../../../components/LpButton/LpButton.tsx";

interface IListFormFrameProps {
    label: string;
    children: ReactNode;
    onClick: (form: "inputForm" | "displayOrder") => void;
    reorder: boolean;
}

const ListFormFrame = (props: IListFormFrameProps) => {

    const {children, label, onClick, reorder} = props;

    return (
        <>
            <Box flexDirection={'column'} alignItems={'flex-end'}>
                <Stack direction={"row"} sx={{
                    justifyContent: 'space-between',
                    marginBottom: 2,
                }}>
                    <Typography variant={'h4'}>{label}</Typography>
                    <Box gap={1} display={'flex'}>
                        <LpButton variant={'outlined'} {...props} onClick={() => onClick("inputForm")}>
                            <AddIcon/>
                        </LpButton>

                        {reorder &&
                            <LpButton variant={'outlined'} {...props} onClick={() => onClick("displayOrder")}>
                                <ReorderIcon/>
                            </LpButton>
                        }
                    </Box>
                </Stack>
                <Container component={Paper} elevation={9}>
                    {children}
                </Container>
            </Box>
        </>
    )
}

export default ListFormFrame;