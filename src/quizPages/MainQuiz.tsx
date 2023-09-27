import { useState } from "react";
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography";
import { Get } from "../config/firebaseMethods";
import { render } from "@testing-library/react";
import MAbutton from "../component/Button";
export default function MainQuiz() {
    let [render, setRender] = useState<any>([])
    Get('tasks').then((res) => {
        setRender([...res])
    }).catch((err) => {
        console.log(err)
    })
    return (
        <>
            <div className="container flex justify-center items-center my-auto mt-5">
                <Paper className="text-center overflow-auto h-screen">
                {
                    render.map((x: any, i: any)=>{
                       return(
                        <> 
                              <div>
                                   <Typography variant="h5" className="underline  my-5"><span className="text-blue-300">Quiz Name</span> : {x.QuizName}</Typography>
                               </div>
                               <div>
                                   <h4 className="mt-4"><span className="text-blue-300">Question</span> : {x.Question}</h4>
                                   <MAbutton value={x.option1} Classname="bg-blue-700 w-75 mt-4" />
                                   <MAbutton value={x.option2} Classname="bg-blue-700 w-75 mt-4" />
                                   <MAbutton value={x.option3} Classname="bg-blue-700 w-75 mt-4" />
                                   <MAbutton value={x.option4} Classname="bg-blue-700 w-75 mt-4" />
                               </div>
                        </>
                       )
                    })
                }
                </Paper>
            </div>
        </>
    )
}