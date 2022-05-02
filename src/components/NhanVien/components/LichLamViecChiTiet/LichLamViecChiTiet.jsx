import { DatePicker } from 'antd';
import React from "react";
import "./LichLamViecChiTiet.scss";
import { LichLamViecItem } from './LichLamViecItem/LichLamViecItem';

function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const arrHard = [
      'Nguyễn Văn A',
      'Nguyễn Văn A',
      'Nguyễn Văn A',
      'Nguyễn Văn A',
  ] 

export const LichLamViecChiTiet = () => {

  
    return (
      <>
        <div className="title-table">Lịch làm việc</div>
        <div className='boxEdit'>
            
            <div className="table">
            <DatePicker onChange={onChange} />
            <div className="row mt-3">
                <div className="col-lg-4">
                    <LichLamViecItem ca="Ca Sáng" time="7:30-11:30" arrName={arrHard}/>
                </div>
                <div className="col-lg-4">
                    <LichLamViecItem ca="Ca chiều " time="11:30-17:30" arrName={arrHard}/>

                </div>
                <div className="col-lg-4">
                    <LichLamViecItem ca="Cả Ngày" time="7:30-17:30" arrName={arrHard}/>

                </div>
            </div>
          

          </div>
        </div>
 
      </>
    );
  };
  