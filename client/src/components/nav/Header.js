import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// firebase is imported because we need to implement logout
import firebase from "firebase";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();

  // combineReducer 에서 return 한 state 를 spread operator 를 써서 user 라는 state 만 deconstruct 한다
  // 결국에는 dispatch 할때에만 기존에 있는 state 을 업데이트 한다.
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>home</Link>
      </Item>
      {/* 만약 user 가 null 이라면, register 와 login 을 Header 에 보이게 해라 */}
      {!user ? (
        <>
          <Item
            key='register'
            icon={<UserAddOutlined />}
            className='float-right'
          >
            <Link to='/register'>Register</Link>
          </Item>

          <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          key='SubMenu'
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]} // 이메일 주소를 @ 를 스플릿 하고 첫번째 요소인 name 을 [0] 로 가져온다
          className='float-right'
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};
export default Header;
