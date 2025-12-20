import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import Image from "../formComp/Image";
import Input from "../formComp/Input";
import Button from "../formComp/Button";
import Checkbox from "../formComp/CheckBox";
import { useForm } from "react-hook-form";
import { authservice } from "../../Laravel/Auth";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading";
function Register() {
  const [isPwdVisible, setisPwdVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // register user
  const submit = async (data) => {
    try {
      setLoading(true);
      const result = await authservice.register(data);

      if (result.success) {
        navigate("/login");
      } else {
        const emailError = result.error?.errors?.email?.[0];
        setError(emailError);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          {/* Left Image */}
          <Image link="/form.webp" />

          {/* Right Form */}
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Register</h1>
              {error && (
                <div className="mt-3 bg-red-100 text-red-700 px-4 py-2 rounded-lg inline-block shadow-md">
                  {error}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(submit)}>
              <Input
                label="Name"
                type="name"
                placeholder="John Doe"
                Icon={User}
                {...register("name", {
                  required: "name is required",
                })}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="johnsmith@example.com"
                Icon={Mail}
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email",
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type={isPwdVisible ? "text" : "password"}
                placeholder="************"
                Icon={Lock}
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "password must contain at least 8 words",
                  },
                })}
                error={errors.password?.message}
              />
              <Checkbox
                label="Show Password"
                checked={isPwdVisible}
                onChange={(e) => setisPwdVisible(e.target.checked)}
                className="mb-7"
              />
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <Button text="LOGIN NOW" />
                </div>
              </div>
              <Link to="/login">
                <p className="mt-2 text-center text-base text-black/60 hover:text-blue-600">
                  Already have an Account?&nbsp;
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
