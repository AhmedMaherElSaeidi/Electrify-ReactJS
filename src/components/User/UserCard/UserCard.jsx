import "./UserCard.scss";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import CurrentUser from "../../../models/CurrentUser";
import SERVER_DOMAIN from "../../../services/enviroment";

const UserCard = ({ user, deleteUser }) => {
  const currentUser = new CurrentUser();
  const fullname =
    currentUser.id !== user.id
      ? `${user.fname} ${user.lname}`
      : `${user.fname} ${user.lname} (you)`;

  return (
    <div className="user-card">
      <img className="avatar" src={`${SERVER_DOMAIN}/${user.image}`} />
      <h2 className="name">{fullname}</h2>
      <p className="location mb-1">{user.username}</p>
      <p className="location">{user.telephone}</p>
      <ul className="tags-list">
        <li className="tag">{user.role}</li>
        <li className="tag">{user.gender}</li>
        {currentUser.id !== user.id && (
          <li className="tag remove-user" onClick={() => deleteUser(user.id)}>
            <FaTrashAlt />
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserCard;
