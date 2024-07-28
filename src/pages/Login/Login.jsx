import "./Login.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../../models/CurrentUser";
import { login } from "../../services/authentication";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data)
      .then((res) => {
        const user = new CurrentUser();
        user.authenticate(res.data.data);
        console.log(user.sessionValid());
        if (user.sessionValid()) {
          navigate("/home");
          return;
        }
      })
      .catch((err) => {
        console.error("Error logging user:", err);
      });
  };

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register("username", { required: true })}
          className={errors.username ? "invalid-input" : ""}
        />
      </div>
      <div>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className={errors.password ? "invalid-input" : ""}
        />
      </div>
      <button className="d-block">Login</button>
      <Link to="/register" className="m-auto">
        Register
      </Link>
    </form>
  );
};

export default Login;
