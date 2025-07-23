import { Button } from "antd";
import "./cards.css";

export const ContactCard = ({ icon, label, link, id }) => {
    return <Button
          className="contact-buttons"
          key={id}
          href={link}
          icon={icon}
          type="default"
          size="large"
          block
        />
}