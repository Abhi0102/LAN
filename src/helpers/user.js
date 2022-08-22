let userData = [
  // {
  //   id: 3,
  //   name: "test",
  //   email: "test@gmail.com",
  //   password: "12345678",
  //   joinedOn: new Date(Date.now() - 5 * 86400000),
  //   avatar: "/avatar.png",
  // },
  // {
  //   id: 2,
  //   name: "test",
  //   email: "test@gmail.com",
  //   password: "12345678",
  //   joinedOn: new Date(Date.now() - 5 * 86400000),
  //   avatar: "/avatar.png",
  // },
  {
    id: 1,
    name: "test",
    email: "test@gmail.com",
    password: "12345678",
    joinedOn: new Date(Date.now() - 5 * 86400000),
    avatar: "/avatar.png",
  },
];

let post = [
  {
    id: 2,
    user: {
      id: 1,
      name: "test",
      email: "test@gmail.com",
      password: "12345678",
      joinedOn: "",
      avatar: "/avatar.png",
    },
    date: new Date(Date.now() - 2 * 86400000),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text ever
since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five
centuries, but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s with the release
of Letraset sheets containing Lorem Ipsum passages, and more recently
with desktop publishing software like Aldus PageMaker including versions
of Lorem Ipsum. Why do we use it? It is a long established fact that a
reader will be distracted by the readable content of a page when looking
at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using
'Content here, content here', making it look like readable English. Many
desktop publishing packages and web page editors now use Lorem Ipsum as
their default model text, and a search for 'lorem ipsum' will uncover
many web sites still in their infancy. Various versions have evolved
over the years, sometimes by accident, sometimes on purpose (injected
humour and the like).`,
  },
  {
    id: 1,
    user: {
      id: 1,
      name: "test",
      email: "test@gmail.com",
      password: "12345678",
      joinedOn: "",
      avatar: "/avatar.png",
    },
    date: new Date(Date.now() - 5 * 86400000),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text ever
since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five
centuries, but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s with the release
of Letraset sheets containing Lorem Ipsum passages, and more recently
with desktop publishing software like Aldus PageMaker including versions
of Lorem Ipsum. Why do we use it? It is a long established fact that a
reader will be distracted by the readable content of a page when looking
at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using
'Content here, content here', making it look like readable English. Many
desktop publishing packages and web page editors now use Lorem Ipsum as
their default model text, and a search for 'lorem ipsum' will uncover
many web sites still in their infancy. Various versions have evolved
over the years, sometimes by accident, sometimes on purpose (injected
humour and the like).`,
  },
];

export function getUserData() {
  return userData;
}

export function setUserData(name, email, password) {
  const data = {
    id: userData[0].id + 1,
    name,
    email,
    password,
    joinedOn: new Date(),
    avatar: "/avatar.png",
  };
  userData = [data, ...userData];
  return data;
}

export function getPosts() {
  return post;
}

export function addPost(user, content) {
  const data = { id: post[0].id + 1, user, date: new Date(), content };
  post = [data, ...post];
  return data;
}

export function deleteUser(userId) {
  userData = userData.filter((ele) => ele.id !== userId);
  post = post.filter((ele) => ele.user.id !== userId);
}

export function editName(userId, userName) {
  userData.map((ele) => {
    if (ele.id === userId) {
      ele.name = userName;
    }
  });

  post.map((ele) => {
    if (ele.user.id === userId) {
      ele.user.name = userName;
    }
  });
}

export function deletePost(postId) {
  post = post.filter((ele) => ele.id !== postId);
  return post;
}
