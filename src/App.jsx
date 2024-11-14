import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProvider from "./provider/UserProvider";
import PublicLayout from "./components/layout/PublicLayout";
import ResultPage from "./pages/ResultPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import PrivateLayout from "./components/layout/PrivateLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateQuizSetPage from "./pages/CreateQuizSetPage";
import QuizEntryPage from "./pages/QuizEntryPage";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/leaderboard/:id" element={<LeaderBoardPage />} />
        </Route>

        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/quizset" element={<CreateQuizSetPage />} />
        <Route path="/admin/quizentry/:id" element={<QuizEntryPage />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
