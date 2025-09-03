import { Card, Avatar, Typography, Button, QRCode, Row, Col, Modal, Tooltip } from "antd";
import { UserAddOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./cards.css";
import type { JSX } from "react";
import { getCookie } from "../service/cookieService";
import { IP } from "../consts/ip";

const { Title, Text } = Typography;

type ContactButton = {
  icon: JSX.Element;
  link: string;
  label: string;
};

type Contact = {
  phone?: string;
  email?: string;
  telegram?: string;
  facebook?: string;
};

type Company = {
  id: number;
  name: string;
  logo: string;
};

type MainData = {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  contacts: Contact;
  companies: Company[];
};

export const PublicCard = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<MainData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCookieModalVisible, setIsCookieModalVisible] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const contactURL = `${window.location.origin}/public/${adminId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainRes = await fetch(`http://${IP}:8080/api/main/${adminId}`, {
            method: "GET",
        });

        if (mainRes.status === 404) {
          setData(null);
          return;
        }

        if (!mainRes.ok) {
          throw new Error("Ошибка при получении main");
        }

        const mainJson = await mainRes.json();

        const contactRes = await fetch(`http://${IP}:8080/api/contact/${adminId}`, {
            method: "GET",
        });
        
        let contactJson = {};
        if (contactRes.ok) {
          try {
            contactJson = await contactRes.json();
          } catch (error) {
            console.warn("Ошибка при парсинге JSON контактов:", error);
            contactJson = {};
          }
        } else {
          console.warn(`Контакты не найдены для adminId ${adminId}, статус: ${contactRes.status}`);
        }

        const companyRes = await fetch(`http://${IP}:8080/api/companies/by-admin/${adminId}`, {
            method: "GET",
        });
        
        let companyJson = [];
        if (companyRes.ok) {
          try {
            companyJson = await companyRes.json();
          } catch (error) {
            console.warn("Ошибка при парсинге JSON компаний:", error);
            companyJson = [];
          }
        } else {
          console.warn(`Компании не найдены для adminId ${adminId}, статус: ${companyRes.status}`);
        }

        const newData = {
          id: adminId!,
          name: mainJson.name,
          description: mainJson.description,
          avatar: mainJson.avatar || "",
          contacts: contactJson,
          companies: companyJson,
        };

        setData(newData);
        console.log("Загруженные данные:", newData);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [adminId]);

  useEffect(() => {
    const visitorId = getCookie("visitor_id");
    if (!visitorId) {
      setIsCookieModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  }, []);

  const handleCookieAccept = async () => {
    try {
      const res = await fetch(`http://${IP}:8080/api/cookies/consent`, { method: "POST" });
      if (!res.ok) {
        console.error("Ошибка при запросе:", res.status);
        return;
      }
      const data = await res.json();
      document.cookie = `visitor_id=${data.visitorId}; path=/; max-age=${60 * 60 * 24 * 365}`;
      setIsCookieModalVisible(false);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Ошибка при принятии cookies:", error);
      setIsCookieModalVisible(false);
      setIsModalVisible(true);
    }
  };

  const handleCookieReject = () => {
    setIsCookieModalVisible(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (downloadLinkRef.current) downloadLinkRef.current.click();
    setIsModalVisible(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(contactURL).then(() => {
      console.log("Ссылка скопирована в буфер обмена");
    }).catch(err => {
      console.error("Ошибка при копировании ссылки:", err);
    });
  };

  if (isLoading) return <p style={{ color: "#fff" }}>Загрузка...</p>;
  if (!data) return <p style={{ color: "red", fontSize: 20 }}>Такой карточки не существует</p>;

  const contactButtons: ContactButton[] = [
    data.contacts.phone
      ? { icon: <PhoneOutlined />, link: `tel:${data.contacts.phone}`, label: "Позвонить" }
      : null,
    data.contacts.email
      ? { icon: <MailOutlined />, link: `mailto:${data.contacts.email}`, label: "Написать" }
      : null,
  ].filter((c): c is ContactButton => c !== null);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url('/BG_neww.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      <Modal
        title="Использование cookie"
        open={isCookieModalVisible}
        onOk={handleCookieAccept}
        onCancel={handleCookieReject}
        okText="Принять"
        cancelText="Отклонить"
      >
        <p>Мы используем cookie только для подсчёта уникальных посетителей.</p>
      </Modal>

      <a href="/contact.vcf" download ref={downloadLinkRef} style={{ display: "none" }}>
        Скрытая ссылка
      </a>
      <Modal
        title="Добавить в контакты"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Да, скачать"
        cancelText="Нет"
      >
        <p>Хотите добавить этот контакт себе?</p>
      </Modal>

      <Card
        style={{
          width: "100%",
          maxWidth: 1200,
          minHeight: "80vh",
          textAlign: "center",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(49, 51, 70, 0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          color: "#fff",
        }}
      >
        {data.avatar && <Avatar size={140} src={data.avatar} style={{ marginBottom: 16 }} />}
        <Title level={2} style={{ color: "#fff" }}>
          {data.name}
        </Title>
        <Text style={{ marginBottom: 32, color: "#fff" }}>{data.description}</Text>

        {contactButtons.length > 0 && (
          <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 40, width: "100%" }}>
            {contactButtons.map((btn, idx) => (
              <Col key={idx}>
                <Tooltip title={btn.label}>
                  <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={btn.icon}
                    block
                    onClick={() => window.open(btn.link, "_blank")}
                  />
                </Tooltip>
              </Col>
            ))}
          </Row>
        )}

        {data.companies.length > 0 && (
          <div style={{ width: "100%", marginBottom: 40 }}>
            <Title level={4} style={{ color: "#fff" }}>
              Компании
            </Title>
            <Row gutter={[24, 24]} justify="center">
              {data.companies.map((c) => (
                <Col
                  key={c.id}
                  xs={12}
                  sm={8}
                  md={6}
                  lg={4}
                  xl={3}
                  onClick={() => navigate(`/company/${c.id}`)}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  {c.logo && <Avatar src={c.logo} size={80} />}
                  <Text style={{ display: "block", marginTop: 8, color: "#fff" }}>{c.name}</Text>
                </Col>
              ))}
            </Row>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <QRCode value={contactURL} size={160} style={{ backgroundColor: "#fff" }} />
        </div>
        <Text style={{ display: "block", marginBottom: 32, color: "#fff" }}>
          Отсканируй QR-код, чтобы открыть визитку
        </Text>

        <Button
          type="primary"
          block
          style={{ marginBottom: 16, maxWidth: 300 }}
          onClick={handleCopyLink}
        >
          Скопировать ссылку
        </Button>
      </Card>

      <a href="/contact.vcf" download>
        <Button
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
          icon={<UserAddOutlined />}
          type="default"
          size="large"
        >
          Добавить в контакты
        </Button>
      </a>
    </div>
  );
};