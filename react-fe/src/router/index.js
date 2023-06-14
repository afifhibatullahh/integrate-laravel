import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Posts from "../views/posts";
import DetailPost from "../views/posts/detail";
import MainLayout from "../layout/MainLayout";
import Login from "../views/authentication/Login";
import AuthGuard from "../guard/AuthGuard";
import Users from "../views/users";
import AddUser from "../views/users/add";
import DetailUser from "../views/users/detail";
import ListUsersGithub from "../views/list-profile-github";
import MainGuard from "../guard/MainGuard";
import FormPost from "../views/posts/form";

const routes = [
  {
    path: "/",
    element: (
      <MainGuard>
        <MainLayout />
      </MainGuard>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "posts",
        children: [
          {
            path: "",
            element: <Posts />,
          },
          {
            path: "add",
            element: <FormPost />,
          },
          {
            path: "edit/:id",
            element: <FormPost />,
          },
          {
            path: ":id",
            element: <DetailPost />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <Users />,
          },
          {
            path: "add",
            element: <AddUser />,
          },
          {
            path: ":id",
            element: <DetailUser />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: "/list-user-github",
    element: <ListUsersGithub />,
  },
];

export const router = createBrowserRouter(routes);
