import React, { useEffect,useState } from "react";
import { Table, Space, Button } from "antd";
import "./LoaiDichVu.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import axios from 'axios';
import useToken from "../../useToken";

export const LoaiDichVu = () => {
  const [data,setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();

  useEffect(()=>{

    axios.get(`${ROUTE.MAIN_URL}/service-type/all`)
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
      title: "Loại dịch vụ",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/loai-dich-vu/${record.id}`}>  {record.name} </Link>
        </Space>
        
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
                Đã huỷ
            </p>
            ) 
          }
          if(record.status === 2) {
            return (
            <p key={record.id} style={{color: "red", margin:"0 auto" }}>
                Dừng hoạt động
            </p>
            ) 
          }
          if(record.status === 3) {
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
    //       <Button type="disable" style={{ background: "#5899BA", color: "white", margin:"0 auto" }} shape="round" size="large "><Link to={`/loai-dich-vu/${record.id}`}>  Chi tiết </Link></Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <div className="title-table">
        Danh sách loại dịch vụ &nbsp; &nbsp;
        {agencyId() === null &&
        <Button 
        style={{ background: "#5899BA", color: "white", margin:"0 auto" }} 
        shape="round" size="large ">
          
          <Link to={`/loai-dich-vu/add`}>
            Thêm loại dịch vụ
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

