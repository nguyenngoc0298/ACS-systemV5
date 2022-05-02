import { Button, Input, Select, DatePicker, Space } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../utils/constant";
import img1 from "./img/midu.jpg";
import "./KhuyenMaiAdd.scss";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const KhuyenMaiAdd = () => {
  const [detail, setDetail] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [discount, setDiscount] = useState();
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState("3");
  const [reload, setReload] = useState(0);

  function save() {
    if (!title) {
      alert("Chưa nhập tên khuyến mãi");
      return;
    }
    if (!description) {
      alert("Chưa nhập nội dung");
      return;
    }
    if (!discount) {
      alert("Chưa nhập giảm giá");
      return;
    }
    if (discount < 0) {
      alert("Giảm giá phải lớn hơn 0");
      return;
    }
    if (!start_date) {
      alert("Chưa chon ngày bắt đầu");
      return;
    }
    if (!end_date) {
      alert("Chưa chon ngày kết thúc");
      return;
    }
    if (!status) {
      alert("Chưa chọn trạng thái hoạt động");
      return;
    }

    axios
      .post(
        `${ROUTE.MAIN_URL}/promotion/create?description=${description}&discount=${discountStr}&end_date=${end_date}&start_date=${start_date}&status=${status}&title=${title}`
      )
      .then((res) => {
        console.log(res?.data?.success);
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/khuyen-mai");
        }
      })
      .catch((error) => console.log(error));
  }

  let discountStr = discount / 100;

  function onChange(dom) {
    console.log(dom);
  }

  return (
    <>
      <div className="title-table">Thêm khuyến mãi</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td width="20%">Tên khuyến mãi</td>
                <td>
                  <Input
                    onChange={(dom) => setTitle(dom.target.value)}
                    placeholder="Nhập tên khuyến mãi"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td width="20%">Nội dung</td>
                <td>
                  <Input
                    onChange={(dom) => setDescription(dom.target.value)}
                    placeholder="Nhập nội dung"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td width="20%">Giảm giá (%)</td>
                <td>
                  <Input
                    type="number"
                    onChange={(dom) => setDiscount(dom.target.value)}
                    placeholder="Nhập giảm giá"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td width="20%">Ngày bắt đầu</td>
                <td>
                  <Input
                    type="date"
                    // onChange={(dom) => setStart_date(dom.target.value)}
                    onChange={(dom) => setStart_date(dom.target.value)}
                    placeholder="Nhập ngày bắt đầu"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td width="20%">Ngày kết thúc</td>
                <td>
                  <Input
                    type="date"
                    onChange={(dom) => setEnd_date(dom.target.value)}
                    placeholder="Nhập ngày kết thúc"
                  />{" "}
                </td>
              </tr>

              <tr>
                <td width="20%">Trạng thái</td>
                <td>
                  <Select
                    placeholder="Chon trạng thái"
                    style={{ width: 160 }}
                    onChange={(dom) => setStatus(dom)}
                  >
                    <Option value="1">Dừng hoạt động</Option>
                    <Option value="2">Hoạt động </Option>
                  </Select>
                </td>
              </tr>
            </tbody>
            <div className="btn-xacnhan">
              <Link to="/khuyen-mai">
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
