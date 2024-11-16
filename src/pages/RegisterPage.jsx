import leftSideImage from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import logowhite from "../assets/logo-white.svg";
import InputField from "../components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSignUp from "../hooks/auth/useSignup";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { mutate: signup } = useSignUp();

  const onSubmit = (data) => {
    console.log(data);

    const submittedDataForUser = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };
    const submittedDataForAdmin = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    signup(data.role ? submittedDataForAdmin : submittedDataForUser);
  };

  return (
    <div className="bg-white text-gray-800 ">
      <div className="flex min-h-screen max-h-screen">
        <div className="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12  h-full fixed left-0 top-0">
          <div className="text-white">
            <Link to="/">
              <img src={logowhite} alt="register-image" className="h-8" />
            </Link>

            <img
              src={leftSideImage}
              alt="register-image"
              className="mx-auto 2xl:ml-0 max-h-64  max-w-lg"
            />

            <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>
            <p className="text-xl mb-4 font-medium">
              Boost Your Learning Capabilities
            </p>
            <p className="mb-8 max-w-lg">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you&apos;re preparing for exams, improving your knowledge,
              or simply having fun, there&apos;s no better way to sharpen your
              mind.
            </p>
          </div>
        </div>

        <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
          <div className="w-full max-w-lg ">
            <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} alt="website-logo" className="h-7" />
            </h2>
            <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <InputField
                  {...register("full_name", {
                    required: "Full name is required.",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })}
                  label="Full Name"
                  type="text"
                  placeholder="Full Name"
                  errorMessage={errors?.full_name?.message}
                />
                <InputField
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  label="Email"
                  type="text"
                  placeholder="Email"
                  errorMessage={errors?.email?.message}
                />
              </div>

              <div className="flex w-full items-center gap-4">
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
                <InputField
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  label=" Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  errorMessage={errors?.confirm_password?.message}
                />
              </div>

              <div className="mb-6 flex gap-2 items-center">
                <input
                  {...register("role")}
                  type="checkbox"
                  value="admin"
                  className="px-4 py-3 rounded-lg border border-gray-300"
                />
                <label className="block">Register as Admin</label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mb-2"
              >
                Create Account
              </button>
            </form>

            <div className="mt-2 text-gray-400">
              <p className="text-center">
                Already have account ?{" "}
                <Link to={"/login"} href="#" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
