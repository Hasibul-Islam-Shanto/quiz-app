import { useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../context";
import Welcome from "../components/Welcome";
import QuizContainer from "../components/quizset/QuizContainer";

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="container mx-auto py-3">
        <Header />
        {user && <Welcome userName={user?.full_name} />}
        <QuizContainer />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomePage;
