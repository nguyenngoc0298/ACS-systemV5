import React, { useEffect,useState } from "react";
import { Table, Space, Button } from "antd";
import "./DichVu.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import axios from 'axios';
import useToken from "../../useToken";

export const DichVu = () => {
  const [data,setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();
  

  useEffect(()=>{

    axios.get(`${ROUTE.MAIN_URL}/service/all`)
      .then(res => {
        if(res.status === 200){
          setData(res.data.data)
        }
      })
      .catch(error => console.log(error));

  },[refreshKey]);

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Tên dịch vụ",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/dich-vu/${record.id}`}>  {record.name} </Link>
        </Space>
        
      ),
    },
    {
      title: "Loại dịch vụ",
      render: (text, record) => (
         <p> {record.type_name} </p>
        
      ),
    },
    {
      title: "Giá (đồng)",
      render: (text, record) => (
         <p> {record.price} </p>
        
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => 
    {  
          if(record.status === 1) {
            return (
            <p key={record.id} style={{color: "red", margin:"0 auto" }}>
                Dừng hoạt động
            </p>
            ) 
          }
          if(record.status === 2) {
            return (
            <p key={record.id} style={{color: "green", margin:"0 auto" }}>
                Hoạt động
            </p>
            ) 
          }
          
    }
      ,
    },
    // {
    //   title: "Chi tiết",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button type="disable" style={{ background: "#5899BA", color: "white", margin:"0 auto" }} shape="round" size="large "><Link to={`/dich-vu/${record.id}`}>  Chi tiết </Link></Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <div className="title-table">
        Danh sách dịch vụ &nbsp; &nbsp;
        {agencyId() === null &&
        <Button 
        style={{ background: "#5899BA", color: "white", margin:"0 auto" }} 
        shape="round" size="large ">
          
          <Link to={`/dich-vu/add`}>
            Thêm dịch vụ
            </Link>
        </Button>
        }
      </div>
        
        
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

