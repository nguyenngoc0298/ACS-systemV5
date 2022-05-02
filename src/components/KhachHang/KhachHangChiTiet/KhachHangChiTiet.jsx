import { Button, Modal, Select,Input  } from 'antd';
import React, { useState ,useEffect  } from "react";
import "./KhachHangChiTiet.scss";
import img1 from './img/midu.jpg';
import {
  useParams
} from "react-router-dom";
import { ROUTE } from "../../../utils/constant";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`Selected: ${value}`);
}



export const KhachHangChiTiet = () => {
  const [detail,setDetail] = useState();
  const [name,setName] = useState();
  const [content,setContent] = useState();
  const [status,setStatus] = useState();
  const history = useHistory();

  // lấy id của chi tiết loại dịch vụ
    let { id } = useParams();
  
    useEffect(()=>{

      axios.get(`${ROUTE.MAIN_URL}/service-type/${id}`)
      .then(res => {
        if(res.status === 200){
          setDetail(res.data.data)
        }
      })
      .catch(error => console.log(error));

    },[]);
  
    function sua(){
     axios.patch(`${ROUTE.MAIN_URL}/service-type/${id}?content=${content?? detail?.content}&name=${name ?? detail?.name}`)
      .then(res => {
        console.log(res?.data?.success)
        if(res?.status === 200 && res?.data?.success === true){
          history.push("/loai-dich-vu");
        }
      })
      .catch(error => console.log(error));
    }


    function isActiveLDV(dom){
    
      if(dom == 1){ // dừng hoạt động
        axios.patch(`${ROUTE.MAIN_URL}/service-type/${id}/de-active`)
          .then(res => {
         
          })
          .catch(error => console.log(error));
      }else{
        axios.patch(`${ROUTE.MAIN_URL}/service-type/${id}/active`)
          .then(res => {
 
          })
          .catch(error => console.log(error));
      }
      
    }



    return (
      <>
       <div className="title-table">Chi tiết khách hàng</div>
        <div className='boxEdit'>
        <div className="img">
              <img src={img1} />
            </div>
            <div className="table">
              <table>
                    <tbody>
                    <tr>
                            <td width="20%">Tên loại dịch vụ</td>
                            <td > <Input value={name ?? detail?.name} onChange={(dom)=>setName(dom?.target.value)}/></td>
                        </tr>
                        <tr>
                            <td width="20%">Mô tả</td>
                            <td ><Input  value={content ?? detail?.content} onChange={(dom)=>setContent(dom?.target.value)}/></td>
                        </tr>
                        <tr>
                            <td width="20%">Trạng thái</td>
                            <td >
                                <Select defaultValue="Đang Hoạt Động" style={{ width: 120 }} onChange={(dom)=>isActiveLDV(dom)}>
                                  <Option value="1">Không hoạt động</Option>
                                  <Option value="2">Đang hoạt động </Option>
                                </Select>
                              
                              </td>
                        </tr>
                      
                  </tbody>
                  <div className="btn-xacnhan">
                      <Button type="danger">
                        Đóng
                      </Button>
                      <Button type="primary" onClick={()=>sua()}>
                        Lưu
                      </Button>
                     
                  </div>
              </table>
              

              
          </div>
        </div>
 
      </>
    );
  };
  