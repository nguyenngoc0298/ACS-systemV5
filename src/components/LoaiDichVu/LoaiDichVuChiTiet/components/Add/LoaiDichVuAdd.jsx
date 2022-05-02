import { Button, Input, Select } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../../utils/constant";
import img1 from "./img/midu.jpg";
import "./LoaiDichVuAdd.scss";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const LoaiDichVuAdd = () => {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [file, setFile] = useState();

  const history = useHistory();

  function save() {
    if (!name) {
      alert("Chưa nhập tên dịch vụ");
      return;
    }
    if (!content) {
      alert("Chưa nhập nội dung");
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
        url: `${ROUTE.MAIN_URL}/service-type?content=${content}&name=${name}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/loai-dich-vu");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="title-table">Thêm loại dịch vụ</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td width="20%">Tên loại dịch vụ</td>
                <td>
                  <Input
                    onChange={(dom) => setName(dom.target.value)}
                    placeholder="Nhập tên loại dịch vụ"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td width="20%">Nội dung</td>
                <td>
                  <Input
                    onChange={(dom) => setContent(dom.target.value)}
                    placeholder="Nhập nội dung"
                  />{" "}
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
              <Link to="/loai-dich-vu">
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
