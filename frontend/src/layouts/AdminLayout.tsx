import { NavLink, Outlet } from "react-router";
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
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import logo from "../assets/l4_vc_logo.png";

const { Header, Content } = Layout;

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
    return (
        <Layout style={{ minHeight: "100vh", backgroundColor:  "#000526ff" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", color: "white", fontSize: 24, marginRight: 32 }}>
                    <img
                        src={logo}
                        alt="logo"
                        style={{ height: 40, marginRight: 12 }}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[`${ADMIN_PATH}/${ADMIN_HOME_PATH}`]}
                    style={{ flex: 1 }}
                    items={items}
                />
            </Header>

            <Content style={{ padding: "24px 50px" }}>
                <Outlet />
            </Content>
        </Layout>
    );
};