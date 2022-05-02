import { Button, Modal, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LichHenEdit.scss";
import { LichHenItem } from "./LichHenItem/LichHenItem";
import { ROUTE } from "../../../../utils/constant";
import { Link } from "react-router-dom";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const LichHenEdit = () => {
  // const [fullName,setfullName] = useState();
  // const [phone,setPhone] = useState();
  // const [address,setAddress] = useState();
  // const [date,setDate] = useState();
  // const [description,setDescription] = useState();
  // const [quantity,setQuantity] = useState();
  // const [time,setTime] = useState();
  const [data, setData] = useState();
  const [detail, setDetail] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [reload, setReload] = useState(0);
  const [detailOrder, setDetailOrder] = useState();
  const [staffWorkSlot, setStaffWorkSlot] = useState();
  const [idStaffWorkSlot, setIdStaffWorkSlot] = useState();
  const [order, setOrder] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    // lấy nhân viên đang rảnh

    let date = detail?.date.split(" ")[0];
    axios
      .get(
        `${ROUTE.MAIN_URL}/workSlot/staff?register_date=${date}&slot_start=${detail?.time}`
      )
      .then((res) => {
        if (res.status === 200) {
          setStaffWorkSlot(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleOk = () => {
    setIsModalVisible(false);

    // xét nhân viên vào appointment
    let idOrderDetail = detailOrder?.[0].id;

    axios
      .patch(
        `${ROUTE.MAIN_URL}/workSlot/detail/${idStaffWorkSlot}/${idOrderDetail}`
      )
      .then((res) => {
        if (res?.status === 200 && res?.data?.data?.success === true) {
          alert("Đã thêm Thợ máy thành công!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(value) {
    setIdStaffWorkSlot(value);
  }
  console.log(idStaffWorkSlot);

  const [size, setSize] = React.useState("default");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  // lấy id của chi tiết lịch hẹn
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/appointment/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDetail(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [reload]);

  // hàm lấy order detail
  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/order/${id}/appointment`)
      .then((res) => {
        if (res.status === 200) {
          setOrder(res.data.data);
          return res.data.data.id;
        }
      })
      .then((res) => {
        axios
          .get(`${ROUTE.MAIN_URL}/orderDetail/${res}/orderId`)
          .then((res) => {
            if (res.status === 200) {
              setDetailOrder(res.data.data);
            }
          });
      })
      .catch((error) => console.log(error));
  }, []);

  // function sua(){
  //   axios.put(`${ROUTE.MAIN_URL}/appointment/update/${id}`,{
  //       full_name: fullName ?? detail?.full_name,
  //       phone: phone ??  detail?.phone,
  //       address: address ??  detail?.address,
  //       date: date ??  detail?.date,
  //       description: description ??  detail?.description,
  //       quantity: quantity ?? detail?.quantity,
  //       time: time?? detail?.time,
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(error => console.log(error));
  // }

  function xet(id) {
    axios
      .put(`${ROUTE.MAIN_URL}/appointment/accept/${id}/2`)
      .then((res) => {
        if (res.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
          setReload(1);
        }
      })
      .catch((error) => console.log(error));
  }

  function cancel(id) {
    axios
      .patch(`${ROUTE.MAIN_URL}/appointment/cancel/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
          setReload(1);
        }
      })
      .catch((error) => console.log(error));
  }

  function getStatusName(status) {
    switch (status) {
      case 1:
        return <Space style={{ color: "#c82333" }}>Từ chối</Space>;
      case 2:
        return <Space style={{ color: "#28a745" }}>Đã xác nhận</Space>;
      case 3:
        return <Space style={{ color: "#f7941d" }}>Đang chờ</Space>;
      case 4:
        return <Space style={{ color: "#28a745" }}>Đã hoàn tất</Space>;
      default:
        break;
    }
  }

  return (
    <>
      <div className="title-table">Chi tiết lịch hẹn</div>
      <div className="table">
        <table>
          <tbody>
            <LichHenItem name="Tên khách hàng" value={detail?.full_name} />

            <LichHenItem name="Điện thoại" value={detail?.phone} />
            <LichHenItem name="Địa chỉ" value={detail?.address} />
            <LichHenItem
              name="Ngày dự kiến"
              value={detail?.date.split(" ")[0]}
            />
            <LichHenItem name="Mô tả" value={detail?.description} />
            <LichHenItem name="Số lượng (máy)" value={detail?.quantity} />

            <LichHenItem name="Thời gian" value={detail?.time} />

            <LichHenItem name="Chi nhánh" value={detail?.agency_name} />

            <LichHenItem
              name="Trạng thái"
              value={getStatusName(detail?.status)}
            />
          </tbody>
        </table>

        {detail?.status === 1 ? (
          <div className="btn-xacnhan">
            <Link to="/lich-hen">
              <Button type="primary">Đóng</Button>
            </Link>
          </div>
        ) : detail?.status === 3 ? (
          <div className="btn-xacnhan">
            <Button type="primary" onClick={() => xet(detail.id)}>
              Chấp nhận
            </Button>
            <Button onClick={() => cancel(detail.id)} type="danger">
              Từ Chối
            </Button>
            <Link to="/lich-hen">
              <Button type="primary">Đóng</Button>
            </Link>
          </div>
        ) : (
          <div className="btn-xacnhan">
            <Link to="/lich-hen">
              <Button type="primary">Đóng</Button>
            </Link>
            <Link to={`/hoa-don/${order?.id}`}>
              <Button type="primary">Xem hóa đơn chi tiết</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
