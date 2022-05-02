import React, { useState } from "react";
import "./Login.scss";
import PropTypes from "prop-types";
import { ROUTE } from "../../utils/constant";
import { Button, Input, Space } from "antd";

async function loginUser(credentials) {
  return fetch(`${ROUTE.MAIN_URL}/user/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    if (token.success === true) {
      if (token.data === 1) {
        setToken(token.data);
        localStorage.setItem("name", JSON.stringify("ADMIN"));
      } else {
        setToken(token.data.roleId);
        localStorage.setItem("name", JSON.stringify(token.data.fullName));
        localStorage.setItem("agencyId", JSON.stringify(token.data.agencyId));
      }
    } else {
      alert("sai Tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="form-bg">
      <div className="form-box">
        <h1 style={{color: "#F5F0F0"}}>Đăng Nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="div1">
            <label>
              <b style={{color: "#F5F0F0"}}>Tên tài khoản</b><br/>
              <Input
                className="ipbox"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              /><br/>
            </label>
          </div>
          <div className="div1">
            <label>
              <b style={{color: "#F5F0F0"}}>Mật khẩu</b><br/>
              <Input
                className="ipbox"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              /><br/>
            </label>
          </div>
          <br/>
          <div >
            <button
            
              className="btnSub"
              type="submit"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
