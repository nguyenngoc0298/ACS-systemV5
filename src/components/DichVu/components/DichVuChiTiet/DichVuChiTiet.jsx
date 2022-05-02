import { Button, Modal, Select, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import "./DichVuChiTiet.scss";
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

export const DichVuChiTiet = () => {
  const [detail, setDetail] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [serviceId, setServiceId] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState("3");
  const [reload, setReload] = useState(0);
  const { agencyId } = useToken();

  // lấy id của chi tiết loại dịch vụ
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/service/${id}`)
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
    if (!(description ?? detail?.description)) {
      alert("Chưa nhập mô tả");
      return;
    }
    if (!(price ?? detail?.price)) {
      alert("Chưa nhập giá");
      return;
    }
    if ((price ?? detail?.price) < 0) {
      alert("Giá phải lớn hơn 0");
      return;
    }
    if (!(status ?? detail?.status)) {
      alert("Chưa chọn trạng thái hoạt động");
      return;
    }
    axios
      .put(
        `${ROUTE.MAIN_URL}/service/update/${id}?description=${
          description ?? detail?.description
        }&name=${name ?? detail?.name}&price=${price ?? detail?.price}&status=${
          status ?? detail?.status
        }`
      )
      .then((res) => {
        console.log(res?.data?.success);
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/dich-vu");
        }
      })
      .catch((error) => console.log(error));
  }

  // function isActiveLDV(dom){

  //   if(dom == 2){ // dừng hoạt động
  //     axios.patch(`${ROUTE.MAIN_URL}/service-type/${id}/de-active`)
  //       .then(res => {
  //        setCurrentStatus(dom)
  //        setReload(1);
  //       })
  //       .catch(error => console.log(error));
  //   }else{
  //     axios.patch(`${ROUTE.MAIN_URL}/service-type/${id}/active`)
  //       .then(res => {
  //         setCurrentStatus(dom)
  //         setReload(1);
  //       })
  //       .catch(error => console.log(error));
  //   }

  // }

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

  console.log(currentStatus);
  // const num = (detail?.status);
  // const str = num.toString(); //> type string "123"
  return (
    <>
      <div className="title-table">Chi tiết dịch vụ</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Tên dịch vụ</td>
                  <td>{name ?? detail?.name}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Tên dịch vụ</td>
                  <td>
                    {" "}
                    <Input
                      value={name ?? detail?.name}
                      onChange={(dom) => setName(dom?.target.value)}
                    />
                  </td>
                </tr>
              )}

              {agencyId() !== null ? (
                <tr>
                  <td width="20%">Mô tả</td>
                  <td>{description ?? detail?.description}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Mô tả</td>
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
                  <td width="20%">Giá (đồng)</td>
                  <td>{price ?? detail?.price}</td>
                </tr>
              ) : (
                <tr>
                  <td width="20%">Giá (đồng)</td>
                  <td>
                    <Input
                      type="number"
                      value={price ?? detail?.price}
                      onChange={(dom) => setPrice(dom?.target.value)}
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
                <Link to={`/dich-vu`}>Đóng</Link>
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
