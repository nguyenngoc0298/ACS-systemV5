import React, { useEffect,useState } from "react";
import { Table, Space, Button } from "antd";
import "./KhachHang.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import axios from 'axios';

export const KhachHang = () => {
  const [data,setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  

  useEffect(()=>{

    axios.get(`${ROUTE.MAIN_URL}/customer/all`)
      .then(res => {
        if(res.status === 200){
          setData(res.data.data)
        }
      })
      .catch(error => console.log(error));

  },[refreshKey]);

  function getStatusName(status) {
    switch (status) {
      case "1":
        return <Space style={{color: "red"}}>Đã xóa</Space>;
      case "2":
        return <Space style={{color: "red"}}>Dừng hoạt động</Space>;
      case "3":
        return <Space style={{color: "green"}}>Hoạt động</Space>;
      default:
          break;
    }
  }

  function activeUser(userId){
    axios.patch(`${ROUTE.MAIN_URL}/user/${userId}/active`,)
    .then(res => {
      if(res.status === 200){
        setRefreshKey(oldKey => oldKey +1)
      }
    })
    .catch(error => console.log(error));
   
  }

  function deActiveUser(userId){
    axios.patch(`${ROUTE.MAIN_URL}/user/${userId}/de-active`,)
    .then(res => {
      if(res.status === 200){
        setRefreshKey(oldKey => oldKey +1)
      }
    })
    .catch(error => console.log(error));
  }

  console.log(data);

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Tên khách hàng",
      render: (text, record) => (
        <Space size="middle">
        {record.fullName}
      </Space>
        
      ),
    },
    {
      title: "Số điện thoại",
      render: (text, record) => (
         <> {record.phone} </>
        
      ),
    },
    {
      title: "Địa chỉ",
      render: (text, record) => (
         <> {record.address} </>
        
      ),
    },
    {
      title: "Mail",
      render: (text, record) => (
         <> {record.email} </>
        
      ),
    },
    {
      title: "Trạng thái",
      render: (text, record) => (
        <>{getStatusName(record.status)}</>
      )
      ,
    },
    {
      title: "",
      render: (text, record) => {

        if (record.status === "2") {
          return (
            <Button onClick={() => activeUser(record.userId)} style={{background: "green", color: "white", margin:"0 auto"}} shape="round" size="large " >
              Hoạt Động
            </Button>
          )
        }
        if (record.status === "3") {
          return (
            <Button onClick={() => deActiveUser(record.userId)} style={{background: "red", color: "white", margin:"0 auto"}} shape="round" size="large " >
              Dừng hoạt Động
            </Button>
          )
        }

      },
    },
  ];

  return (
    <>
      <div className="title-table">Danh sách loại dịch vụ</div>
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

