import { Button, Modal, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HoaDonEdit.scss";
import { HoaDonItem } from "./HoaDonItem/HoaDonItem";
import { ROUTE } from "../../../../utils/constant";
import { Link } from "react-router-dom";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const HoaDonEdit = () => {
  const [detail, setDetail] = useState();
  const [detailOrder, setDetailOrder] = useState();
  const [staffMakeDetail, setStaffMakeDetail] = useState();
  const [order, setOrder] = useState();
  const [slot, setSlot] = useState();
  const [staffWorkSlot, setStaffWorkSlot] = useState();
  const [idStaffWorkSlot, setIdStaffWorkSlot] = useState();
  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reload, setReload] = useState(0);
  const [time, setTime] = useState();
  const [idOrderDetail, setIdOrderDetail] = useState();

  const showModal = (id) => {
    setIdOrderDetail(id);
    setIsModalVisible(true);
    getFreeStaff();
  };

  const showModal1 = (id1) => {
    setIdOrderDetail(id1);
    setIsModalVisible(true);
    getStaffMakeDetail();
  };

  useEffect(() => {
    if (time !== undefined) {
      getFreeStaff();
    }
  }, [time]);

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/order/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setOrder(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // lấy nhân viên đang rảnh
  function getFreeStaff() {
    let date = detail?.date.split(" ")[0];
    axios
      .get(
        `${ROUTE.MAIN_URL}/workSlot/staff/agency?agency_name=${
          detail?.agency_name
        }&register_date=${date}&slot_start=${time ?? detail?.time}`
      )
      .then((res) => {
        if (res.status === 200) {
          setStaffWorkSlot(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }

  const handleOk = () => {
    setIsModalVisible(false);

    // xét nhân viên vào appointment

    axios
      .patch(
        `${ROUTE.MAIN_URL}/workSlot/detail/${idStaffWorkSlot}/${idOrderDetail}`
      )
      .then((res) => {
        if (res?.status === 200 && res?.data?.success === true) {
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

  const [size, setSize] = React.useState("default");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  // lấy id của chi tiết hoá đơn
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/order/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.data.data.appointment_id;
        }
      })
      .then((res) => {
        axios.get(`${ROUTE.MAIN_URL}/appointment/${res}`).then((res) => {
          setDetail(res.data.data);
        });
      });
  }, []);

  // hàm lấy order detail
  useEffect(() => {
    if (detail?.id != undefined) {
      axios
        .get(`${ROUTE.MAIN_URL}/order/${detail?.id}/appointment`)
        .then((res) => {
          if (res.status === 200) {
            return res.data.data?.id;
          }
        })
        .then((res) => {
          axios
            .get(`${ROUTE.MAIN_URL}/orderDetail/${res}/manager`)
            .then((res) => {
              if (res.status === 200) {
                setDetailOrder(res.data.data);
                return res.data.data?.id;
              }
            });
        })
        .then((res) => {
          axios.get(`${ROUTE.MAIN_URL}/workSlot/${res}/staff`).then((res) => {
            if (res.status === 200) {
              setStaffMakeDetail(res.data.data);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  }, [detail, reload]);

  function chapNhan(id) {
    axios
      .patch(`${ROUTE.MAIN_URL}/orderDetail/approve/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setReload(1);
        }
      })
      .catch((error) => console.log(error));
  }

  function changeTime(time) {
    setTime(time);
  }

  function tuChoi(id) {
    axios
      .patch(`${ROUTE.MAIN_URL}/orderDetail/deny/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setReload(1);
        }
      })
      .catch((error) => console.log(error));
  }

  function getStaffMakeDetail() {
    axios
      .get(`${ROUTE.MAIN_URL}//workSlot/${id}/staff`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  }

  function getStatusName(status) {
    switch (status) {
      case 1:
        return <Space style={{ color: "red" }}>Đã hủy</Space>;
      case 2:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      case 3:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      case 4:
        return <Space style={{ color: "green" }}>Đã hoàn thành</Space>;
        case 5:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      case 6:
        return <Space style={{ color: "orange" }}>Đang tiến hành</Space>;
      default:
        break;
    }
  }

  useEffect(() => {
    axios
      .get(`${ROUTE.MAIN_URL}/slot/all`)
      .then((res) => {
        if (res.status === 200) {
          setSlot(res.data.data);
        }
      })
      .catch((error) => console.log(error));
  });

  return (
    <>
      <div className="title-table">Xem Chi Tiết Hoá Đơn</div>
      <div className="table">
        <table>
          <tbody>
            <HoaDonItem name="Tên khách hàng" value={detail?.full_name} />

            <HoaDonItem name="Điện thoại" value={detail?.phone} />
            <HoaDonItem name="Địa chỉ" value={detail?.address} />
            <HoaDonItem
              name="Ngày dự kiến"
              value={detail?.date.split(" ")[0]}
            />
            <HoaDonItem name="Mô tả" value={detail?.description} />
            <HoaDonItem name="Số lượng (máy)" value={detail?.quantity} />

            <HoaDonItem name="Thời gian" value={detail?.time} />

            <HoaDonItem name="Chi Nhánh" value={detail?.agency_name} />

            <HoaDonItem
              name="Tổng phí sửa chữa (đồng)"
              value={order?.total_price}
            />

            <HoaDonItem
              name="Trạng thái"
              value={getStatusName(order?.status)}
            />

            <tr>
              <td width="100%" colSpan={2}>
                <hr />
              </td>
            </tr>
            <tr className="mb-2 color-red">
              <td>Hình ảnh</td>
              <td>Tên dịch vụ</td>
              <td>Giá tiền</td>
              <td>Mô tả</td>
              <td>Trạng thái</td>
            </tr>
            {detailOrder?.map((res) => (
              <>
                <tr>
                  {res?.image_url == null ? (
                    <td></td>
                  ) : (
                    <td>
                      <img
                        width="50"
                        height="50"
                        src={res?.image_url ?? ""}
                      ></img>
                    </td>
                  )}

                  <td width="20%">{res?.service_name ?? ""}</td>
                  <td>{res?.service_price ?? ""}</td>
                  <td>{res?.description ?? ""}</td>
                  {/* show chi tiết ở đây */}
                  {res?.status === 1 && (
                    <td>
                      <Button
                        type="disable"
                        style={{
                          background: "#c82333",
                          color: "white",
                          margin: "0 auto",
                        }}
                        shape="round"
                        size="small"
                      >
                        Từ chối
                      </Button>
                    </td>
                  )}
                  {(res?.status === 2 || res?.status === 4) && (
                    <td>
                      <Button
                        type="disable"
                        style={{
                          background: "#f7941d",
                          color: "white",
                          margin: "0 auto",
                        }}
                        shape="round"
                        size="small"
                      >
                        Đã duyệt
                      </Button>
                    </td>
                  )}
                  {res?.status === 3 && (
                    <>
                      <td>
                        <a>
                          <Button
                            type="primary"
                            style={{ background: "#f7941d", color: "white" }}
                            shape="round"
                            size="small"
                            onClick={() => chapNhan(res?.id)}
                          >
                            Duyệt
                          </Button>
                        </a>
                        &nbsp;&nbsp;
                        <a>
                          <Button
                            type="danger"
                            style={{ background: "#c82333", color: "white" }}
                            shape="round"
                            size="small"
                            onClick={() => tuChoi(res?.id)}
                          >
                            Từ Chối
                          </Button>
                        </a>
                      </td>
                    </>
                  )}
                  {res?.status === 5 && (
                    <td>
                      <Button
                        type="disable"
                        style={{
                          background: "#28a745",
                          color: "white",
                          margin: "0 auto",
                        }}
                        shape="round"
                        size="small"
                      >
                        Hoàn Thành
                      </Button>
                    </td>
                  )}

                  {order?.status === 4 ? (
                    <td>
                      <Link to={`/hoa-don/${id}/${res?.id}`}>
                        <Button
                          type="primary"
                          style={{
                            background: "#5899BA",
                            color: "white",
                            margin: "0 auto",
                          }}
                          shape="round"
                          size="small"
                        >
                          Xem nhân viên
                        </Button>
                      </Link>
                    </td>
                  ) : (
                    <td>
                      <Button
                        type="primary"
                        style={{
                          background: "#5899BA",
                          color: "white",
                          margin: "0 auto",
                        }}
                        shape="round"
                        size="small"
                        onClick={() => showModal(res?.id)}
                      >
                        Thêm nhân viên
                      </Button>

                      <Button
                        type="primary"
                        style={{
                          background: "#5899BA",
                          color: "white",
                          margin: "0 auto",
                        }}
                        shape="round"
                        size="small"
                        onClick={() => showModal1(res?.id)}
                      >
                        Xem nhân viên
                      </Button>

                      {/* <Link
                        style={{ paddingLeft: "10px" }}
                        to={`/hoa-don/${id}/${res?.id}`}
                      >
                        <Button
                          type="primary"
                          style={{
                            background: "#5899BA",
                            color: "white",
                            margin: "0 auto",
                          }}
                          shape="round"
                          size="small"
                        >
                          Xem nhân viên
                        </Button>
                      </Link> */}
                    </td>
                  )}
                </tr>
              </>
            ))}
          </tbody>
        </table>

        {detail?.status === 2 || detail?.status === 3 ? (
          <div className="btn-xacnhan">
            <Link to="/hoa-don">
              <Button type="primary">Đóng</Button>
            </Link>
          </div>
        ) : (
          <div className="btn-xacnhan">
            <Link to="/hoa-don/lich-su">
              <Button type="primary">Đóng</Button>
            </Link>
          </div>
        )}
      </div>
      <Modal
        title="Chọn Nhân Viên"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>Chọn Thời Gian </div>
        <Select
          placeholder="Chọn thời gian"
          style={{ width: 145 }}
          onChange={changeTime}
        >
          {slot?.map((item) => (
            <Option value={item?.slotStart}>{item?.slotStart}</Option>
          ))}
        </Select>

        <br></br>
        <br></br>

        <Select
          defaultValue={staffWorkSlot?.[0]?.full_name}
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          {staffWorkSlot?.map((item) => (
            <Option value={item?.id}>
              <strong> Tên: </strong>
              {item?.full_name} &nbsp;&nbsp;&nbsp;&nbsp;
              <strong> Thời gian:</strong> {item?.slot_start} <strong>-</strong>{" "}
              {item?.slot_end}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};
