import { Button, Input, Select, TimePicker } from 'antd';
import moment from 'moment';
import React from "react";
import "./LichLamViecAdd.scss";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`Selected: ${value}`);
}
const format = 'HH:mm';
export const LichLamViecAdd = () => {

  
    return (
      <>
        <div className="title-table">Thêm Lịch Hẹn Khách Hàng</div>
        <div className='boxEdit'>
            
            <div className="table">
            <table>
                    <tbody>
                        <tr>
                            <td width="20%">Tên</td>
                            <td ><Input placeholder='Nhập tên tài khoản' /> </td>
                        </tr>
                        <tr>
                            <td width="20%">Thời gian bắt đầu</td>
                            <td > <TimePicker defaultValue={moment('12:08', format)} format={format} /></td>
                        </tr>
                        <tr>
                            <td width="20%">Thời gian kết thúc</td>
                            <td > <TimePicker defaultValue={moment('12:08', format)} format={format} /></td>
                        </tr>
                        
                        <tr>
                            <td width="20%">Trạng thái</td>
                            <td >
                                <Select  style={{ width: 120 }} onChange={handleChange}>
                                  <Option value="jack">Đang hoạt động</Option>
                                  <Option value="lucy">Không hoạt động</Option>
                                </Select>
                              
                              </td>
                        </tr>
                      
                  </tbody>
                  <div className="btn-xacnhan">
                      <Button type="danger">
                        Đóng
                      </Button>
                      <Button type="primary">
                        Lưu
                      </Button>
                     
                  </div>
              </table>
 
          </div>
        </div>
 
      </>
    );
  };
  