import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, editName } from "../helpers/user";
import UserContext from "../StateProvider";

function Profile() {
  let user = JSON.parse(localStorage.getItem("lanUser"));
  const [userName, setUserName] = useState(user.name);
  const [editable, setEditable] = useState(false);
  const [loggedIn, setLoggedIn] = useContext(UserContext);
  const handleDelete = (e) => {
    const ans = window.confirm("Click on OK to delete your account.");
    if (ans) {
      deleteUser(user.id);
      localStorage.removeItem("lanUser");
      setLoggedIn(false);
      toast.success("User successfully deleted!!");
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };
  const handleSave = () => {
    setEditable(false);
    editName(user.id, userName);
    user.name = userName;
    localStorage.setItem("lanUser", JSON.stringify(user));
  };
  return (
    <div className="box">
      <div className="box-header">User Profile</div>
      <div className="box-body">
        <div className="box-body-top">
          <div className="profile-left">
            <img src="/avatar.png" alt="Avatar" className="avatar" />
          </div>
          <div className="profile-mid">
            {!editable && <p>{user.name}</p>}
            {editable && (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
            <p>{user.email}</p>
          </div>
          <div className="profile-right">
            {!editable ? (
              <>
                <img
                  src="/delete.png"
                  alt="Delete"
                  className="profile-btn"
                  onClick={handleDelete}
                />
                <img
                  src="/edit (1).png"
                  alt="edit"
                  className="profile-btn"
                  onClick={handleEdit}
                />
              </>
            ) : (
              <button
                className="post-btn"
                disabled={!userName}
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <hr />
        <div className="box-body-bottom">
          <p>Joined: {new Date(user.joinedOn).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
