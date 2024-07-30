import "./SettingsPage.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrentUser from "../../models/CurrentUser";
import React, { useEffect, useState } from "react";
import SERVER_DOMAIN from "../../services/enviroment";
import FormInput2 from "../../components/Form/FormInput2/FormInput2";
import FormSelect2 from "../../components/Form/FormSelect2/FormSelect2";
import { deleteUser, fetchUser, updateUser } from "../../services/users";
import Spinner from "../../components/Spinner/Spinner";

const SettingsPage = () => {
  const user = new CurrentUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [pageData, setPageData] = useState({
    user: [],
    err: null,
    loading: true,
  });

  const fetchUserData = async () => {
    setPageData({ ...pageData, loading: true });
    await fetchUser(user.toObject().id)
      .then((res) => {
        setPageData((prev) => {
          return { ...prev, user: res.data.data, loading: false };
        });

        const user = res.data.data;
        for (const key in user) {
          setValue(key, user[key]);
        }
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loading: false };
        });
        console.log(err);
      });
  };
  const removeProfile = async () => {
    const confirm =
      prompt("Are you sure to continue? Type 'yes' to continue...") === "yes";

    setPageData({ ...pageData, loading: true });
    if (confirm) {
      await deleteUser(user.toObject().id)
        .then(() => {
          setPageData({ ...pageData, loading: false });
          navigate("/logout");
        })
        .catch((err) => {
          setPageData({ ...pageData, loading: false });
          console.log(err);
        });
    }
  };
  const onSubmit = async (data) => {
    // Removing attributes unallowed to send them
    setPageData({ ...pageData, loading: true });
    data.image = typeof data.image !== "string" ? data.image[0] : data.image;
    delete data.role;
    delete data.id;

    // Building up form data
    const userData = new FormData();
    for (const key in data) {
      userData.append(key, data[key]);
    }

    // Updating user
    await updateUser(user.toObject().id, data)
      .then((res) => {
        // Updating page state
        fetchUserData();

        setPageData({ ...pageData, loading: false });
        alert(res.data.message);
      })
      .catch((err) => {
        setPageData({ ...pageData, loading: false });
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="settings-page">
      {!pageData.loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <img
              src={`${SERVER_DOMAIN}/${pageData.user.image}`}
              alt="user_profile"
            />
            <p className="text-center fs-4 fw-bold">{`${pageData.user.fname} ${pageData.user.lname}`}</p>
            <input type="file" {...register("image")} />
          </div>
          <div className="mb-3">
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
              id="telephone"
              type="number"
              label="Telephone"
              register={register}
              errors={errors}
              validation={{
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Telephone must be a number",
                },
              }}
            />
            <FormSelect2
              id="gender"
              label="Gender"
              values={["M", "F"]}
              labels={["Male", "Female"]}
              register={register}
            />
            <button className="btn btn-secondary" type="submit">
              Save
            </button>
          </div>
          <div>
            <span className="btn btn-danger" onClick={removeProfile}>
              Delete Profile
            </span>
          </div>
        </form>
      )}
      {pageData.loading && <Spinner />}
    </div>
  );
};

export default SettingsPage;
