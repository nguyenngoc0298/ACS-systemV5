
import React from 'react';
import { Logo } from '../../Logo/Logo';
import { Menu } from 'antd';
import "./Navbar.scss";

import { HomeOutlined, UserOutlined, HistoryOutlined, UsergroupAddOutlined,
    InsertRowAboveOutlined,DollarCircleOutlined,PercentageOutlined

} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;

export const Navbar = ({})=> {
    const history = useHistory();

    const handleClick = e => {
        console.log('click ', e.key);
        switch (e.key) {
            case "1":
                history.push("/");
                break;
            case "2":
                history.push("/khach-hang");
                break;
            case "3":
                history.push("/lich-hen");
                break;
            case "4":
                history.push("/lich-hen/lich-su");
                break;
            case "5":
                history.push("/nhan-vien");
                break;
            case "6":
                history.push("/nhan-vien/add");
                break;
            case "8":
                history.push("/lich-lam-viec");
                break;
            case "9":
                history.push("/lich-lam-viec/add");
                break;
            case "10":
                history.push("/chi-nhanh");
                break;
            case "12":
                history.push("/loai-dich-vu");
                break;
            case "13":
                history.push("/loai-dich-vu/add");
                break;
            case "14":
                history.push("/dich-vu");
                break;
            case "15":
                history.push("/dich-vu/add");
                break;
            case "16":
                history.push("/khuyen-mai");
                break;
            case "17":
                history.push("/khuyen-mai/add");
                break;
            case "18":
                history.push("/hoa-don");
                break;
            case "19":
                history.push("/hoa-don/lich-su");
                break;
            default:
                break;
        }
    };

    return (<>
        <div>
            <Logo/>
            <Menu
                onClick={handleClick}
                style={{ width: "100%" }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                 <Menu.Item key="1" icon={<HomeOutlined />}>
                   Trang Chủ
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                   Khách Hàng
                </Menu.Item>
                <SubMenu key="sub1" icon={<HistoryOutlined />} title="Lịch Hẹn">
                    <Menu.Item key="3">Danh sách lịch hẹn</Menu.Item>
                    {/* <Menu.Item key="4">Lịch sử</Menu.Item> */}
                </SubMenu>
                <SubMenu key="sub6" icon={<PercentageOutlined />} title="Hoá Đơn">
                    <Menu.Item key="18">Danh Sách Hoá Đơn</Menu.Item>
                    {/* <Menu.Item key="19">Lịch sử</Menu.Item> */}
                </SubMenu>
                <SubMenu key="sub2" icon={<UsergroupAddOutlined />} title="Nhân Viên">
                    <Menu.Item key="5">Danh sách nhân viên</Menu.Item>
                    {/* <Menu.Item key="6">Thêm nhân viên</Menu.Item> */}
                    {/* <Menu.Item key="7">Lịch làm việc</Menu.Item> */}
                    <Menu.Item key="8">Danh sách lịch làm việc</Menu.Item>
                    {/* <Menu.Item key="9">Thêm lịch Làm Việc</Menu.Item> */}
                </SubMenu>
                <SubMenu key="sub3" icon={<InsertRowAboveOutlined />} title="Chi Nhánh">
                    <Menu.Item key="10">Danh sách chi nhánh</Menu.Item>
                    {/* <Menu.Item key="11">Thêm chi nhánh</Menu.Item> */}
                </SubMenu>
                <SubMenu key="sub4" icon={<DollarCircleOutlined />} title="Loại Dịch Vụ / Dịch Vụ">
                    <Menu.Item key="12">Danh sách loại dịch vụ</Menu.Item>
                    {/* <Menu.Item key="13">Thêm loại dịch vụ</Menu.Item> */}
                    <Menu.Item key="14">Danh sách dịch vụ</Menu.Item>
                    {/* <Menu.Item key="15">Thêm dịch vụ</Menu.Item> */}
                </SubMenu>
                <SubMenu key="sub5" icon={<PercentageOutlined />} title="Khuyến mãi">
                    <Menu.Item key="16">Danh sách khuyến mãi</Menu.Item>
                    {/* <Menu.Item key="17">Thêm khuyến mãi</Menu.Item> */}
                </SubMenu>

            </Menu>


            <ul>
                {/* <li><a href="">cc</a></li>
                <li><a href="">ccc</a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li> */}
            </ul>
        </div>
    </>)
};

