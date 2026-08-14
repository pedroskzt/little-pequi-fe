import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import {useAuth} from "../../context/auth/AuthContext.ts";

const UserAccount = () => {

    const {user} = useAuth();

    return (
        <>
            <Container>
                <Typography variant={"h1"}>{`${user?.first_name} ${user?.last_name}`}</Typography>
            </Container>


        </>
    );
};

export default UserAccount;