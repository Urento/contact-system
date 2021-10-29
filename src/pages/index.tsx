/**
 * This is just a little welcome page, and can safely be ignored.
 * The important pages start here: `/pages/posts/index.tsx`
 */

import React from "react";
import { Login } from "../components/User/Login";

//use this command to fix "error:0308010C:digital envelope routines::unsupported":
//export NODE_OPTIONS=--openssl-legacy-provider

function Home() {
  return <Login />;
}

export default Home;
