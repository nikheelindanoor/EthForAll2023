import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import { Auth, useAuth } from "@arcana/auth-react";
import Dashboard from './pages/Dashboard/Dashboard';
import Plots from './pages/Plots/Plots';
import SellingsPage from './pages/SellingsPage/SellingsPage';
import Holdings from './pages/Holdings/Holdings';

const App = () => {
  const auth = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <HomePage />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Dashboard />
        </>
      ),
    },
    {
      path: "/plots",
      element: (
        <>
          <Plots />
        </>
      ),
    },
    {
      path: "/sellings/:sid",
      element: (
        <>
          <SellingsPage />
        </>
      ),
    },
    {
      path: "/holdings/:hid",
      element: (
        <>
          <Holdings />
        </>
      ),
    },
  ]);

  // return (<div>
  //   {auth.loading ? (
  //     "Loading"
  //   ) : auth.isLoggedIn ? (
  //     <p>Logged In</p>
  //   ) : (
  //     <div>
  //       <Auth externalWallet={true} theme={"light"} onLogin={onLogin}/>
  //     </div>
  //   )}
  // </div>);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
