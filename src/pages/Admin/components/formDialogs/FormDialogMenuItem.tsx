import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import {Controller} from "react-hook-form";
import LpMultipleSelect from "../../../../components/LpSelect/LpMultipleSelect.tsx";
import LpSelect from "../../../../components/LpSelect/LpSelect.tsx";
import LpTextField from "../../../../components/LpTextField/LpTextField.tsx";
import IAction from "../../../../interfaces/IAction.ts";
import ICategory from "../../../../interfaces/ICategory.ts";
import ITag from "../../../../interfaces/ITag.ts";
import {useCrudAdminContext} from "../../context/CrudAdminContext.ts";
import useMenuItemDialogForm from "../../hooks/useMenuItemDialogForm.ts";
import {MenuItemSchema} from "../../types/DialogFormSchemas.ts";
import {TDialogFormData} from "../../types/TDialogData.ts";

interface IFormDialogMenuItemProps {
    formId: string;
    handleResponse: (action: IAction, response: TDialogFormData[]) => void;
    toEdit: MenuItemSchema | undefined;
}


const FormDialogMenuItem = (props: IFormDialogMenuItemProps) => {
    const {formId, handleResponse, toEdit} = props;
    const {setAlertState, setIsLoading} = useCrudAdminContext();

    const {
        control,
        handleSubmit,
        categories,
        tags,
        imageUrl,
        onSubmit,
        onError,
        setImageUrl,
    } = useMenuItemDialogForm({
        toEdit,
        onSuccess: handleResponse,
        setAlertState,
        setIsLoading,
    });


    const VisuallyHiddenInput = styled('input')({
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (<>
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', width: '100%', gap: 2, paddingX: 3
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit, onError)}
            id={formId}>
            <LpTextField<MenuItemSchema> label={"ID"} name={"id"} control={control}
                                            defaultValue={""} sx={{display: 'none'}}/>
            <LpTextField<MenuItemSchema> label={"Title"} name={"title"} control={control}
                                            defaultValue={""} autoFocus/>
            <LpTextField<MenuItemSchema> label={"Price"} name={"price"} type={"number"} control={control}
                                            defaultValue={""}/>
            <LpTextField<MenuItemSchema> label={"Description"} name={"description"} control={control}
                                            defaultValue={""} multiline maxRows={4}/>
            <LpSelect<MenuItemSchema>
                label={"Category"}
                name={"category"}
                control={control}
                options={categories.map((category: ICategory) => ({
                    value: category.slug, label: category.title
                }))
                }/>

            <LpMultipleSelect<MenuItemSchema>
                label={"Tags"}
                name={"tags"}
                control={control}
                options={tags.map((tag: ITag) => ({
                    value: tag.slug, label: tag.title
                }))}/>

            <FormControl>
                <FormLabel htmlFor={"image"} sx={{textAlign: 'start'}}>Image</FormLabel>
                {(imageUrl) &&
                    <Box component={"img"} sx={{my: 1}} alt={toEdit?.title} src={imageUrl}/>}
                {(!imageUrl && toEdit && 'image' in toEdit) &&
                    <Box component={"img"} sx={{my: 1}} alt={toEdit.title} src={toEdit.image as string}/>}

                <Controller name={"image"} control={control} render={({field}) => {
                    return (<Button
                        component={"label"}
                        role={undefined}
                        variant={"contained"}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}>
                        Upload Image
                        <VisuallyHiddenInput
                            type={"file"}
                            ref={field.ref}
                            accept={"imager/*"}
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={(event) => {
                                const file = event.target.files?.[0]
                                if (file) {
                                    // Create preview URL for the selected file
                                    setImageUrl(URL.createObjectURL(file))
                                }
                                return field.onChange(file)
                            }}/>
                    </Button>)
                }}/>
            </FormControl>
            <Grid spacing={2} container>
                <FormControl>
                    <FormLabel htmlFor="featured" sx={{textAlign: 'start'}}>Featured</FormLabel>
                    <Controller
                        name="featured"
                        control={control}
                        render={({field}) => <Switch {...field} id='featured' checked={field.value}/>}/>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="delivery" sx={{textAlign: 'start'}}>For delivery</FormLabel>
                    <Controller
                        name="delivery"
                        control={control}
                        render={({field}) => <Switch {...field} id='delivery' checked={field.value}/>}/>
                </FormControl>
            </Grid>
        </Box>
    </>);
}

export default FormDialogMenuItem;