import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
// import {useState} from "react";
import {useNavigate} from "react-router";
// import IUser from "../../interfaces/IUser.ts";
import {useAuth} from "../../context/auth/AuthContext.ts";

const UserAccount = () => {

    // const [userObj, setUserObj] = useState<null | IUser>(null)
    const {user} = useAuth();
    const navigate = useNavigate();
    //
    useEffect(() => {
        if (user === null) {
            navigate('/')
        }
        //     } else {
        //         setUserObj(user)
        //     }
    }, [user, navigate])


    return (
        <>
            <Container>
                <Typography variant={"h1"}>{`${user?.first_name} ${user?.last_name}`}</Typography>
            </Container>
        </>
    );
};

export default UserAccount;