import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {useState} from "react";
import {useNavigate} from "react-router";
import IUser from "../../interfaces/IUser.ts";
import {tokenStore} from "../../http/auth.ts";

const UserAccount = () => {

    const [userObj, setUserObj] = useState<null | IUser>(null)
    const user = tokenStore.getUser()
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/')
        } else {
            setUserObj(JSON.parse(user))
        }
    }, [user, navigate])


    return (
        <>
            <Container>
                <Typography variant={"h1"}>{`${userObj?.first_name} ${userObj?.last_name}`}</Typography>
            </Container>
        </>
    );
};

export default UserAccount;