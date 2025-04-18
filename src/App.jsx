import UserProvider from "./provider/UserProvider";
import PublicRoute from "./components/route/PublicRoute";
import PrivateRoute from "./components/route/PrivateRoute";
import AdminRoute from "./components/route/AdminRoute";
import { Suspense, lazy } from "react";
import Spinner from "./components/ui/Spinner";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
const CreateQuizSetPage = lazy(() => import("./pages/CreateQuizSetPage"));
const QuizEntryPage = lazy(() => import("./pages/QuizEntryPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LeaderBoardPage = lazy(() => import("./pages/LeaderBoardPage"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Spinner />}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/quiz/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <QuizPage />
              </Suspense>
            }
          />
          <Route
            path="/result/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <ResultPage />
              </Suspense>
            }
          />
          <Route
            path="/leaderboard/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <LeaderBoardPage />
              </Suspense>
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<Spinner />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/quizset"
            element={
              <Suspense fallback={<Spinner />}>
                <CreateQuizSetPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/quizentry/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <QuizEntryPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
