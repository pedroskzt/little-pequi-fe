import {Control, useForm, UseFormHandleSubmit} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInDefaultValues, signInSchema, SignInSchema} from "../types/AuthSchema.ts";
import {isAxiosError} from "axios";
import {useAuth} from "../../../context/auth/AuthContext.ts";
import {useCallback, useState} from "react";
import IAlert from "../../../interfaces/IAlert.ts";
import {AlertColor} from "@mui/material/Alert";


interface ISignInFormReturn {
    // Form controls
    control: Control<SignInSchema>;
    handleSubmit: UseFormHandleSubmit<SignInSchema>;

    // States
    alertState: IAlert;

    // Handlers
    onSubmit: (data: SignInSchema) => void;
    showAlert: (message: string, severity?: AlertColor) => void;
    hideAlert: () => void;
}

const useSignInForm = (): ISignInFormReturn => {
    const {signIn} = useAuth();

    const [alertState, setAlertState] = useState<IAlert>({
        open: false,
        severity: "error",
        message: "",
    })

    // Form setup
    const {control, handleSubmit} = useForm<SignInSchema>({
        mode: "onBlur", resolver: zodResolver(signInSchema), defaultValues: signInDefaultValues,
    });

    const showAlert = useCallback((message: string, severity: AlertColor = "error") => {
        setAlertState({open: true, severity, message});
    }, []);

    const hideAlert = useCallback(() => {
        setAlertState(prevState => ({...prevState, open: false}));
    }, []);

    const onSubmit = async (data: SignInSchema) => {
        hideAlert();
        try {
            await signIn(data.email, data.password);
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 401) {
                showAlert("Invalid Email or Password", "error");
            } else {
                showAlert("Something went wrong. Please try again later or contact support.", "error");
            }
        }
    };

    return {
        // Form controls
        control, handleSubmit,

        // States
        alertState,

        // Handlers
        onSubmit, hideAlert, showAlert
    };
};

export default useSignInForm;