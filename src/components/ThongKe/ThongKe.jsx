import React, { useEffect, useState } from "react";
import { Table, Space, Button, Input, DatePicker } from "antd";
import "./ThongKe.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constant";
import axios from "axios";
import useToken from "../../useToken";
import customerImg from "./img/customer.png";
import appointmentImg from "./img/appointment.png";
import orderImg from "./img/order.png";
import agencyImg from "./img/agency.png";
import staffImg from "./img/staff.png";
import service_typeImg from "./img/service-type.png";
import serviceImg from "./img/service.png";
import promotionImg from "./img/promotion.png";
import revenueImg from "./img/revenue.png";

const { RangePicker } = DatePicker;

export const ThongKe = () => {
  const [data, setData] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const { agencyId } = useToken();
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let url = ``;
    if (agencyId()) {
      url = `${
        ROUTE.MAIN_URL
      }/statistic/range/${agencyId()}?end_date=&start_date=`;
    } else {
      url = `${ROUTE.MAIN_URL}/statistic/range?end_date=&start_date=`;
    }
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [refreshKey]);

  useEffect(() => {
    let url = ``;
    if (agencyId()) {
      url = `${
        ROUTE.MAIN_URL
      }/statistic/range/${agencyId()}?end_date=${end_date}&start_date=${start_date}`;
    } else {
      url = `${ROUTE.MAIN_URL}/statistic/range?end_date=${end_date}&start_date=${start_date}`;
    }
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [start_date, end_date]);

  console.log(start_date, end_date);

  return (
    <>
      <div className="title-table">Thống kê</div>

      <div className="boxbgTK">
        <div className="box2TK">
          <img src={revenueImg} style={{ height: "45px", width: "45px" }} />
        </div>
        <div className="box1TK">Tổng doanh thu</div>
        <div className="box3TK">{data?.totalRevenue} VNĐ</div>
        <div className="box4TK">
          <div className="box4TKInput">
            <td>Theo mốc thời gian: &nbsp;</td>
            <td style={{ paddingRight: "10px" }}>
              <Input
                type="date"
                onChange={(dom) => setStart_date(dom.target.value)}
              />
            </td>
            <td style={{ paddingRight: "10px" }}>-</td>
            <td>
              <Input
                type="date"
                onChange={(dom) => setEnd_date(dom.target.value)}
              />
            </td>
            <td></td>
          </div>
        </div>
      </div>

      <Link style={{ color: "black" }} to={`/khach-hang`}>
        <div className="boxbg">
          <div className="box2">
            <img src={customerImg} style={{ height: "45px", width: "45px" }} />
          </div>
          <div className="box1">Khách hàng</div>
          <div className="box3">{data?.customerCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/lich-hen`}>
        <div className="boxbg">
          <div className="box2">
            <img
              src={appointmentImg}
              style={{ height: "45px", width: "45px" }}
            />
          </div>
          <div className="box1">Lịch hẹn</div>
          <div className="box3">{data?.appointmentCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/hoa-don`}>
        <div className="boxbg">
          <div className="box2">
            <img src={orderImg} style={{ height: "45px", width: "45px" }} />
          </div>
          <div className="box1">Hóa đơn</div>
          <div className="box3">{data?.orderCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/chi-nhanh`}>
        <div className="boxbg">
          <div className="box2">
            <img src={agencyImg} style={{ height: "45px", width: "45px" }} />
          </div>
          <div className="box1">Chi nhánh</div>
          <div className="box3">{data?.agencyCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/nhan-vien`}>
        <div className="boxbg">
          <div className="box2">
            <img src={staffImg} style={{ height: "45px", width: "45px" }} />
          </div>
          <div className="box1">Nhân viên</div>
          <div className="box3">{data?.staffCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/loai-dich-vu`}>
        <div className="boxbg">
          <div className="box2">
            <img
              src={service_typeImg}
              style={{ height: "45px", width: "45px" }}
            />
          </div>
          <div className="box1">Loại dịch vụ</div>
          <div className="box3">{data?.serviceTypeCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/dich-vu`}>
        <div className="boxbg">
          <div className="box2">
            <img src={serviceImg} style={{ height: "45px", width: "45px" }} />
          </div>
          <div className="box1">Dịch vụ</div>
          <div className="box3">{data?.serviceCount}</div>
        </div>
      </Link>

      <Link style={{ color: "black" }} to={`/khuyen-mai`}>
        <div className="boxbg">
          <div className="box2">
            <img src={promotionImg} style={{ height: "45px", width: "45px" }} />
          </div>
          <div className="box1">Khuyến mãi</div>
          <div className="box3">{data?.promotionCount}</div>
        </div>
      </Link>
    </>
  );
};
