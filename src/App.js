import React,{useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Layout } from './common/Layout/Layout';
import { LichHen,LichHenEdit,LichHenLichSu,NhanVien,NhanVienEdit,NhanVienAdd, LichLamViecAdd,LichLamViecEdit,LichLamViecChiTiet,DichVu,  HoaDon, HoaDonEdit,   } from './components';
import { ChiNhanh } from './components/ChiNhanh/ChiNhanh';
import { ChiNhanhAdd } from './components/ChiNhanh/components/ChiNhanhAdd/ChiNhanhAdd';
import { ChiNhanhChiTiet } from './components/ChiNhanh/components/ChiNhanhChiTiet/ChiNhanhChiTiet';
import { DichVuAdd } from './components/DichVu/components/DichVuAdd/DichVuAdd';
import { DichVuChiTiet } from './components/DichVu/components/DichVuChiTiet/DichVuChiTiet';
import { HoaDonLichSu } from './components/HoaDon/components/Edit/History/HoaDonLichSu';
import { ViewStaff } from './components/HoaDon/components/Edit/ViewStaff/ViewStaff';
import { KhachHang } from './components/KhachHang/KhachHang';
import { KhachHangChiTiet } from './components/KhachHang/KhachHangChiTiet/KhachHangChiTiet';
import { KhuyenMaiAdd } from './components/KhuyenMai/components/KhuyenMaiAdd/KhuyenMaiAdd';
import { KhuyenMaiChiTiet } from './components/KhuyenMai/components/KhuyenMaiChiTiet/KhuyenMaiChiTiet';
import { KhuyenMai } from './components/KhuyenMai/KhuyenMai';
import { LichHenHuy } from './components/LichHen/components/Huy/LichHenLichSu';
import { LoaiDichVu } from './components/LoaiDichVu/LoaiDichVu';
import { LoaiDichVuAdd } from './components/LoaiDichVu/LoaiDichVuChiTiet/components/Add/LoaiDichVuAdd';
import { LoaiDichVuChiTiet } from './components/LoaiDichVu/LoaiDichVuChiTiet/LoaiDichVuChiTiet';
import { LichLamViet } from './components/NhanVien/components/LichLamViec/LichLamViec';
import { Login } from './components/Login/Login';
import { ROUTE } from './utils/constant';
import useToken from './useToken';
import { ThongKe } from './components/ThongKe/ThongKe';

function App() {

  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <Layout>
         <Switch>
            <Route exact path={ROUTE.LICH_HEN} component={LichHen} />
            <Route exact path={ROUTE.LICH_HEN_LICH_SU} component={LichHenLichSu} />
            <Route exact path={ROUTE.LICH_HEN_HUY} component={LichHenHuy} />
            <Route exact path={ROUTE.LICH_HEN_EDIT} component={LichHenEdit} />
            <Route exact path={ROUTE.NHAN_VIEN} component={NhanVien} />
            <Route exact path={ROUTE.NHAN_VIEN_ADD} component={NhanVienAdd} />
            <Route exact path={ROUTE.NHAN_VIEN_EDIT} component={NhanVienEdit} />
            <Route exact path={ROUTE.LICH_LAM_VIEC} component={LichLamViet} />
            <Route exact path={ROUTE.LICH_LAM_VIEC_ADD} component={LichLamViecAdd} />
            <Route exact path={ROUTE.LICH_LAM_VIEC_EDIT} component={LichLamViecEdit} />
            <Route exact path={ROUTE.LICH_LAM_VIEC_DETAIL} component={LichLamViecChiTiet} />
            <Route exact path={ROUTE.LOAI_DICH_VU} component={LoaiDichVu} />
            <Route exact path={ROUTE.LOAI_DICH_VU_ADD} component={LoaiDichVuAdd} />
            <Route exact path={ROUTE.LOAI_DICH_VU_DETAIL} component={LoaiDichVuChiTiet} />
            <Route exact path={ROUTE.DICH_VU} component={DichVu} />
            <Route exact path={ROUTE.DICH_VU_ADD} component={DichVuAdd} />
            <Route exact path={ROUTE.DICH_VU_DETAIL} component={DichVuChiTiet} />
            <Route exact path={ROUTE.KHUYEN_MAI} component={KhuyenMai} />
            <Route exact path={ROUTE.KHUYEN_MAI_ADD} component={KhuyenMaiAdd} />
            <Route exact path={ROUTE.KHUYEN_MAI_DETAIL} component={KhuyenMaiChiTiet} />
            <Route exact path={ROUTE.HOA_DON} component={HoaDon} />
            <Route exact path={ROUTE.HOA_DON_LICH_SU} component={HoaDonLichSu} />
            <Route exact path={ROUTE.HOA_DON_EDIT} component={HoaDonEdit} />
            <Route exact path={ROUTE.KHACH_HANG} component={KhachHang} />
            <Route exact path={ROUTE.KHACH_HANG_DETAIL} component={KhachHangChiTiet} />
            <Route exact path={ROUTE.CHI_NHANH} component={ChiNhanh} />
            <Route exact path={ROUTE.CHI_NHANH_ADD} component={ChiNhanhAdd} />
            <Route exact path={ROUTE.CHI_NHANH_DETAIL} component={ChiNhanhChiTiet} />
            <Route exact path={ROUTE.HOA_DON_DETAIL_STAFF} component={ViewStaff} />
            <Route exact path={ROUTE.TRANG_CHU} component={ThongKe} />
            
            
          </Switch>
    </Layout>
  );
}

export default App;
