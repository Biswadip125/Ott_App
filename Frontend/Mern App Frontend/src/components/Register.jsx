import React from "react";
import Header from "./Header";
import Login from "./Login";
import HeroForm from "./HeroForm";

const Register = () => {
  return (
    <>
      <Header buttonName={"Sign In"} link={"/"} />
      <HeroForm
        isLogin={false}
        link={"/"}
        apiLink={"register"}
        navigateLink={"/"}
      />
    </>
  );
};

export default Register;
