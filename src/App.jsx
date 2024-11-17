import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProvider from "./provider/UserProvider";
import ResultPage from "./pages/ResultPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import DashboardPage from "./pages/DashboardPage";
import CreateQuizSetPage from "./pages/CreateQuizSetPage";
import QuizEntryPage from "./pages/QuizEntryPage";
import PublicRoute from "./components/route/PublicRoute";
import PrivateRoute from "./components/route/PrivateRoute";
import AdminRoute from "./components/route/AdminRoute";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/leaderboard/:id" element={<LeaderBoardPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/quizset" element={<CreateQuizSetPage />} />
          <Route path="/admin/quizentry/:id" element={<QuizEntryPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
