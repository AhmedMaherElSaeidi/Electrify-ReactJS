import "./UsersPage.scss";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/User/UserCard/UserCard";
import { deleteUser, fetchAllUsers } from "../../services/users";
import SearchInput from "../../components/Form/SearchInput/SearchInput";

const UsersPage = () => {
  const [pageData, setPageData] = useState({
    users: [],
    err: null,
    filter: null,
    loadig: true,
  });

  const handleInputChange = (event) => {
    setPageData({ ...pageData, filter: event.target.value });
  };
  const filteredUsers = () => {
    return pageData.filter
      ? pageData.users.filter((user) => {
          const fullname = `${user.fname} ${user.lname}`;
          const includes = (parent) =>
            parent.toLowerCase().includes(pageData.filter.toLowerCase());

          return (
            includes(fullname) ||
            includes(user.role) ||
            includes(user.gender) ||
            includes(user.username) ||
            user.telephone.includes(pageData.filter)
          );
        })
      : pageData.users;
  };
  const fetchUsersData = async () => {
    await fetchAllUsers()
      .then((res) => {
        setPageData((prev) => {
          return { ...prev, users: res.data.data, loadig: false };
        });
      })
      .catch((err) => {
        setPageData((prev) => {
          return { ...prev, err, loadig: false };
        });
        console.log("Error retrieving users...", err);
      });
  };
  const removeUserData = async (id) => {
    const confirm = prompt("Are you sure to continue? type 'yes' if so...");

    if (confirm === "yes") {
      await deleteUser(id)
        .then(() => {
          fetchUsersData();
        })
        .catch((err) => {
          console.log("Error deleting user...", err);
        });
    }
  };

  useEffect(() => {
    fetchUsersData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="users-page">
      <div className="users-filter">
        <SearchInput
          placeholder="Filter users..."
          onChange={handleInputChange}
        />
      </div>
      <div className="users-wrapper">
        {pageData.users &&
          filteredUsers().map((user, index) => {
            return (
              <UserCard key={index} user={user} deleteUser={removeUserData} />
            );
          })}
      </div>
    </div>
  );
};

export default UsersPage;
