import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UnprotectedRoute from "./UnprotectedRoute.jsx";
import Error from "../pages/Error.jsx"; 
import MainLayout from "../components/layouts/MainLayout.jsx";

const lazyRetry = function (componentImport) {
    return new Promise((resolve, reject) => {
        componentImport()
            .then((component) => {
                resolve(component);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            });
    });
};

const Loading = (
    <div
        style={{
            position:'fixed',
            left:0  ,
            top:0,
            zIndex:999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "var(--primaryColor)",
        }}
    >
        <CircularProgress size={'1.1rem'} color="inherit" />
    </div>
);


// auth pages
const Signin = lazy(() =>
    lazyRetry(() => import("../pages/auth/Login.jsx"))
);



// main pages
const Home = lazy(() =>
    lazyRetry(() => import("../pages/main/Home"))
)






const router = createBrowserRouter([
    {
        path: "auth",
        errorElement:Loading,
        element: <UnprotectedRoute>
            <Suspense fallback={Loading}>
                <Signin />
            </Suspense>
        </UnprotectedRoute>,     
    },
    {
        path: "",
        errorElement: Loading,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={Loading}>
                        <Home />
                    </Suspense>
                )
            },
            // {
            //     path: "settings",
            //     element: (
            //             <Suspense fallback={Loading}>
            //                 <Settings />
            //             </Suspense>
            //     )
            // },
        
           
            {
                path:"*",
                element: (
                    <Suspense fallback={Loading}>
                        <Error />
                    </Suspense>
                )
            }
          
        ]
    },
])

export default router