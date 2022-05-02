import { Button, Input, Select } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../utils/constant";
import img1 from "./img/midu.jpg";
import "./NhanVienAdd.scss";
import useToken from "../../../../useToken";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const NhanVienAdd = () => {
  const [fullName, setFullName] = useState();
  const [userId, setUserId] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [agency, setAgency] = useState();
  const [agencySelected, setAgencySelected] = useState();
  const [birthday, setBirthday] = useState();
  const [file, setFile] = useState();
  const { agencyId } = useToken();
  const history = useHistory();

  function save() {
    if (agencyId() !== null) {
      setAgencySelected(agencyId());
    }

    if (!fullName) {
      alert("Chưa nhập tên nhân viên");
      return;
    }

    if (!birthday) {
      alert("Chưa nhập ngày sinh");
      return;
    }
    if (!phone) {
      alert("Chưa nhập số điện thoại");
      return;
    }
    if (!address) {
      alert("Chưa nhập địa chỉ");
      return;
    }
    if (!email) {
      alert("Chưa nhập mail");
      return;
    }
    if (!file) {
      alert("Chưa chọn hình ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      axios({
        method: "post",
        url: `${ROUTE.MAIN_URL}/user/${
          agencyId() === null ? "manager" : "staff"
        }?address=${address}&agencyId=${agencySelected}&birthday=${birthday}&email=${email}&fullName=${fullName}&phone=${phone}&roleId=3&userId=${userId}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/nhan-vien");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/agency/all`)
      .then((res) => {
        if (res.status === 200) {
          setAgency(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/agency/${agencyId()}`)
      .then((res) => {
        if (res.status === 200) {
          setUserId(res.data.data.manager_id);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="title-table">Thêm nhân viên</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td width="20%">Tên Nhân Viên</td>
                <td>
                  <Input
                    onChange={(dom) => setFullName(dom.target.value)}
                    placeholder="Nhập tên nhân viên"
                  />{" "}
                </td>
              </tr>
              <tr>
                {agencyId() === null ? (
                  <>
                    <td width="20%">Chi Nhánh</td>
                    <td>
                      <Select
                        placeholder="Chọn chi nhánh"
                        style={{ width: 160 }}
                        onChange={(dom) => setAgencySelected(dom)}
                      >
                        {agency?.map((item) => (
                          <Option value={item?.id}>{item?.name}</Option>
                        ))}
                      </Select>
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>

              <tr>
                <td width="20%">Ngày Sinh</td>
                <td>
                  <Input
                    type="date"
                    onChange={(dom) => setBirthday(dom.target.value)}
                    placeholder="Nhập ngày sinh"
                  />
                </td>
              </tr>
              <tr>
                <td width="20%">Số điện thoại</td>
                <td>
                  <Input
                    onChange={(dom) => setPhone(dom.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </td>
              </tr>
              <tr>
                <td width="20%">Địa chỉ</td>
                <td>
                  <Input
                    onChange={(dom) => setAddress(dom.target.value)}
                    placeholder="Địa chỉ"
                  />
                </td>
              </tr>
              <tr>
                <td width="20%">Mail</td>
                <td>
                  <Input
                    type="email"
                    onChange={(dom) => setEmail(dom.target.value)}
                    placeholder="Nhập Email"
                  />
                </td>
              </tr>

              <tr>
                <td>Hình ảnh</td>
                <td>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    onChange={(dom) => setFile(dom.target.files[0])}
                    className="inputfile"
                  />
                </td>
              </tr>
            </tbody>
            <div className="btn-xacnhan">
              <Link to="/nhan-vien">
                <Button type="danger">Đóng</Button>
              </Link>

              <Button type="primary" onClick={() => save()}>
                Lưu
              </Button>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};
