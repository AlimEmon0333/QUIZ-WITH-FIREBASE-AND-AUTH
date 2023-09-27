import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import MAbutton from "../component/Button";
import MAinput from "../component/Input";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { useEffect, useState } from "react";
import { Add, Get } from "../config/firebaseMethods";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
export default function AdminPanel() {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 5,
    };
    let secretKey = 2112006;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [disabledInput, setdisabledInput] = useState(false)
    let [disabledButton, setdisabledButton] = useState(true)
    let [disabledButtonLock, setdisabledButtonLock] = useState(false)
    let [model, setModel] = useState<any>({});
    let [taskList, setTaskList] = useState<any>([]);
    let fillMOdel = (key: any, val: any) => {
        model[key] = val
        setModel({ ...model })
        console.log(model)
    }
    const addTask = () => {
        Add("tasks", model)
            .then((res) => {
                setModel({ ...model })
                getTasklist()
                Get('tasks')
                setdisabledInput(false)
                setdisabledButtonLock(false)
                setdisabledButton(true)
            }).catch((err) => {
                console.log(err)
            })
    }
    const getTasklist = () => {
        Get('tasks')
            .then((res) => {
                setTaskList([...res])
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }
    let lockQuiz = () => {
        protectSecretKey()

    }
    let protectSecretKey = () => {
        if (secretKey == model.Secretkey) {
            setdisabledInput(true)
            setdisabledButtonLock(true)
            setdisabledButton(false)
        } else {
            alert("your secret key is not valid")
            handleOpen()
            setdisabledInput(false)
            setdisabledButtonLock(false)
            setdisabledButton(true)
        }
    }
    let navigate = useNavigate()
    let ToQuiz = () =>{
      navigate("/MainQuiz")
    }
    useEffect(() => { getTasklist() }, [])
    return (
        <>
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1">
                <div className="bg-blue-700 py-5 px-5 sm:overflow-auto  md:h-screen flex flex-col  items-center" style={{ overflow: "scroll" }}>
                    <div className="bg-dark border-0 mx-4 rounded-full w-[50px] bg-white h-[50px] p-5 ">
                    </div>
                    {taskList.map((x: any, i: any) => {
                        return (
                            <>
                                <div key={i}>
                                    <MAbutton Classname="btn bg-blue-300 px-4 py-2 mt-3 w-150" Onclick={ToQuiz} value={x.QuizName} endIcon={<KeyboardDoubleArrowRightIcon />} />
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="col-span-4 bg-blue-300">
                    <div className="grid grid-cols-2">
                        <div className="text-start my-4 mx-5">
                            <h3 className="" style={{ fontFamily: "fantasy" }}>
                                Add Quiz By Form
                            </h3>
                        </div>
                        <div className="text-end my-4  mx-5">
                            <MAbutton Classname="btn bg-blue-700 w-25" value="Save" Onclick={addTask} disable={disabledButton} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2  m-3">
                        <MAinput label="Quiz Name" className="m-3" disables={disabledInput} type="text" onchange={(e: any) => { fillMOdel("QuizName", e.target.value) }} />
                        <MAinput label="Quiz Duration In Minutes" className="m-3" type="text" disables={disabledInput} onchange={(e: any) => { fillMOdel("Quiz Duration in min", e.target.value) }} />
                        <MAinput label="Secret Key" className="m-3" type="text" disables={disabledInput} onchange={(e: any) => { fillMOdel("Secretkey", e.target.value) }} />
                        <MAinput label="Description" className="col-span-3 m-3" type="text" disables={disabledInput} onchange={(e: any) => { fillMOdel("Description", e.target.value) }} />
                        <MAbutton value="Lock Quiz" Classname="bg-blue-700 m-3 w-50" Onclick={lockQuiz} disable={disabledButtonLock} />
                        <div>
                            {/* <Button onClick={handleOpen}>Open modal</Button> */}
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h5" component="h2" className="text-center">
                                        Secret key is
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                                        <h3 className="text-cyan-600">2112006</h3>
                                        <MAbutton Classname="bg-blue-300 px-5 py-2 m-4" value="Ok" Onclick={handleClose} />
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 m-4">
                        <MAinput label="Question" type="text" onchange={(e: any) => { fillMOdel("Question", e.target.value) }} />
                    </div>
                    <div className="grid grid-cols-4 m-4">
                        <MAinput label="Option 1" className="m-1" type="text" onchange={(e:any)=>fillMOdel("option1",e.target.value)}/>
                        <MAinput label="Option 2" className="m-1" type="text" onchange={(e: any) => fillMOdel("option2",e.target.value)}/>
                        <MAinput label="Option 3" className="m-1" type="text" onchange={(e: any) => fillMOdel("option3",e.target.value)}/>
                        <MAinput label="Option 4" className="m-1" type="text" onchange={(e: any) => fillMOdel("option4",e.target.value)}/>
                        <MAinput label="Enter Correct Answer" className="ms-1 me-1 col-span-4 " type="text" onchange={(e: any) => { fillMOdel("correctAns",e.target.value)}}/>
                    </div>
                      <div className="grid grid-cols-1">
                        <Button endIcon={<KeyIcon />} variant="contained" className="bg-blue-700 ms-5 me-5 mb-4" onClick={handleOpen} >
                            View Secret Key
                        </Button>
                      </div>
                </div>
            </div>
        </>
    )
}