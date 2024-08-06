import "./Login.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../../models/CurrentUser";
import { login } from "../../services/authentication";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import FormInput1 from "../../components/Form/FormInput1/FormInput1";

const Login = () => {
  const [passwordV, setPasswordV] = useState(false);
  const navigate = useNavigate();
  const user = new CurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data)
      .then((res) => {
        // saving user credentials
        user.authenticate(res.data.data);

        // Go to home if authorized
        if (user.sessionValid()) {
          navigate("/home");
          return;
        }
      })
      .catch((err) => {
        const res = err.response;
        if (res && res.data && res.data.message)
          alert(err.response.data.message);
        console.error("Error logging user:", err);
      });
  };

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <span className="login-icon" onClick={() => navigate("/home")}>
        <FaHome />
      </span>
      <FormInput1
        type="text"
        id="username"
        label="Username"
        errors={errors}
        register={register}
      />
      <FormInput1
        type={passwordV ? "text" : "password"}
        id="password"
        label="********"
        errors={errors}
        register={register}
        handleClickEvent={() => setPasswordV(!passwordV)}
      >
        {passwordV ? <FaEyeSlash /> : <FaEye />}
      </FormInput1>
      <button className="d-block">Login</button>
      <Link to="/register">Register</Link>
    </form>
  );
};

export default Login;
