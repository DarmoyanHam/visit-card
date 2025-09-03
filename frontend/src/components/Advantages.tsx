import { Card, Typography, List, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";


const { Title, Text } = Typography;

const getAdvantages = (t) => [
  t("advantages.1"),
  t("advantages.2"),
  t("advantages.3"),
  t("advantages.4"),
  t("advantages.5"),
  t("advantages.6"),
];

export const Advantages = () => {
    const {t} = useTranslation();
    const advantages = getAdvantages(t);

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
                {t("advantages.title")}
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