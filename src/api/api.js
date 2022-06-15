import Axios from "axios";

import { getUserEmail, getToken } from "../utils/verifyUser";

const API = Axios.create({ baseURL: REACT_APP_PORT });

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Extension ${process.env.REACT_APP_SECRET_KEY}`;
  req.headers.Email = localStorage.getItem("email");

  return req;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      location.href = "/popup.html";
    }

    return Promise.reject(err);
  }
);

export const getUserInfo = async () => {
  const token = await getToken();
  const email = await getUserEmail();

  localStorage.setItem("email", email);

  return API.get("/");
};

export const getGroupInfo = async (groupId) => {
  return API.get(`/groups/${groupId}`);
};

export const createTodo = async (data) => {
  return API.post("/users/todos", { ...data });
};

export const updateTodo = async (todoId, data) => {
  return API.patch(`/users/todos/${todoId}`, { ...data });
};

export const deleteTodo = async (todoId) => {
  return API.delete(`/users/todos/${todoId}`);
};

export const createGroup = async (data) => {
  return API.post("/groups", { ...data });
};

export const updateGroup = async (groupId, data) => {
  return API.patch(`/groups/${groupId}`, { ...data });
};

export const deleteGroup = async (groupId) => {
  return API.delete(`/groups/${groupId}`);
};

export const createGroupTodo = async (groupId, data) => {
  return API.post(`/groups/${groupId}/todos`, { ...data });
};

export const updateGroupTodo = async (groupId, todoId, data) => {
  return API.patch(`/groups/${groupId}/todos/${todoId}`, { ...data });
};

export const deleteGroupTodo = async (groupId, todoId) => {
  return API.delete(`/groups/${groupId}/todos/${todoId}`);
};
