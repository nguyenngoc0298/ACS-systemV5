import React from "react";
import "./Header.scss";
import avt from "./img/avt.png";
import useToken from "../../../useToken";
import { Button } from "antd";
export const Header = () => {
  const { token, getName } = useToken();
  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="headerWrapper">
      <div className="title"></div>
      {/* <div className="searchBox">
        <input type="text" placeholder="Tìm Kiếm" />
      </div> */}
      <div className="boxAvt">
        <img src={avt} alt="" />
        <div className="text">
          {token === 1 ? "" : getName()}
          <span style={{color: "red"}}>{token === 1 ? "ADMIN" : "MANAGER"}</span>
          <Button
            style={{
              background: "#5899BA",
              color: "white",
              margin: "0 auto",
            }}
            shape="round"
            size="small"
            onClick={() => logout()}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};
