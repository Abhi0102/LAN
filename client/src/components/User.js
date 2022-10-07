import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function User() {
  const [selectedItem, setSelectedItem] = useState("all");
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    switch (selectedItem) {
      case "all":
        setUsersList([]);
        axios.get("/api/v1/user/get-all-users").then((res) => {
          setUsersList(res.data.users);
        });
        break;
      case "following":
        setUsersList([]);
        axios.get("/api/v1/user/get-following-users").then((res) => {
          setUsersList(res.data.users);
        });
        break;
      case "followers":
        setUsersList([]);
    }
  }, [selectedItem]);

  const follow = (id, index) => {
    axios
      .post("/api/v1/user/follow", { id })
      .then((res) => {
        const updatedItem = usersList[index];
        updatedItem.isFollowing = true;
        const updatedList = usersList;
        updatedList[index] = updatedItem;
        setUsersList([...updatedList]);
      })
      .catch((err) => toast.error("Some error occured."));
  };

  const unfollow = (id, index) => {
    axios
      .post("/api/v1/user/unfollow", { id })
      .then((res) => {
        const updatedItem = usersList[index];
        updatedItem.isFollowing = false;
        const updatedList = usersList;
        updatedList[index] = updatedItem;
        setUsersList([...updatedList]);
      })
      .catch((err) => {
        toast.error("Some error occured.");
      });
  };

  const unfollowFromFollowing = (id, index) => {
    axios.post("/api/v1/user/unfollow", { id }).then((res) => {
      const updatedList = usersList.filter((user) => user.id !== id);
      setUsersList(updatedList);
    });
  };

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
        {usersList.length > 0 &&
          usersList.map((element, index) => (
            <div className="single-user" key={index}>
              <div className="single-user-img">
                <img
                  src={element.avatar}
                  alt="Avatar"
                  className="user-avatar"
                />
              </div>
              <div className="single-user-detail">{element.name}</div>
              <div className="single-user-btn-container">
                {selectedItem === "all" ? (
                  element.isFollowing ? (
                    <button
                      className="single-user-btn unfollow-btn"
                      onClick={() => unfollow(element.id, index)}
                    >
                      Un-Follow
                    </button>
                  ) : (
                    <button
                      className="single-user-btn follow-btn"
                      onClick={() => follow(element.id, index)}
                    >
                      Follow
                    </button>
                  )
                ) : selectedItem === "following" ? (
                  <button
                    className="single-user-btn unfollow-btn"
                    onClick={() => unfollowFromFollowing(element.id, index)}
                  >
                    Un-Follow
                  </button>
                ) : null}
                {}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default User;
