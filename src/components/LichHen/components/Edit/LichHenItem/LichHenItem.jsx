import React from "react";
import PropTypes from 'prop-types';
import './LichHenItem.scss';
import { Input } from 'antd';
export const LichHenItem = ({name,value = "",changeValue}) => {

  return (
    <>
          <tr>
              <td width="15%">{name}</td>
              <td >{value}</td>
          </tr>
    </>
  );
};

LichHenItem.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
};
