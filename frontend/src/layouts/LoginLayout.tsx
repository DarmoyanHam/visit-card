import { Outlet, NavLink } from "react-router-dom";
import { Divider, Layout, Menu, Typography } from "antd";
import {
  HOME_PATH,
  ABOUT_PATH,
  ORDER_PATH,
  PARTNERS_PATH,
  LOGIN_PATH
} from "../consts/paths";
import logo from "../assets/l4_vc_logo.png";
import { ContactUs } from "../components/ContactUsContainer";
import whatsapp from "../assets/icons/whatsapp.svg";


const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

const items = [
  {
    key: `/${LOGIN_PATH}`,
    label: <NavLink to={`/${LOGIN_PATH}`}>Main</NavLink>,
  },
  {
    key: `/${ABOUT_PATH}`,
    label: <NavLink to={`/${ABOUT_PATH}`}>About Card</NavLink>,
  },
  {
    key: `/${ORDER_PATH}`,
    label: <NavLink to={`/${ORDER_PATH}`}>To Order</NavLink>,
  },
  {
    key: `/${PARTNERS_PATH}`,
    label: <NavLink to={`/${PARTNERS_PATH}`}>Partners</NavLink>,
  },
];

export const LoginLayout = () => {
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
          defaultSelectedKeys={[HOME_PATH]}
          style={{ flex: 1 }}
          items={items}
        />
      </Header>

      <Content style={{ padding: "24px 50px" }}>
        <Outlet />
      </Content>

      <Divider style={{ borderColor: 'white', color: "white" }} />

      <Footer style={{ textAlign: "center",  background: "#000526ff" }}>
        <ContactUs />
        {/* {<Paragraph style={{color: "white"}}>Business Card ©2025</Paragraph>} */}

      </Footer>
    </Layout>
  );
};
