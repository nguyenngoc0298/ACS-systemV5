import React from "react";
import PropTypes from 'prop-types';
import './HoaDonItem.scss';
import { Input } from 'antd';
export const HoaDonItem = ({name,value = "",changeValue}) => {

  return (
    <>
          <tr>
              <td width="15%">{name}</td>
              <td >{value}</td>
          </tr>
    </>
  );
};

HoaDonItem.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
};
