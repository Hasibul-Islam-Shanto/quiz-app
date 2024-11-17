import { Link } from "react-router-dom";
import leftSideImage from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import InputField from "../components/ui/input";
import { useForm } from "react-hook-form";
import useSignIn from "../hooks/auth/useSignin";
import logowhite from "../assets/logo-white.svg";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { mutate: signin } = useSignIn(watch("role") === "admin" && true);
  const onSubmit = (data) => {
    signin(data);
  };
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <Link to="/">
              <img src={logowhite} alt="register-image" className="h-8" />
            </Link>
            <img src={leftSideImage} alt="login-image" className="mx-auto" />

            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you&apos;re preparing for exams, improving your knowledge,
              or simply having fun, there&apos;s no better way to sharpen your
              mind.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} alt="website-logo" className="h-7" />
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                {...register("email", {
                  required: "Email or Username is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                label=" Enter your username or email address"
                type="text"
                placeholder="Username or email address"
                errorMessage={errors?.email?.message}
              />

              <InputField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
                    hasNumber: (value) =>
                      /[0-9]/.test(value) ||
                      "Password must contain at least one number",
                  },
                })}
                label="Enter your Password"
                type="password"
                placeholder="Password"
                errorMessage={errors?.password?.message}
              />

              <div className="mb-6 flex gap-2 items-center">
                <input
                  {...register("role")}
                  type="checkbox"
                  value="admin"
                  className="px-4 py-3 rounded-lg border border-gray-300"
                />
                <label className="block ">Login as Admin</label>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mb-4"
              >
                Sign in
              </button>
            </form>

            <div className="text-center">
              <a href="#" className="text-primary">
                Forgot Password
              </a>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account ?{" "}
                <Link to={"/register"} className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
