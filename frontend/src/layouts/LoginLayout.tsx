import { Outlet, NavLink } from "react-router-dom";
import { Divider, Layout, Menu, Typography, Drawer, Button, Grid } from "antd";
import {
  ABOUT_PATH,
  PARTNERS_PATH,
  LOGIN_PATH
} from "../consts/paths";
import logo from "../assets/l4_vc_logo.png";
import { ContactUs } from "../components/ContactUsContainer";
import {
  FileTextOutlined,
  FormOutlined,
  TeamOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { useState } from "react";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const items = [
  {
    key: `/${LOGIN_PATH}`,
    label: <NavLink to={`/${LOGIN_PATH}`}>Main</NavLink>,
    icon: <FormOutlined />
  },
  {
    key: `/${ABOUT_PATH}`,
    label: <NavLink to={`/${ABOUT_PATH}`}>About Card</NavLink>,
    icon: <FileTextOutlined />
  },
  {
    key: `/${PARTNERS_PATH}`,
    label: <NavLink to={`/${PARTNERS_PATH}`}>Partners</NavLink>,
    icon: <TeamOutlined />
  }
];

export const LoginLayout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#000526ff" }}>
      <Header style={{ display: "flex", alignItems: "center", paddingInline: 16 }}>
        <div style={{ display: "flex", alignItems: "center", color: "white", fontSize: 24, marginRight: 32 }}>
          <img src={logo} alt="logo" style={{ height: 40, marginRight: 12 }} />
        </div>

        {isMobile ? (
          <>
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: "white", fontSize: 20 }} />}
              onClick={() => setDrawerVisible(true)}
              style={{ marginLeft: "auto" }}
            />
            <Drawer
              title="Menu"
              placement="right"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
              styles={{ body: { padding: 20, background: "#001529" } }}
            >
              <Menu
                theme="dark"
                mode="vertical"
                items={items}
                onClick={() => setDrawerVisible(false)}
              />
            </Drawer>
          </>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[`/${LOGIN_PATH}`]}
            style={{ flex: 1 }}
            items={items}
          />
        )}
      </Header>

      <Content style={{ padding: "24px 50px" }}>
        <Outlet />
      </Content>

      <Divider style={{ borderColor: "white", color: "white" }} />

      <Footer style={{ textAlign: "center", background: "#000526ff" }}>
        <ContactUs />
      </Footer>
    </Layout>
  );
};
