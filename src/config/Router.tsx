import { BrowserRouter, Routes, Route } from "react-router-dom";
import MASignUp from "../authentication/signup";
import MALogin from "../authentication/login";
import AdminPanel from "../quizPages/AdminPanel";
import MainQuiz from "../quizPages/MainQuiz";
export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<MALogin />} />
                    <Route path="/" element={<MASignUp />} />
                    <Route path="AdminPanel" element={<AdminPanel />} />
                    <Route path="MainQuiz" element={<MainQuiz />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}