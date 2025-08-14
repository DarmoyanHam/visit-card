import { Card, Typography, Image, Space } from "antd";
import phone from "../assets/a_c_p_eng.png";
import { Advantages } from "./Advantages";
import "./cards.css";

const { Paragraph, Text } = Typography;

export const AboutCardContainer = () => {
    return <>
        <Space direction="vertical" style={{ display: 'flex' }}>
            <div style={{  display: "flex", justifyContent: "center" }}>
                <Card
                    style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        width: "98%",
                        background: "rgba(49, 51, 70, 0.4)", // полупрозрачный фон
                        backdropFilter: "blur(10px)", // эффект стекла
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                        borderRadius: "12px",
                    }}
                >
                    <Text style={{ color: "white", fontSize: "1.2rem" }} className="about-title">
                        You no longer need to write down your phone number, data, social media, website on paper, as all these features are included in the our cards. You will enter the Card application with one touch using the NFC system or QR code.
                    </Text>
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