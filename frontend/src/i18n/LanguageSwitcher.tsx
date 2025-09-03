import { Button, Space } from "antd";
import i18n from "i18next";
import "flag-icons/css/flag-icons.min.css";

export const LanguageSwitcher = () => {
  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Space>
      <Button type="text" onClick={() => changeLang("en")} className="login-button" icon={<span className="fi fi-gb fis" style={{ fontSize: "20px" }}></span>}>
        EN
      </Button>
      <Button type="text" onClick={() => changeLang("ru")} className="login-button" icon={<span className="fi fi-ru fis" style={{ fontSize: "20px" }}></span>}>
        RU
      </Button>
      <Button type="text" onClick={() => changeLang("am")} className="login-button" icon={<span className="fi fi-am fis" style={{ fontSize: "20px" }}></span>}>
        AM
      </Button>
    </Space>
  );
};
