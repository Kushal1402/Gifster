import { lazy } from "react";
import { createBrowserRouter } from 'react-router-dom';

// Project imports
import AppLayout from "../layouts/app-layout";

const Home = lazy(() => import('../pages/home'));
const SearchPage = lazy(() => import("../pages/search"));
const Category = lazy(() => import("../pages/category"));
const GifPage = lazy(() => import("../pages/single-gif"));

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
                {
                    path: "/:type/:slug",
                    element: <GifPage />,
                },
            ],
        },
    ],
    {
        basename: '/Gifster',
    }
);

export default Router;