import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import MAbutton from "../component/Button";
import MAinput from "../component/Input";
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from "react";
import { SignUp } from "../config/firebaseMethods";
import { useNavigate } from "react-router-dom";

export default function MASignUp() {
    let [user, setUser] = useState<any>([])
    const [open, setOpen] = useState(false);
    const fillMOdel = (key: any, val: any) => {

        user[key] = val;
        setUser({ ...user })
    }
    let navigate = useNavigate()
    const SignUpUser = () => {
        console.log(user)
        setOpen(true)
        SignUp(user)

            .then((res: any) => {
                navigate('/login')
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
                <div className="w-[400px] ease-in duration-300 bg-white p-5 rounded-lg border-t-4 border-indigo-500 border-b-4 border-indigo-500 hover:border-r-4 border-indigo-500 hover:border-l-4 border-indigo-500 hover:border-t-0 border-indigo-500 hover:border-b-0 border-indigo-500 flex justify-center items-center">
                    <div className="py-2 flex-col flex justify-center items-center">

                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Avatar src="/broken-image.jpg" sx={{ width: "100px", height: "100px", backgroundColor: "transparent" }} className="block bg-gradient-to-r from-indigo-500 mb-4" />
                        <MAinput label="User Name" type="text" onchange={(e: any) => fillMOdel("User Name", e.target.value)} />
                        <br />
                        <MAinput label="Email" type="email" onchange={(e: any) => fillMOdel("Email", e.target.value)} />
                        <br />
                        <MAinput label="Password" type="password" onchange={(e: any) => fillMOdel("Password", e.target.value)} />
                        <br />
                        <MAbutton value="Sign Up" Onclick={SignUpUser} endIcon={<PersonIcon />} Classname="bg-gradient-to-r from-indigo-500 ease-linear duration-500 hover:bg-gradient-to-l from-indigo-300 w-75 h-50 py-2 rounded-lg" />
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