import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import MAbutton from "../component/Button";
import MAinput from "../component/Input";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../config/firebaseMethods";
export default function MALogin() {
    let [user, setUser] = useState<any>([])
    const [open, setOpen] = useState(false);
    const fillMOdel = (key: any, val: any) => {
        user[key] = val;
        setUser({ ...user })
    }
    let navigate = useNavigate()
    const LogInUser = () => {
        console.log(user)
        setOpen(true)
        Login(user)

            .then((res: any) => {
                navigate('/AdminPanel')
                setOpen(false)
            }).catch((err: any) => {
                alert(err)
                setOpen(false)
            })
    }
    return (
        <>
            {/* Login */}
            <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 h-screen w-screen">
                <div className="w-[350px] ease-in duration-300 bg-white p-5 rounded-lg border-t-4 border-indigo-500 border-b-4 border-indigo-500 hover:border-r-4 border-indigo-500 hover:border-l-4 border-indigo-500 hover:border-t-0 border-indigo-500 hover:border-b-0 border-indigo-500 flex justify-center items-center">

                    <div className="py-2 flex-col flex justify-center items-center">
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Avatar src="/broken-image.jpg" sx={{ width: "100px", height: "100px", backgroundColor: "transparent" }} className="block bg-gradient-to-r from-indigo-500 mb-4" />
                        <MAinput label="Enter Email" type="email" className="w-100" onchange={(e: any) => fillMOdel('Email', e.target.value)} />
                        <br />
                        <MAinput label="Enter Password" className="w-100" type="password" onchange={(e: any) => fillMOdel('Password', e.target.value)} />
                        <br />
                        <MAbutton Onclick={LogInUser} value="Log in" endIcon={<PersonIcon />} Classname="bg-gradient-to-r from-indigo-500 ease-linear duration-500 hover:bg-gradient-to-l from-indigo-300 w-75 h-50 py-2 rounded-lg" />
                    </div>
                    <div className="py-5 block flex-col">
                    </div>
                    <div className="py-5 flex-col">
                    </div>

                </div>
            </div>
        </>
    )
}