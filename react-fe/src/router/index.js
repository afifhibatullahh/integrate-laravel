import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Posts from "../views/posts";
import DetailPost from "../views/posts/detail";
import EditPost from "../views/posts/edit";
import AddPost from "../views/posts/add";
import MainLayout from "../layout/MainLayout";
import Login from "../views/authentication/Login";
import AuthGuard from "../guard/AuthGuard";
import Users from "../views/users";
import AddUser from "../views/users/add";
import DetailUser from "../views/users/detail";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
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
            element: <AddPost />,
          },
          {
            path: "edit/:id",
            element: <EditPost />,
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
];

export const router = createBrowserRouter(routes);
