import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {Box} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {Path} from "react-hook-form";
import {Control, Controller, FieldValues} from "react-hook-form";
import ISelectOption from "../../interfaces/ISelectOption.ts";


interface ILpSelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control?: Control<T>;
    options?: ISelectOption[];
}

const LpSelect = <T extends FieldValues>({label, name, control, options}: ILpSelectProps<T>) => {
    return (
        <>
            <FormControl>
                <FormLabel htmlFor={name} sx={{textAlign: 'start'}}>{label}</FormLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({field: {value, onChange, ref}, fieldState: {error}}) => (
                        <Autocomplete
                            id='category'
                            options={options || []}
                            value={value}
                            getOptionLabel={
                                (option) => options?.find(
                                    (item) => item.label === option.label)?.label ?? ''
                            }
                            isOptionEqualToValue={
                                (option, newValue) => option.label === newValue.label
                            }
                            onChange={
                                (_, newValue) => {
                                    onChange(newValue);
                                }
                            }
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    inputRef={ref}
                                    error={!!error}
                                    helperText={error?.message}/>
                            }

                            renderOption={(props, option, {selected}) => {
                                const {key, ...renderProps} = props
                                return (
                                    <Box component="li" key={key} {...renderProps}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon/>}
                                            checkedIcon={<CheckBoxIcon/>}
                                            checked={selected}/>
                                        {option.label}
                                    </Box>
                                )
                            }}/>
                    )}/>
            </FormControl>
        </>
    )
}

export default LpSelect;