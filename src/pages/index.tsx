import { Router } from "next/router";
import React, { useEffect } from "react";
import { Login } from "../components/User/Login";

//use this command to fix "error:0308010C:digital envelope routines::unsupported":
//export NODE_OPTIONS=--openssl-legacy-provider

function Home() {
  useEffect(() => {
    const loggedInLocalStorage = localStorage.getItem("logged_in");
    if (loggedInLocalStorage) Router.push("/dashboard");
  }, []);

  return <Login />;
}

export default Home;
