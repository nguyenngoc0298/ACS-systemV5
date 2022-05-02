import { Button, Modal, Select, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import "./ChiNhanhChiTiet.scss";
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

export const ChiNhanhChiTiet = () => {
  const [detail, setDetail] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [ward_id, setWard_id] = useState();
  const [phone, setPhone] = useState();
  const [manager_id, setManager_id] = useState();
  const [rating, setRating] = useState();
  const [status, setStatus] = useState();
  const [created_date, setCreated_date] = useState();
  const [updated_by, setUpdated_by] = useState();
  const [wardName, setWardName] = useState();
  const [manager, setManager] = useState();
  const [managerSelected, setManagerSelected] = useState();
  const [wardNameSelected, setWardNameSelected] = useState();
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState("3");
  const [reload, setReload] = useState(0);
  const { agencyId } = useToken();

  // lấy id của chi tiết loại dịch vụ
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/agency/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDetail(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [detail, reload]);

  function sua() {
    axios
      .put(
        `${ROUTE.MAIN_URL}/agency/update/${id}/admin?address=${
          address ?? detail?.address
        }&manager_id=${managerSelected ?? detail?.manager_id}&name=${
          name ?? detail?.name
        }&phone=${phone ?? detail?.phone}&status=${
          status ?? detail?.status
        }&updated_by=1&ward_id=${ward_id ?? detail.ward_id}`
      )
      .then((res) => {
        console.log(res?.data?.success);
        if (res?.status === 200 && res?.data?.success === true) {
          history.push("/chi-nhanh");
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/ward/all`)
      .then((res) => {
        if (res.status === 200) {
          setWardName(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/staff/all`)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data.data.filter((item) => item.roleId === 2 && item.agencyId === 0);
          setManager(item);
        }
      })
      .catch((error) => console.log(error));
  }, [refreshKey]);

  function getStatusName(status) {
    switch (status) {
      case 1:
        return "Dừng hoạt động";
      case 2:
        return "Hoạt động";
      default:
        break;
    }
  }

  return (
    <>
      <div className="title-table">Chi tiết chi nhánh</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td width="20%">Tên chi nhánh</td>
                <td>
                  {" "}
                  <Input
                    value={name ?? detail?.name}
                    onChange={(dom) => setName(dom?.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td width="20%">Địa chỉ</td>
                <td>
                  <Input
                    value={address ?? detail?.address}
                    onChange={(dom) => setAddress(dom?.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td width="20%">Số điện thoại</td>
                <td>
                  <Input
                    value={phone ?? detail?.phone}
                    onChange={(dom) => setPhone(dom?.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td width="20%">Ngày tạo</td>
                <td>
                  {agencyId() === null ? (
                    <Input
                      value={created_date ?? detail?.created_date.split(" ")[0]}
                      onChange={(dom) => setCreated_date(dom?.target.value)}
                    />
                  ) : (
                    <>{detail?.created_date.split(" ")[0]} </>
                  )}
                </td>
              </tr>

              <tr>
                <td width="20%">Tên quản lý</td>
                <td>
                  {agencyId() === null ? (
                    <Select
                      value={
                        detail?.manager_id === 0
                          ? "Chọn quản lý"
                          : manager_id ?? detail?.manager_id
                      }
                      style={{ width: 180 }}
                      onChange={(dom) => setManagerSelected(dom)}
                    >
                      {manager?.map((item) => (
                        <Option value={item?.id}>{item?.fullName}</Option>
                      ))}
                    </Select>
                  ) : (
                    <Select
                      disabled
                      value={
                        detail?.manager_id === 0
                          ? "Chọn quản lý"
                          : manager_id ?? detail?.manager_id
                      }
                      style={{ width: 180 }}
                      onChange={(dom) => setManagerSelected(dom)}
                    >
                      {manager?.map((item) => (
                        <Option value={item?.id}>{item?.fullName}</Option>
                      ))}
                    </Select>
                  )}
                </td>
              </tr>

              <tr>
                <td width="20%">Trạng thái</td>
                <td>
                  <Select
                    value={getStatusName(status ?? detail?.status)}
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
              <Button type="danger">
                <Link to={`/chi-nhanh`}>Đóng</Link>
              </Button>
              <Button type="primary" onClick={() => sua()}>
                Lưu
              </Button>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};
