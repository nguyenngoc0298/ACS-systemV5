import { Button, Modal, Select, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import "./LoaiDichVuChiTiet.scss";
import img1 from "./img/midu.jpg";
import { useParams } from "react-router-dom";
import { ROUTE } from "../../../utils/constant";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useToken from "../../../useToken";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export const LoaiDichVuChiTiet = () => {
  const [detail, setDetail] = useState();
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState("3");
  const [reload, setReload] = useState(0);
  const { agencyId } = useToken();

  // lấy id của chi tiết loại dịch vụ
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/service-type/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDetail(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [detail, reload]);

  function sua() {
    if (!(name ?? detail?.name)) {
      alert("Chưa nhập tên dịch vụ");
      return;
    }
    if (!(content ?? detail?.content)) {
      alert("Chưa nhập nội dung");
      return;
    }

    axios
      .patch(
        `${ROUTE.MAIN_URL}/service-type/${id}?content=${
          content ?? detail?.content
        }&name=${name ?? detail?.name}`
      )
      .then((res) => {
        console.log(res?.data?.success);
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/loai-dich-vu");
        }
      })
      .catch((error) => console.log(error));
  }

  function isActiveLDV(dom) {
    if (dom == 2) {
      // dừng hoạt động
      axios
        .patch(`${ROUTE.MAIN_URL}/service-type/${id}/de-active`)
        .then((res) => {
          setCurrentStatus(dom);
          setReload(1);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .patch(`${ROUTE.MAIN_URL}/service-type/${id}/active`)
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
      default:
        break;
    }
  }

  return (
    <>
      <div className="title-table">Chi tiết loại dịch vụ</div>
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
                <td width="20%">Tên loại dịch vụ</td>
                <td>
                  {" "}
                  {agencyId() !== null ? (
                    <>{name ?? detail?.name}</>
                  ) : (
                    <Input
                      value={name ?? detail?.name}
                      onChange={(dom) => setName(dom?.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td width="20%">Nội dung</td>
                <td>
                  {agencyId() !== null ? (
                    <>{content ?? detail?.content}</>
                  ) : (
                    <Input
                      value={content ?? detail?.content}
                      onChange={(dom) => setContent(dom?.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td width="20%">Trạng thái</td>
                <td>
                  {agencyId() !== null ? (
                    <>{getStatusName(detail?.status)}</>
                  ) : (
                    <Select
                      placeholder={getStatusName(detail?.status)}
                      style={{ width: 160 }}
                      onChange={(dom) => isActiveLDV(dom)}
                    >
                      <Option value="2">Dừng hoạt động</Option>
                      <Option value="3">Hoạt động </Option>
                    </Select>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn-xacnhan">
            <Button type="danger">
              <Link to={`/loai-dich-vu`}>Đóng</Link>
            </Button>
            {agencyId() === null ? (
              <Button type="primary" onClick={() => sua()}>
                Lưu
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
