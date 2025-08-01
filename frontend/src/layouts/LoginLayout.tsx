import { Outlet, NavLink } from "react-router-dom";
import { Divider, Layout, Menu, Drawer, Button, Grid } from "antd";
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
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/bg.png')`, // укажи свой путь
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Layout style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            paddingInline: 16,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // полупрозрачный
          }}
        >
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
                styles={{
                  body: {
                    padding: 20,
                    background: "rgba(0,0,0,0.7)",
                    color: "white",
                  },
                }}
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
              style={{ flex: 1, background: "transparent" }}
              items={items}
            />
          )}
        </Header>

        <Content style={{ padding: "24px 50px" }}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "24px",
              borderRadius: "12px",
              color: "white",
              minHeight: "calc(100vh - 64px - 120px)", // учесть header и footer
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Divider style={{ borderColor: "white", color: "white" }} />

        <Footer
          style={{
            textAlign: "center",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white"
          }}
        >
          <ContactUs />
        </Footer>
      </Layout>
    </div>
  );
};
