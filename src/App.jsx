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
import BuyFromPlotPage from './pages/BuyFromPlotPage/BuyFromPlotPage';
import Navbar from './components/Navbar/Navbar';

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
        <Navbar/>
          <Register />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
        <Navbar/>
          <Dashboard />
        </>
      ),
    },
    {
      path: "/plots",
      element: (
        <>
        <Navbar/>
          <Plots />
        </>
      ),
    },
    {
      path: "/sellings/:sid",
      element: (
        <>
        <Navbar/>
          <SellingsPage />
        </>
      ),
    },
    {
      path: "/holdings/:hid",
      element: (
        <>
        <Navbar/>
          <Holdings />
        </>
      ),
    },
    {
      path: "/buyfrom/:pid",
      element: (
        <>
        <Navbar/>
          <BuyFromPlotPage />
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
