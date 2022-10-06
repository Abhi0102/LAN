import React, { useState } from "react";

function User() {
  const [selectedItem, setSelectedItem] = useState("all");
  return (
    <div className="users-container">
      <div className="users-header">Users</div>
      <div className="user-filter">
        <div
          className={`user-filter-btn ${
            selectedItem === "all" ? "user-filter-btn-selected" : null
          }`}
          onClick={() => setSelectedItem("all")}
        >
          All User
        </div>
        <div
          className={`user-filter-btn ${
            selectedItem === "followers" ? "user-filter-btn-selected" : null
          }`}
          onClick={() => setSelectedItem("followers")}
        >
          Followers
        </div>
        <div
          className={`user-filter-btn ${
            selectedItem === "following" ? "user-filter-btn-selected" : null
          }`}
          onClick={() => setSelectedItem("following")}
        >
          Following
        </div>
      </div>

      <div className="users-list">
        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>

        <div className="single-user">
          <div className="single-user-img">
            <img src="/avatar.png" alt="Avatar" className="user-avatar" />
          </div>
          <div className="single-user-detail">User</div>
          <div className="single-user-btn">
            <button>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
