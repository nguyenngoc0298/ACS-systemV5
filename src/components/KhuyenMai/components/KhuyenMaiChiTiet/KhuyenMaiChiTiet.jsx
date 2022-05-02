import { Button, Modal, Select, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import "./KhuyenMaiChiTiet.scss";
import img1 from "./img/midu.jpg";
import { useParams } from "react-router-dom";
import { ROUTE } from "../../../../utils/constant";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useToken from "../../../../useToken";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export const KhuyenMaiChiTiet = () => {
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
  const { agencyId } = useToken();

  // lấy id của chi tiết loại dịch vụ
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/promotion/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDetail(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [detail, reload]);

  function sua() {
    if (!(title ?? detail?.title)) {
      alert("Chưa nhập tên khuyến mãi");
      return;
    }
    if (!(description ?? detail?.description)) {
      alert("Chưa nhập nội dung");
      return;
    }
    if (!(discount ?? detail?.discount)) {
      alert("Chưa nhập giảm giá");
      return;
    }
    if ((discount ?? detail?.discount) < 0) {
      alert("Giảm giá phải lớn hơn 0");
      return;
    }
    if (!(start_date ?? detail?.start_date)) {
      alert("Chưa chon ngày bắt đầu");
      return;
    }
    if (!(end_date ?? detail?.end_date)) {
      alert("Chưa chon ngày kết thúc");
      return;
    }
    if (!(status ?? detail?.status)) {
      alert("Chưa chon trạng thái hoạt động");
      return;
    }
    axios
      .put(
        `${ROUTE.MAIN_URL}/promotion/update/${id}?description=${
          description ?? detail?.description
        }&discount=${discount ?? detail?.discount}&end_date=${
          end_date ?? detail?.end_date
        }&start_date=${start_date ?? detail?.start_date}&status=${
          status ?? detail?.status
        }&title=${title ?? detail?.title}`
      )
      .then((res) => {
        console.log(res?.data?.success);
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/khuyen-mai");
        }
      })
      .catch((error) => console.log(error));
  }

  function getStatusName(status) {
    switch (status) {
      case 1:
        return <Space style={{ color: "red" }}>Dừng hoạt động</Space>;
      case 2:
        return <Space style={{ color: "green" }}>Hoạt động</Space>;
      default:
        break;
    }
  }

  return (
    <>
      <div className="title-table">Chi tiết khuyến mãi</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Tên khuyến mãi</td>
                  <td>{title ?? detail?.title}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Tên khuyến mãi</td>
                  <td>
                    {" "}
                    <Input
                      value={title ?? detail?.title}
                      onChange={(dom) => setTitle(dom?.target.value)}
                    />
                  </td>
                </tr>
              )}

              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Nội dung</td>
                  <td>{description ?? detail?.description}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Nội dung</td>
                  <td>
                    <Input
                      value={description ?? detail?.description}
                      onChange={(dom) => setDescription(dom?.target.value)}
                    />
                  </td>
                </tr>
              )}

              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Giảm giá (%)</td>
                  <td>{discount ?? parseFloat(detail?.discount) * 100}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Giảm giá (%)</td>
                  <td>
                    <Input
                      type="number"
                      value={discount ?? parseFloat(detail?.discount) * 100}
                      onChange={(dom) => setDiscount(dom?.target.value)}
                    />
                  </td>
                </tr>
              )}

              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Ngày bắt đầu</td>
                  <td>{detail?.start_date.split(" ")[0]}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Ngày bắt đầu</td>
                  <td>
                    <Input
                      type="date"
                      value={start_date ?? detail?.start_date.split(" ")[0]}
                      onChange={(dom) => setStart_date(dom?.target.value)}
                    />
                  </td>
                </tr>
              )}

              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Ngày kết thúc</td>
                  <td>{detail?.end_date.split(" ")[0]}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Ngày kết thúc</td>
                  <td>
                    <Input
                      type="date"
                      value={end_date ?? detail?.end_date.split(" ")[0]}
                      onChange={(dom) => setEnd_date(dom?.target.value)}
                    />
                  </td>
                </tr>
              )}

              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Trạng thái</td>
                  <td>{getStatusName(detail?.status)}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Trạng thái</td>
                  <td>
                    <Select
                      placeholder={getStatusName(detail?.status)}
                      // value={getStatusName(status ?? detail?.status)}
                      style={{ width: 160 }}
                      onChange={(dom) => setStatus(dom)}
                    >
                      <Option value="1">Dừng hoạt động</Option>
                      <Option value="2">Hoạt động </Option>
                    </Select>
                  </td>
                </tr>
              )}
            </tbody>
            <div className="btn-xacnhan">
              <Button type="danger">
                <Link to={`/khuyen-mai`}>Đóng</Link>
              </Button>
              {agencyId() === null ? (
                <Button type="primary" onClick={() => sua()}>
                  Lưu
                </Button>
              ) : (
                ""
              )}
            </div>
          </table>
        </div>
      </div>
    </>
  );
};
