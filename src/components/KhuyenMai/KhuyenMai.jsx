import React, { useEffect,useState } from "react";
import { Table, Space, Button } from "antd";
import "./KhuyenMai.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import axios from 'axios';
import useToken from "../../useToken";
export const KhuyenMai = () => {
  const [data,setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();
  

  useEffect(()=>{

    axios.get(`${ROUTE.MAIN_URL}/promotion/all`)
      .then(res => {
        if(res.status === 200){
          const item = res.data.data.filter((item) => item.id !== 1);
          setData(item)
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
      title: "Tiêu đề",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/khuyen-mai/${record.id}`}>  {record.title} </Link>
        </Space>
        
      ),
    },
    {
      title: "Giảm giá (%)",
      render: (text, record) => (
         <> {parseFloat(record.discount)*100} </>
        
      ),
    },
    {
      title: "Ngày tạo",
      render: (text, record) => (
         <> {record.start_date.split(" ")[0]} </>
        
      ),
    },
    {
      title: "Ngày hết hạn",
      render: (text, record) => (
         <> {record.end_date.split(" ")[0]} </>
        
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
        <div>Danh sách khuyến mãi &nbsp; &nbsp;
          { agencyId () === null ? 
           <Button style={{ background: "#5899BA", color: "white", margin:"0 auto" }} shape="round" size="large "><Link to={`/khuyen-mai/add`}>Thêm khuyến mãi</Link></Button>
           :''
        }
         </div>
        
        </div>
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

