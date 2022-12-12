import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Protected(props: any) {
  const { Component } = props;
  const navigate = useNavigate();
  //const user = localStorage.getItem("user");
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.username) {
      navigate("/");
    }
  }, [user]);
  return <Component />;
}
