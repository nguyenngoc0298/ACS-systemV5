import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import "./NhanVien.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { ROUTE } from "../../utils/constant";
import useToken from "../../useToken";

export const NhanVien = () => {
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();
  const [reload, setReload] = useState(0);

  // hàm lấy tất cả cơ sở
  useEffect(() => {
    let url = ``;
    if (agencyId()) {
      url = `${ROUTE.MAIN_URL}/staff/agency/${agencyId()}`;
    } else {
      url = `https://acsproject.azurewebsites.net/staff/all`;
    }

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [refreshKey]);

  function isSearchValue(dom) {
    if (dom) {
      axios
        .get(`${ROUTE.MAIN_URL}/staff/name?value=${dom}`)
        .then((res) => {
          setData(res.data.data);
          setReload(1);
        })
        .catch((error) => console.log(error));
    } else {
      let url = ``;
      if (agencyId()) {
        url = `${ROUTE.MAIN_URL}/staff/agency/${agencyId()}`;
      } else {
        url = `https://acsproject.azurewebsites.net/staff/all`;
      }

      axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data.data);
            setReload(1);
          }
        })
        .catch((error) => console.log(error));
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
        return "Thu ngân";
      case 5:
        return "Khách hàng";
      default:
        break;
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

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Tên Nhân Viên",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/nhan-vien/${record.userId}`}> {record.fullName} </Link>
        </Space>
      ),
    },
    {
      title: "Chức Vụ",
      render: (text, record) => <>{getRoleName(record.roleId)}</>,
    },
    {
      title: "Chi Nhánh",
      dataIndex: "agencyName",
    },
    {
      title: "Trạng thái",
      render: (text, record) => <>{getStatusName(record?.status)}</>,
    },
  ];

  return (
    <>
      <div className="title-table">
        Danh sách nhân viên &nbsp; &nbsp;
        <Button
          style={{ background: "#5899BA", color: "white", margin: "0 auto" }}
          shape="round"
          size="large "
        >
          <Link to={`/nhan-vien/add`}>Thêm nhân viên</Link>
        </Button>
      </div>

      <div className="sBox">
        <input
          className="searchInput"
          placeholder="Tìm kiếm ..."
          type="text"
          onChange={(dom) => isSearchValue(dom.target.value)}
        />
      </div>
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};
