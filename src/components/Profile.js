import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("lanUser"));
  const handleDelete = () => {
    const ans = window.confirm("Click on OK to delete your account.");
    console.log(ans);
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
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <div className="profile-right">
            <img
              src="/delete.png"
              alt="Delete"
              className="profile-btn"
              onClick={handleDelete}
            />
            <img src="/edit (1).png" alt="edit" className="profile-btn" />
          </div>
        </div>
        <hr />
        <div className="box-body-bottom">
          <p>Joined: {user.joinedOn}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
