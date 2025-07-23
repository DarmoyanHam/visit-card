import { Card, Avatar, Typography, Space, Button, QRCode, Divider, Row, Col, Affix, Modal } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  SendOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { buttons } from "./ContactButtons";
import { ContactCard } from "./ContactCard";
import "./cards.css";
import { useState, useRef, useEffect } from "react";

const { Title, Text, Link } = Typography;

const VisitCard = () => {
    const contactURL = "https://link.khachatryanholding.com/VisitCard";

    const [isModalVisible, setIsModalVisible] = useState(false);
    const downloadLinkRef = useRef(null);


  useEffect(() => {
    // Показываем модал при монтировании
    setIsModalVisible(true);
  }, []);

  const handleOk = () => {
    // Программный клик по ссылке
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <>
            {/* Невидимая ссылка */}
        <a
            href="/contact.vcf"
            download
            ref={downloadLinkRef}
            style={{ display: "none" }}
        >
            Скрытая ссылка
        </a>

        {/* Модал при открытии */}
        <Modal
            title="Добавить в контакты"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Да, скачать"
            cancelText="Нет"
        >
            <p>Хотите добавить этот контакт себе?</p>
        </Modal>

        <Card
        style={{ maxWidth: 400, margin: "auto", textAlign: "center", marginTop: 60 }}
        >
        <Avatar
            size={96}
            src="https://your-photo-url.jpg"
            style={{ marginBottom: 16 }}
        />
        <Title level={3}>Артур Хачатрян</Title>
        <Text type="secondary">dfngoingiomdomgoimomofmgoimfoidmgodifmgodfmgoidm goidm so; dfmgofm glkmdf glkmfdlk mglksdmf gkldmfmg dlkgmalmglkroi ngotinribnni utnbiunbiunyb linlbkn bjknfkjbnks sR 5g01t513g51t3g510t3g513g5r 1yh351n35 d1 35b13 gf51b3b50g3b510fd3y510h3y5df6h8s1tf6g1hw6r51g0135r105ga 103s5r1g3 5a1r 5ag01r35g103er5 01g3are81 g3 a5er1g3 5er01 g35e1r3 51er35g 01ar35 g01a3e5r1 g35ae10g 350a1r 35g50r 35g135er13g50 aer35g135r1 35eg013e5r3gera51g3 5ae1r0g 3e5r g3e1r35 g 135g013ae50r1g3er01 g</Text>

        <Row gutter={16}>
            
                {buttons.map((button) => 
                    <Col span={6}>
                        <ContactCard 
                            label={button.label}
                            icon={button.icon}
                            link={button.link}
                            id={button.id}
                        />
                    </Col>
                )}
        </Row>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <QRCode value={contactURL} size={160} />
        </div>

        <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
            Отсканируй QR-код
        </Text>

        <Button
            className="vcf-button"
            type="primary"
            block
            style={{ marginTop: 16 }}
            onClick={() => navigator.clipboard.writeText(contactURL)}
        >
            Скопировать ссылку
        </Button>
        <Affix offsetBottom={10}>
            <a href="contact.vcf" download>
                <Button
                    className="vcf-button"
                    icon={<UserAddOutlined />}
                    type="default"
                    size="large"    
                >
                    Add to contacts
                </Button>
            </a>
        </Affix>


        </Card>
    </>
  );
};

export default VisitCard;
