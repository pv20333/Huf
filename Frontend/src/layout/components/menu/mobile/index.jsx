import React from "react";

import { Drawer } from "antd";
import { RiCloseFill } from "react-icons/ri";

import MenuLogo from "../logo";
import MenuItem from "../item";
import MenuFooter from "../footer";

export default function MenuMobile(props) {
    
    const { onClose, visible } = props;

    return (
        <Drawer
            title={
                <MenuLogo onClose={onClose} />
            }
            width={256}
            className="hp-mobile-sidebar hp-sidebar"
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
            closeIcon={
                <RiCloseFill
                    className="remix-icon hp-text-color-black-80"
                    size={24}
                />
            }
        >
            <MenuFooter onClose={onClose} collapsed={false} />
            <><br /></>

            <MenuItem onClose={onClose} />

            
        </Drawer>
    );
};