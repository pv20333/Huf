import React from "react";
import { Link } from "react-router-dom";

import { Divider, Avatar, Row, Col } from "antd";
import { RiSettings3Line } from "react-icons/ri";

import IntlMessages from "../../lang/IntlMessages";
import avatar from "../../../../assets/images/memoji/user-avatar-8.png";

export default function MenuFooter(props) {
  return (
    props.collapsed === false ? (
      <><br />
      <Row
        className="hp-sidebar-footer hp-bg-color-dark-90"
        align="middle"
        justify="space-between"
      >
        

        <Col>
          <Row align="middle">
            <Avatar size={48} src={avatar} className="hp-bg-info-4 hp-mr-8" />

            <div className="hp-mt-6">
              <span className="hp-d-block hp-p1-body" style={{ lineHeight: 1, color: "white", }}>
                Carlos da Silva
             </span>

              <Link
                to="#"
                className="hp-badge-text hp-text-color-dark-30 hp-font-weight-400"
                onClick={props.onClose}
              >
                <IntlMessages id="sidebar-view-profile" />
              </Link>
            </div>
          </Row>
        </Col>

        <Col>
          <Link
            to="#"
            onClick={props.onClose}
          >
            <RiSettings3Line
              className="remix-icon " style={{ lineHeight: 1, color: "white", }}
              size={24}
            />
          </Link>
        </Col>
      </Row></>
    ) : (
      <Row
        className="hp-sidebar-footer hp-bg-color-dark-90"
        align="middle"
        justify="center"
      >
        <Col>
          <Link
            to="#"
            onClick={props.onClose}
          >
            <Avatar size={48} src={avatar} className="hp-bg-info-4" />
          </Link>
        </Col>
      </Row>
    )
  );
};