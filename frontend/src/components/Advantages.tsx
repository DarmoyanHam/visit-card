import { Card, Typography, List, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";


const { Title, Text } = Typography;

const advantages = [
  "Contactum VISIT CARD application enables you to to use it in 3 languages: Armenian, Russian, English.",
  "Your Contactum VISIT CARD application will be given with your own logo or individual photo.",
  "Your card will contain references(buttons) such as phone number, email, SMS, Facebook, Instagram, etc.",
  "Contactum VISIT CARD enables you to get sales in almost all companies which use this application as well.",
  "In the \"Employee\" section you can include details of your all employees(phone number, email, booking of the visit, SMS, etc).",
  "The \"Branches\" button includes all the information of the branches of the current company.",
  "The card enables the customer to add your contact details with one touch. Along with that, website references will be added too.",
  "You can book your visit in Contactum VISIT CARD mentioning your details, date and time of the visit as well as send messages any time you like.",
  "Contactum VISIT CARD is easily uploaded to your home screen and enables you to use it without having a physical card with you.",
  "Along with Contactum VISIT CARD you will be provided with QR code which you can use in any case as it totally includes your application.",
  "You can share your Contactum VISIT CARD in a series of social websites.",
];

export const Advantages = () => {
    return <>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <Card
            style={{
                backgroundColor: "#001529",
                borderColor: "white",
                borderWidth: 1,
                borderStyle: "solid",
                width: "98%",
                background: "rgba(49, 51, 70, 0.4)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
            }}
            >
            <Title level={4} style={{ color: "white" }}>
                Advantages of Contactum Visit Card:
            </Title>

            <Divider style={{ borderColor: 'white', color: "white" }}/>

            <List
                dataSource={advantages}
                renderItem={(item) => (
                <List.Item>
                    <Text style={{ color: "white" }}>
                    <CheckOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                    {item}
                    </Text>
                </List.Item>
                )}
            />
            </Card>
        </div>
    </>
}