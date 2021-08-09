import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./styles.scss";

const antIcon = <LoadingOutlined spin />;
const Loading = () => {
  return (
    <div className="spinner-div">
      <Spin
        tip={`Loading  ...`}
        indicator={antIcon}
        spinning={true}
        wrapperClassName="registration-loading-wrapper"
        className="registration-loading"
      />
      <div className="company-title">Spark</div>
    </div>
  );
};
export default Loading;
