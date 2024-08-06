import "./Signup.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../services/users";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormInput2 from "../../components/Form/FormInput2/FormInput2";
import FormRadio2 from "../../components/Form/FormRadio2/FormRadio2";

const Signup = () => {
  const [passwordV, setPasswordV] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Authenticating user
    saveUser(data)
      .then((res) => {
        if (res.data.data) {
          navigate("/login");
        }
      })
      .catch((err) => {
        const res = err.response;
        if (res && res.data && res.data.message) alert(res.data.message);
        console.error("Error registerring user:", err);
      });
  };

  return (
    <div className="signup">
      <div className="title">Registration</div>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-details">
            <FormInput2
              id="fname"
              type="text"
              label="First Name"
              register={register}
              errors={errors}
            />
            <FormInput2
              id="lname"
              type="text"
              label="Last Name"
              register={register}
              errors={errors}
            />
            <FormInput2
              id="username"
              type="text"
              label="Username"
              register={register}
              errors={errors}
            />
            <FormInput2
              id="password"
              type={passwordV ? "text" : "password"}
              label="Password"
              register={register}
              errors={errors}
              handleClickEvent={() => setPasswordV(!passwordV)}
            >
              {passwordV ? <FaEyeSlash /> : <FaEye />}
            </FormInput2>
            <FormInput2
              id="telephone"
              type="number"
              label="Telephone"
              register={register}
              errors={errors}
              validation={{
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Telephone must be a number",
                },
              }}
            />
          </div>
          <div>
            <FormRadio2
              id="gender"
              type="radio"
              label="Gender"
              values={["M", "F"]}
              labels={["Male", "Female"]}
              register={register}
              errors={errors}
            />
          </div>
          <div className="button mb-1">
            <input type="submit" />
          </div>
          <Link to="/login" className="m-auto">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
