import "./SettingsPage.scss";
import { useForm } from "react-hook-form";
import { fetchUser, saveUser, updateUser } from "../../services/users";
import CurrentUser from "../../models/CurrentUser";
import React, { useEffect, useState } from "react";
import SERVER_DOMAIN from "../../services/enviroment";
import FormInput2 from "../../components/Form/FormInput2/FormInput2";
import FormSelect2 from "../../components/Form/FormSelect2/FormSelect2";

const SettingsPage = () => {
  const user = new CurrentUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [pageData, setPageData] = useState({
    user: [],
    err: null,
    loadig: true,
  });

  const fetchUserData = () => {
    fetchUser(user.toObject().id)
      .then((res) => {
        setPageData((prev) => {
          return { ...prev, user: res.data.data, loadig: false };
        });

        const user = res.data.data;
        for (const key in user) {
          setValue(key, user[key]);
        }
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loadig: false };
        });
        console.log(err);
      });
  };
  const onSubmit = async (data) => {
    // Removing attributes unallowed to send them
    data.image = typeof data.image !== "string" ? data.image[0] : data.image;
    delete data.role;
    delete data.id;

    // Building up form data
    const userData = new FormData();
    for (const key in data) {
      userData.append(key, data[key]);
    }

    // Updating user
    updateUser(user.toObject().id, data)
      .then((res) => {
        console.log(res.data);
        // Updating page state
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="settings-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img
            src={`${SERVER_DOMAIN}/${pageData.user.image}`}
            alt="user_profile"
          />
          <input type="file" {...register("image")} />
        </div>
        <div>
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
      </form>
    </div>
  );
};

export default SettingsPage;
