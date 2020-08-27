import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Menu } from "antd";
import { UserOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import { Viewer } from "../../../../lib/types";
import { useMutation } from "react-apollo";
import { displaySuccessNotification, displayErrorMessage } from "../../../../lib/utils";

const { Item, SubMenu } = Menu;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({viewer, setViewer}: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully logged out");
      }
    },
    onError: data => {
      displayErrorMessage("Sorry! We weren't able to log you out. Please try again later");
    }
  });

  const handleLogOut = () => {
    logOut();
  }

  const avatarImg = viewer.id && viewer.avatar ? viewer.avatar : "";
  const subMenuLogin = viewer.id ? (
    <SubMenu title={<Avatar src={avatarImg}/>}>
      <Item key="/user">
        <Link to={`/user/${viewer.id}`} />
        <UserOutlined />
        Profile
      </Item>
      <Item key="/logout">
        <div onClick={handleLogOut}>
          <LogoutOutlined />
          Logout
        </div>
      </Item>
    </SubMenu>
  ) : <Item key="/login">
    <Link to="/login">
      <Button type="primary">Sign In</Button>
    </Link>
  </Item>;

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
            <HomeOutlined />
            Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};