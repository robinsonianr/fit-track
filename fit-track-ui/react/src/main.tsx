import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import {RouterProvider} from "react-router-dom";

import {router} from "./App";
import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "./context/theme-context";
import { Toaster } from "sonner"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router}/>
                <Toaster richColors position="top-right"
                         expand                    // don't collapse
                         closeButton               // adds an X to
                         duration={4000}           // default 4s
                         toastOptions={{
                             style: {
                                 padding: '16px 20px',
                                 fontSize: '1rem',
                                 minWidth: '360px',    // default ~
                                 minHeight: '64px',
                             },
                             className: 'font-medium',
                         }}
                />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);


