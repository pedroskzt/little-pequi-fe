import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {TextFieldProps} from "@mui/material";
import TextField from "@mui/material/TextField";
import {PathValue} from "react-hook-form";
import {Control} from "react-hook-form";
import {Path} from "react-hook-form";
import {FieldValues} from "react-hook-form";
import {Controller} from "react-hook-form";

type ILpTextFieldProps<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    type?: string;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
} & TextFieldProps

const LpTextField = <T extends FieldValues>(props: ILpTextFieldProps<T>) => {
    const {label, name, control, defaultValue, type, ...renderProps} = props;
    return (
        <FormControl
            sx={{
                ...renderProps.sx
            }}>
            <FormLabel htmlFor={name} sx={{textAlign: 'start'}}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field, fieldState: {error}}) => (
                    <TextField
                        {...renderProps}
                        {...field}
                        id={name}
                        type={type ? type : 'text'}
                        variant="outlined"

                        slotProps={{
                            htmlInput: {
                                style: {
                                    boxSizing: 'border-box'
                                }
                            }
                        }}
                        error={!!error}
                        helperText={error?.message}/>
                )}/>
        </FormControl>
    )
}

export default LpTextField;