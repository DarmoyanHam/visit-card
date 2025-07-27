import { Typography, Button } from "antd";
import whatsapp from "../assets/icons/whatsapp.svg";
import viber from "../assets/icons/viber.svg";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import telegram from "../assets/icons/telegram.svg";
import tiktok from "../assets/icons/tiktok.svg";
import "./cards.css";

const { Title, Paragraph } = Typography;

const contacts = [
    {label: "whatsApp", icon: whatsapp, link: "https://api.whatsapp.com/send/?phone=37433220094&text&type=phone_number&app_absent=0"},
    {label: "Viber", icon: viber, link: "viber://add?number=37433220094"},
    {label: "Facebook", icon: facebook, link: "https://www.facebook.com/L4VisitCard"},
    {label: "Instagram", icon: instagram, link: "https://www.instagram.com/l4.vcard/?igsh=bjV5NGh6dWdoeTdh&utm_source=qr#"},
    {label: "Telegram", icon: telegram, link: "https://t.me/L4vcard"},
    {label: "Tiktok", icon: tiktok, link: "https://www.tiktok.com/@l4.vcard?_t=8mP8sQJO958&_r=1"},
];

export const ContactUs = () => {
    return <>
        <Title level={1} style={{ color: "white" }}>Contact us</Title>
        <Paragraph style={{ color: "white" }}>Address: 2/2, 195, Davtashen A. Mikoyan, Yerevan, RA</Paragraph>
        <Paragraph style={{ color: "white" }}>info@vcard.l4.am</Paragraph>
        <Paragraph style={{ color: "white" }}>+37433220094</Paragraph>
        {contacts.map((contact) => 
            <Button className="links"
                key={contact.label}
                type="text"
                onClick={() => window.open(contact.link, "_blank")}
                icon={
                <img
                    src={contact.icon}
                    alt={contact.label}
                    style={{ width: 24, height: 24 }}
                />
                }
            />
        )}
    </>
}