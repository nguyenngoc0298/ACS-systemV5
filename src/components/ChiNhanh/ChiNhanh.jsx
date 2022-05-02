import React, { useEffect,useState } from "react";
import { Table, Space, Button } from "antd";
import "./ChiNhanh.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import axios from 'axios';
import useToken from "../../useToken";

export const ChiNhanh = () => {
  const [data,setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();
  

  useEffect(()=>{
    let url = ``;
    if(agencyId()){
      url = `${ROUTE.MAIN_URL}/agency/${agencyId()}`;
    }else{
      url = `${ROUTE.MAIN_URL}/agency/all`;
    }

    axios.get(url)
      .then(res => {
        if(res.status === 200){
          if(agencyId()){
            setData([res.data.data])
          }else{
            setData(res.data.data)
          }
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
      title: "Tên chi nhánh",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/chi-nhanh/${record.id}`}>  {record.name} </Link>
        </Space>
        
      ),
    },
    {
      title: "Địa chỉ",
      render: (text, record) => (
         <Space> {record.address} </Space>
        
      ),
    },
    
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => 
    {  
          if(record.status === 1) {
            return (
            <Space key={record.id} style={{color: "red", margin:"0 auto" }}>
                Dừng hoạt động
            </Space>
            ) 
          }
          if(record.status === 2) {
            return (
            <Space key={record.id} style={{color: "green", margin:"0 auto" }}>
                Hoạt động
            </Space>
            ) 
          }
          
    }
      ,
    },
  ];

  return (
    <>
      <div className="title-table">
        Danh sách chi nhánh &nbsp; &nbsp;
        <Button 
        style={{ background: "#5899BA", color: "white", margin:"0 auto" }} 
        shape="round" size="large ">
          {
            agencyId() === null && 
            <Link to={`/chi-nhanh/add`}>
            Thêm chi nhánh
            </Link>
          } 
        </Button>
      </div>
        
        
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

