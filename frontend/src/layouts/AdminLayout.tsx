import { NavLink, Outlet } from "react-router-dom";
import {
  ADMIN_PATH,
  ADMIN_HOME_PATH,
  ADMIN_CONTACTS_PATH,
  ADMIN_SPONSORS_PATH,
  ADMIN_STATISTICS_PATH,
} from "../consts/paths";
import {
  HomeOutlined,
  ContactsOutlined,
  TeamOutlined,
  BarChartOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Drawer, Button, Grid } from "antd";
import { useState } from "react";
import logo from "../assets/Logo.png";
import { Footer } from "antd/es/layout/layout";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const items = [
  {
    key: ADMIN_HOME_PATH,
    label: <NavLink to={ADMIN_HOME_PATH}>Home</NavLink>,
    icon: <HomeOutlined />,
  },
  {
    key: ADMIN_CONTACTS_PATH,
    label: <NavLink to={ADMIN_CONTACTS_PATH}>Contacts</NavLink>,
    icon: <ContactsOutlined />,
  },
  {
    key: ADMIN_SPONSORS_PATH,
    label: <NavLink to={ADMIN_SPONSORS_PATH}>Companies</NavLink>,
    icon: <TeamOutlined />,
  },
  {
    key: ADMIN_STATISTICS_PATH,
    label: <NavLink to={ADMIN_STATISTICS_PATH}>Statistics</NavLink>,
    icon: <BarChartOutlined />,
  },
];

export const AdminLayout = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/BG_neww.png')`,
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: isMobile ? "0 8px" : "0 16px",
            height: isMobile ? 64 : 80,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: 24,
              marginRight: 32,
            }}
          >
            <img src={logo} alt="logo" style={{ height: isMobile ? 70 : 80 }} />
          </div>

          {isMobile ? (
            <>
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: "white", fontSize: 20 }} />}
                onClick={() => setDrawerVisible(true)}
                style={{ marginLeft: "auto" }}
                className="login-button"
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                styles={{
                  body: { padding: 20, background: "#001529", color: "white" },
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
              defaultSelectedKeys={[`${ADMIN_PATH}/${ADMIN_HOME_PATH}`]}
              style={{ flex: 1, background: "transparent" }}
              items={items}
            />
          )}
        </Header>

        <Content style={{ padding: "5px" }}>
          <div
            style={{
              // backgroundColor: "rgba(0, 0, 0, 0.5)",
              // backdropFilter: "blur(6px)",
              padding: isMobile ? "12px" : "24px 50px",
              borderRadius: "12px",
              color: "white",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <Outlet />
            <Button className="login-button" icon={<LogoutOutlined />}>Log out</Button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
