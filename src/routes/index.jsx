import { lazy } from "react";
import { createBrowserRouter } from 'react-router-dom';

// Project imports
import AppLayout from "../layouts/app-layout";

const Home = lazy(() => import('../pages/home'));
const SearchPage = lazy(() => import("../pages/search"));
const Category = lazy(() => import("../pages/category"));

const Router = createBrowserRouter(
    [
        {
            element: <AppLayout />,

            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/:category",
                    element: <Category />,
                },
                {
                    path: "/search/:query",
                    element: <SearchPage />,
                },
            ],
        },
    ],
    {
        basename: '/GIF-Search-V2',
    }
);

export default Router;