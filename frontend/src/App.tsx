import { Route, Routes } from "react-router";
import Layout from "./components/provider/Layout.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";

import QuizCreateOrUpdatePage from "./pages/quiz/QuizCreateOrUpdatePage.tsx";
import QuizSessionsPage from "./pages/quiz-session/QuizSessionsPage.tsx";
import ApplicationPage from "./pages/ApplicationPage.tsx";
import QuizListPage from "./pages/quiz/QuizListPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import PolicyPage from "./pages/PolicyPage.tsx";
import MainPage from "./pages/MainPage";

import './App.css'
import QuizPage from "./pages/quiz-session/QuizPage.tsx";
import ModerationPage from "./pages/moderator/ModerationPage.tsx";
import ApplicationProfilePage from "./pages/moderator/ApplicationProfilePage.tsx";


function App() {

    return (
        <Routes>

            <Route path="/" element={<Layout />}>

                {/* default user */}
                <Route element={<RequireAuth allowedRoles={['ROLE_USER']} />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/policy" element={<PolicyPage />} />
                    <Route path="/application-page" element={<ApplicationPage />}/>
                    <Route path="/quiz-sessions" element={<QuizSessionsPage />}/>
                    <Route path="/quiz/:sessionId" element={<QuizPage/>}/>
                </Route>

                {/* for all who has profile */}
                <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR']} />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* moderator */}
                <Route element={<RequireAuth allowedRoles={['ROLE_MODERATOR']} />}>
                    <Route path="/quiz/:quizId/update" element={<QuizCreateOrUpdatePage />} />
                    <Route path="/quiz/create" element={<QuizCreateOrUpdatePage />} />
                    <Route path="/quizzes" element={<QuizListPage />}/>
                    <Route path="/moderation" element={<ModerationPage />}/>
                    <Route path="/application/:applicationId" element={<ApplicationProfilePage/>}/>
                </Route>
            </Route>

        </Routes>
    );
}

export default App;
