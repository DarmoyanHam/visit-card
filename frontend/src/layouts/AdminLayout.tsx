import { NavLink, Outlet } from "react-router-dom";
import {
  ADMIN_PATH,
  ADMIN_HOME_PATH,
  ADMIN_CONTACTS_PATH,
  ADMIN_SPONSORS_PATH,
  ADMIN_APPOINTMENTS_PATH,
  ADMIN_STATISTICS_PATH,
} from "../consts/paths";
import {
  HomeOutlined,
  ContactsOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Drawer, Button, Grid } from "antd";
import { useState } from "react";
import logo from "../assets/l4_vc_logo.png";

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
    label: <NavLink to={ADMIN_SPONSORS_PATH}>Sponsors</NavLink>,
    icon: <TeamOutlined />,
  },
  {
    key: ADMIN_APPOINTMENTS_PATH,
    label: <NavLink to={ADMIN_APPOINTMENTS_PATH}>Appointments</NavLink>,
    icon: <CalendarOutlined />,
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
    <Layout style={{ minHeight: "100vh", backgroundColor: "#000526ff" }}>
      <Header style={{ display: "flex", alignItems: "center", paddingInline: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: 24,
            marginRight: 32,
          }}
        >
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
              styles={{ body: { padding: 0, background: "#001529" } }} // <- новейший синтаксис
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
            style={{ flex: 1 }}
            items={items}
          />
        )}
      </Header>

      <Content style={{ padding: "24px 50px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
