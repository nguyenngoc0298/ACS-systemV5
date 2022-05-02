import { Button, Input, Select } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../utils/constant";
import "./ChiNhanhAdd.scss";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const ChiNhanhAdd = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [cityName, setCityName] = useState();
  const [cityNameSelected, setCityNameSelected] = useState();
  const [cityNameAddress, setCityNameAddress] = useState();
  const [districtNameAddress, setDistrictNameAddress] = useState();
  const [wardNameAddress, setWardNameAddress] = useState();
  const [districtName, setDistrictName] = useState();
  const [districtNameSelected, setDistrictNameSelected] = useState();
  const [wardName, setWardName] = useState();
  const [wardNameSelected, setWardNameSelected] = useState();
  const history = useHistory();

  function save() {
    axios
      .post(
        `${ROUTE.MAIN_URL}/agency/createAgency?address=${
          address +
          ", " +
          wardNameAddress[0]?.name +
          ", " +
          districtNameAddress[0]?.name +
          ", " +
          cityNameAddress[0]?.name
        }&name=${name}&phone=${phone}&status=${status}&updated_by=1&ward_id=${wardNameSelected}`
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
      .get(`${ROUTE.MAIN_URL}/city/all`)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data.data.filter(
            (item) => item.id === cityNameSelected
          );
          setCityNameAddress(item);
          setCityName(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  // tp hcm // ha noi

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/district/${cityNameSelected}`)
      .then((res) => {
        if (res.status === 200) {
          setDistrictName(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [cityNameSelected]);

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/district/all`)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data.data.filter(
            (item) => item.id === districtNameSelected
          );
          setDistrictNameAddress(item);
        }
      })
      .catch((error) => console.log(error));
  }, [districtNameSelected]);

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/ward/${districtNameSelected}`)
      .then((res) => {
        if (res.status === 200) {
          setWardName(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [districtNameSelected]);

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/ward/all`)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data.data.filter(
            (item) => item.id === wardNameSelected
          );
          setWardNameAddress(item);
        }
      })
      .catch((error) => console.log(error));
  }, [wardNameSelected]);

  // console.log("TP: ", cityNameAddress[0].name);
  // console.log("quận: ", districtNameAddress[0].name);
  // console.log("phường: ", wardNameAddress[0].name);

  return (
    <>
      <div className="title-table">Thêm chi nhánh</div>
      <div className="boxEdit">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td width="20%">Tên chi nhánh</td>
                <td>
                  <Input
                    onChange={(dom) => setName(dom.target.value)}
                    placeholder="Nhập tên chi nhánh"
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
                    placeholder="Nhập địa chỉ"
                  />
                </td>
              </tr>

              <tr>
                <td width="20%">Khu vực</td>
                <td>
                  <Select
                    placeholder="Chọn Tỉnh/Thành Phố"
                    style={{ width: 200 }}
                    onChange={(dom) => setCityNameSelected(dom)}
                  >
                    {cityName?.map((item) => (
                      <Option value={item?.id}>{item?.name}</Option>
                    ))}
                  </Select>
                </td>
                <td>
                  <Select
                    placeholder="Chọn Quận/Huyện"
                    style={{ width: 200 }}
                    onChange={(dom) => setDistrictNameSelected(dom)}
                  >
                    {districtName?.map((item) => (
                      <Option value={item?.id}>{item?.name}</Option>
                    ))}
                  </Select>
                </td>
                <td>
                  <Select
                    placeholder="Chọn Phường/Xã"
                    style={{ width: 200 }}
                    onChange={(dom) => setWardNameSelected(dom)}
                  >
                    {wardName?.map((item) => (
                      <Option value={item?.id}>{item?.name}</Option>
                    ))}
                  </Select>
                </td>
              </tr>

              <tr>
                <td width="20%">Trạng thái</td>
                <td>
                  <Select
                    defaultValue="1"
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
