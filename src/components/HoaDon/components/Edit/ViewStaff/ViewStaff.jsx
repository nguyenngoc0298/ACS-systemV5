import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { useParams } from "react-router-dom";
import "./ViewStaff.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { ROUTE } from "../../../../../utils/constant";

export const ViewStaff = () => {
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}//workSlot/${id}/staff`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [refreshKey]);

  const columns = [
    {
      title: "No",
      render:  (text, record) => (
        <Space size="middle">
          1
        </Space>
      ),
    },
    {
      title: "Tên nhân viên",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/nhan-vien/${record.userId}`}> {record.fullName} </Link>
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      render: (text, record) => <>{record?.phone}</>,
    },
  ];

  return (
    <>
      <div className="title-table">
        Danh sách nhân viên
      </div>
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};
