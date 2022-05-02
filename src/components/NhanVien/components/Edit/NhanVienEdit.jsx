import { Button, Modal, Select, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import "./NhanVienEdit.scss";
import img1 from "./img/midu.jpg";
import { useParams } from "react-router-dom";
import { ROUTE } from "../../../../utils/constant";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export const NhanVienEdit = () => {
  const [detail, setDetail] = useState();
  const [name, setName] = useState();
  const [fullName, setFullName] = useState();
  const [birthday, setBirthday] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [agencyName, setAgencyName] = useState();
  const [roleId, setRoleId] = useState();
  const [content, setContent] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState("3");
  const [reload, setReload] = useState(0);

  // lấy id của chi tiết loại dịch vụ
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/staff/${id}/profile`)
      .then((res) => {
        if (res.status === 200) {
          setDetail(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [detail, reload]);

  function isActiveLDV(dom) {
    if (dom == 2) {
      // dừng hoạt động
      axios
        .patch(`${ROUTE.MAIN_URL}/user/${id}/de-active`)
        .then((res) => {
          setCurrentStatus(dom);
          setReload(1);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .patch(`${ROUTE.MAIN_URL}/user/${id}/active`)
        .then((res) => {
          setCurrentStatus(dom);
          setReload(1);
        })
        .catch((error) => console.log(error));
    }
  }

  function getStatusName(status) {
    switch (status) {
      case 1:
        return <Space style={{ color: "red" }}>Đã xóa</Space>;
      case 2:
        return <Space style={{ color: "red" }}>Dừng hoạt động</Space>;
      case 3:
        return <Space style={{ color: "green" }}>Hoạt động</Space>;
      // case 1:
      //   return <Space style={{color: "red"}}>Đã xóa</Space>;
      // case 2:
      //   return <Space style={{color: "red"}}>Dừng hoạt động</Space>;
      // case 3:
      //   return <Space style={{color: "green"}}>Hoạt động</Space>;
      default:
        break;
    }
  }

  function getRoleName(roleId) {
    switch (roleId) {
      case 1:
        return "Quản trị viên";
      case 2:
        return "Quản lý";
      case 3:
        return "Nhân viên kỹ thuật";
      case 4:
        return "Nhân viên thu ngân";
      case 5:
        return "Khách hàng";
      // case 1:
      //   return <Space style={{color: "red"}}>Đã xóa</Space>;
      // case 2:
      //   return <Space style={{color: "red"}}>Dừng hoạt động</Space>;
      // case 3:
      //   return <Space style={{color: "green"}}>Hoạt động</Space>;
      default:
        break;
    }
  }

  // const num = (detail?.status);
  // const str = num.toString(); //> type string "123"
  return (
    <>
      <div className="title-table">Chi tiết nhân viên</div>
      <div className="boxEdit">
        {detail?.imageUrl == null ? (
          <div className="img"></div>
        ) : (
          <div className="img">
            <img
              width="300"
              height="300"
              src={detail?.imageUrl ?? "No image"}
            ></img>
          </div>
        )}

        <div className="table">
          <table>
            <tbody>
              <tr>
                <td width="20%">Tên nhân viên</td>
                <td>{fullName ?? detail?.fullName}</td>
              </tr>
              <tr>
                <td width="20%">Ngày sinh</td>
                <td>{birthday ?? detail?.birthday.split(" ")[0]}</td>
              </tr>
              <tr>
                <td width="20%">Số điện thoại</td>
                <td>{phone ?? detail?.phone}</td>
              </tr>
              <tr>
                <td width="20%">Địa chỉ</td>
                <td>{address ?? detail?.address}</td>
              </tr>
              <tr>
                <td width="20%">Mail</td>
                <td>{email ?? detail?.email}</td>
              </tr>
              <tr>
                <td width="20%">Chi nhánh</td>
                <td>{agencyName ?? detail?.agencyName}</td>
              </tr>
              <tr>
                <td width="20%">Chức vụ</td>
                <td>{getRoleName(roleId) ?? getRoleName(detail?.roleId)}</td>
              </tr>
              <tr>
                <td width="20%">Trạng thái</td>
                <td>
                  <Select
                    placeholder={getStatusName(status ?? detail?.status)}
                    style={{ width: 160 }}
                    onChange={(dom) => isActiveLDV(dom)}
                  >
                    <Option value="2">Dừng hoạt động</Option>
                    <Option value="3">Hoạt động </Option>
                  </Select>
                </td>
              </tr>
            </tbody>
            <div className="btn-xacnhan">
              <Button type="danger">
                <Link to={`/nhan-vien`}>Đóng</Link>
              </Button>
              <Button type="primary">
                <Link to={`/nhan-vien`}>Lưu</Link>
              </Button>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};
