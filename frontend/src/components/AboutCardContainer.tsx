import { Card, Typography, Image, Space } from "antd";
import phone from "../assets/a_c_p_eng.png";
import { Advantages } from "./Advantages";
import "./cards.css";

const { Title } = Typography;

export const AboutCardContainer = () => {
    return <>
        <Space direction="vertical" style={{ display: 'flex' }}>
            <div style={{  display: "flex", justifyContent: "center" }}>
                <Card
                    style={{
                        backgroundColor: "#001529",
                        borderColor: "white",
                        borderWidth: 1,
                        borderStyle: "solid",
                        width: "70%",
                    }}
                >
                    <Title level={4} style={{ color: "white", fontSize: "1.2rem" }} className="about-title">
                        You no longer need to write down your phone number, data, social media, website on paper, as all these features are included in the L4 VISIT CARD's. You will enter the Card application with one touch using the NFC system or QR code.
                    </Title>
                </Card>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", textAlign: "center", }}>
                <Image
                    src={phone}
                    alt="Preview"
                    preview={false}
                    style={{
                        width: "60%",     
                        height: "auto",   
                        marginTop: "4rem" 
                    }}
                />
            </div>
            <Advantages />
        </Space>
    </>
}