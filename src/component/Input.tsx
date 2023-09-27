import { TextField } from "@mui/material";
import { type } from "os";
type MAinput = {
    onchange?: any,
    label: string,
    className?: string,
    type: string,
    disables?:any,
    defaultValue?:any,
    id?:any,

}
export default function MAinput(props: MAinput) {
    return (
        <>
            <TextField disabled={props.disables} defaultValue={props.defaultValue} className={props.className} type={props.type} id={props.id} label={props.label} variant="filled" onChange={props.onchange} />
        </>
    )
}