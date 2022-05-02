import { Table, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LichHenLichSu.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../utils/constant";
import useToken from "../../../../useToken";

export const LichHenHuy = () => {
  const [data, setData] = useState();
  const { agencyId } = useToken();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let url = ``;
    if (agencyId()) {
      url = `${ROUTE.MAIN_URL}/appointment/${agencyId()}/agency`;
    } else {
      url = `https://acsproject.azurewebsites.net/appointment/all`;
    }

    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data.data.filter((item) => item.status === 1);
          setData(item.sort((a, b) => b.id - a.id));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function isSearchValue(dom) {
    if (dom) {
      axios
        .get(`${ROUTE.MAIN_URL}/appointment/name?value=${dom}`)
        .then((res) => {
          setData(res.data.data);
          setReload(1);
        })
        .catch((error) => console.log(error));
    } else {
      let url = ``;
      if (agencyId()) {
        url = `${ROUTE.MAIN_URL}/appointment/${agencyId()}/agency`;
      } else {
        url = `https://acsproject.azurewebsites.net/appointment/all`;
      }

      axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            const item = res.data.data.filter((item) => item.status === 1);
            setData(item.sort((a, b) => b.id - a.id));
          }
        })
        .catch((error) => console.log(error));
    }
  }

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Tên Khách Hàng",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/lich-hen/${record.id}`}> {record.full_name} </Link>
        </Space>
      ),
    },
    {
      title: "Ngày sửa chữa",
      render: (text, record) => <>{record?.date.split(" ")[0]}</>,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (text, record) => <>{getStatusName(record.status)}</>,
    },
  ];

  function getStatusName(status) {
    switch (status) {
      case 1:
        return <Space style={{ color: "#c82333" }}>Từ chối</Space>;
      case 2:
        return <Space style={{ color: "#28a745" }}>Đã xác nhận</Space>;
      case 4:
        return <Space style={{ color: "#5899BA" }}>Đã hoàn tất</Space>;
      default:
        break;
    }
  }

  return (
    <>
      <div className="title-table">
        Danh sách lịch hẹn &nbsp;&nbsp;
        <Button
          style={{ background: "orange", color: "white", margin: "0 auto" }}
          shape="round"
          size="large "
        >
          <Link to={`/lich-hen`}>Đang chờ</Link>
        </Button>
        &nbsp;&nbsp;
        <Button
          style={{ background: "green", color: "white", margin: "0 auto" }}
          shape="round"
          size="large "
        >
          <Link to={`/lich-hen/lich-su`}>Đã xác nhận</Link>
        </Button>
        &nbsp;&nbsp;
        <Button
          style={{ background: "red", color: "white", margin: "0 auto" }}
          shape="round"
          size="large "
        >
          <Link to={`/lich-hen/huy`}>Từ chối</Link>
        </Button>
        &nbsp;&nbsp;
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
