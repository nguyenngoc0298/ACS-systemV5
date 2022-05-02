import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import "./HoaDon.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { ROUTE } from "../../utils/constant";
import useToken from "../../useToken";

export const HoaDon = () => {
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();
  const [reload, setReload] = useState(0);

  function xet(id, staff_id) {
    axios
      .put(`${ROUTE.MAIN_URL}/appointment/accept/${id}/2`)
      .then((res) => {
        if (res.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
        }
      })
      .catch((error) => console.log(error));
  }

  function cancel(id) {
    axios
      .patch(`${ROUTE.MAIN_URL}/appointment/cancel/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    let url = ``;
    if (agencyId()) {
      url = `${ROUTE.MAIN_URL}/order/agency?agencyId=${agencyId()}`;
    } else {
      url = `https://acsproject.azurewebsites.net/order/all`;
    }
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          const item = res.data.data.filter(
            (item) =>
              item.status === 2 ||
              item.status === 3 ||
              item.status === 5 ||
              item.status === 6
          );
          setData(item.sort((a, b) => b.id - a.id));
        }
      })
      .catch((error) => console.log(error));
  }, [refreshKey]);

  function isSearchValue(dom) {
    if (dom) {
      axios
        .get(`${ROUTE.MAIN_URL}/order/name?value=${dom}`)
        .then((res) => {
          setData(res.data.data);
          setReload(1);
        })
        .catch((error) => console.log(error));
    } else {
      let url = ``;
      if (agencyId()) {
        url = `${ROUTE.MAIN_URL}/order/agency?agencyId=${agencyId()}`;
      } else {
        url = `https://acsproject.azurewebsites.net/order/all`;
      }
      axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            const item = res.data.data.filter(
              (item) =>
                item.status === 2 ||
                item.status === 3 ||
                item.status === 5 ||
                item.status === 6
            );
            setData(item.sort((a, b) => b.id - a.id));
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function getStatusName(status) {
    switch (status) {
      case 1:
        return <Space style={{ color: "red" }}>Đã hủy</Space>;
      case 2:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      case 3:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      case 4:
        return <Space style={{ color: "green" }}>Đã hoàn thành</Space>;
      case 5:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      case 6:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
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
      title: "Tên Khách Hàng",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/hoa-don/${record.id}`}> {record.customer_name} </Link>
        </Space>
      ),
    },
    {
      title: "Ngày tạo",
      render: (text, record) => <>{record?.created_date.split(" ")[0]}</>,
    },

    {
      title: "Trạng thái",
      key: "action",
      render: (text, record) => <>{getStatusName(record.status)}</>,
    },
  ];

  return (
    <>
      <div className="title-table">
        Danh sách hóa đơn &nbsp;&nbsp;
        <Button
          style={{ background: "orange", color: "white", margin: "0 auto" }}
          shape="round"
          size="large "
        >
          <Link to={`/hoa-don`}>Đang tiến hành</Link>
        </Button>
        &nbsp;&nbsp;
        <Button
          style={{ background: "green", color: "white", margin: "0 auto" }}
          shape="round"
          size="large "
        >
          <Link to={`/hoa-don/lich-su`}>Đã hoàn thành</Link>
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
