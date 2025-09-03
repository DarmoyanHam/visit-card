import { useEffect, useState } from "react";
import { Card, Button, Modal, Row, Col, Space, Avatar } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CompanyForm } from "./CompanyForm";
import { IP } from "../consts/ip";
import { useTranslation } from "react-i18next";

interface StaffMember {
  id?: number;
  name: string;
  position: string;
  phoneNumber?: string;
  photoBase64?: string;
}

interface StaffMemberToSend {
  id?: number;
  name: string;
  position: string;
  phoneNumber?: string;
  photo?: string; 
}

interface Company {
  id?: number;
  name: string;
  staffList: StaffMember[];
  logoUrl?: string;
  description?: string;
}

const token = localStorage.getItem("token");

export const CompanyContainer = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
  console.log("useEffect: Loading companies. Token exists:", !!token);
  fetch(`http://${IP}:8080/api/companies/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("useEffect: Fetch companies response status:", res.status);
      return res.json();
    })
    .then((data) => {
      let loadedCompanies: Company[] = [];
      if (Array.isArray(data)) {
        loadedCompanies = data.map((company) => ({
          ...company,
          staffList: company.staffList.map((member: any) => ({
            ...member,
            photoBase64: member.photo 
              ? (isValidBase64(member.photo) || member.photo.startsWith('data:image'))
                ? member.photo 
                : getImageSrc(member.photo) 
              : undefined,
            photo: undefined,
          })),
          logoUrl: company.logoUrl 
            ? (isValidBase64(company.logoUrl) || company.logoUrl.startsWith('data:image'))
              ? company.logoUrl
              : getImageSrc(company.logoUrl)
            : undefined
        }));
      }
      setCompanies(loadedCompanies);
      console.log("useEffect: Companies loaded:", loadedCompanies.length);
    })
    .catch((err) => console.error("Failed to load companies", err));
}, []);


  const handleAdd = () => {
    setEditingCompany(null);
    setModalVisible(true);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(JSON.parse(JSON.stringify(company)));
    setModalVisible(true);
  };

  const handleSave = async (company: Company & { staffList: any[] }) => {
    const login = localStorage.getItem("login");

    const url = company.id
      ? `http://${IP}:8080/api/companies/${company.id}`
      : `http://${IP}:8080/api/companies/create?adminLogin=${login}`;

    const method = company.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...company,
        staffList: company.staffList.map((s) => ({
          ...s,
          company: undefined,
        })),
      }),
    });

    if (res.ok) {
    const savedCompany = await res.json();
    console.log("Saved company response:", savedCompany);

    let finalCompanyData;
    
    try {
      const freshRes = await fetch(`http://${IP}:8080/api/companies/${savedCompany.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (freshRes.ok) {
        const freshData = await freshRes.json();
        console.log("Fresh company data:", freshData);
        
        finalCompanyData = {
          ...freshData,
          staffList: freshData.staffList.map((member: any) => ({
            ...member,
            photoBase64: member.photo 
              ? (isValidBase64(member.photo) || member.photo.startsWith('data:image'))
                ? member.photo 
                : getImageSrc(member.photo)
              : undefined,
            photo: undefined,
          })),
          logoUrl: freshData.logoUrl 
            ? (isValidBase64(freshData.logoUrl) || freshData.logoUrl.startsWith('data:image'))
              ? freshData.logoUrl
              : getImageSrc(freshData.logoUrl)
            : undefined
        };
      } else {
        finalCompanyData = {
          ...savedCompany,
          staffList: savedCompany.staffList.map((member: any) => ({
            ...member,
            photoBase64: member.photo,
            photo: undefined,
          })),
        };
      }
    } catch (error) {
      console.error("Error fetching fresh data:", error);
      finalCompanyData = {
        ...savedCompany,
        staffList: savedCompany.staffList.map((member: any) => ({
          ...member,
          photoBase64: member.photo,
          photo: undefined,
        })),
      };
    }

    console.log("Final company data for state:", finalCompanyData);

    setCompanies((prev) =>
      company.id
        ? prev.map((c) => (c.id === finalCompanyData.id ? finalCompanyData : c))
        : [...prev, finalCompanyData]
    );

    handleCancel();
  }
  };

  const handleDelete = async (id: number) => {
    console.log(`handleDelete: Deleting company id ${id}`);
    const res = await fetch(`http://${IP}:8080/api/companies/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    console.log("handleDelete: Delete response status:", res.status);
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingCompany(null);
  };

  const isValidBase64 = (str: string) => {
    try {
      return /^[A-Za-z0-9+/=]+$/.test(str) && btoa(atob(str)) === str;
    } catch (e) {
      return false;
    }
  };

  const getImageSrc = (url?: string) => {
    if (!url) {
      console.log("getImageSrc: No URL provided");
      return undefined;
    }
    if (url.startsWith("data:image")) {
      console.log("getImageSrc: Direct base64 data provided");
      return url;
    }
    if (isValidBase64(url)) {
      console.log("getImageSrc: Converting valid base64 string to data URL");
      return `data:image/png;base64,${url}`;
    }
    if (url.startsWith("http")) {
      console.log("getImageSrc: Using direct HTTP URL");
      return url;
    }
    console.log("getImageSrc: Constructing server URL");
    const constructedUrl = `http://${IP}:8080/${url}`;
    console.log(`getImageSrc: Constructed URL: ${constructedUrl}`);
    return constructedUrl;
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="login-button">
        {t("companies.add")}
      </Button>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {companies.map((company) => (
          <Col key={company.id} span={8}>
            <Card
              style={{
                WebkitBackdropFilter: "blur(12px)",
                background: "rgba(49, 51, 70, 0.4)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              }}
              styles={{ header: { backgroundColor: "#1e1f25", color: "white" } }}
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {company.logoUrl && (
                    <Avatar
                      src={getImageSrc(company.logoUrl)}
                      size={32}
                      onError={() => {
                        console.error(`Failed to load logo for company ${company.name}`);
                        return true;
                      }}
                    />
                  )}
                  {company.name}
                </div>
              }
              extra={
                <Space>
                  <Button
                    onClick={() => handleEdit(company)}
                    icon={<EditOutlined />}
                  />
                  <Button
                    onClick={() => handleDelete(company.id!)}
                    icon={<DeleteOutlined />}
                  />
                </Space>
              }
            >
              <p style={{ color: "white" }}>
                <b>{t("companies.description")}</b> {company.description || "No description"}
              </p>
              <p style={{ color: "white" }}>
                <b>{t("companies.staff")}</b> {company.staffList.length}
              </p>
              <ul style={{ paddingLeft: 16, listStyle: "disc", color: "white" }}>
                {company.staffList.map((member, index) => (
                  <li key={index} style={{ marginBottom: 4 }}>
                    <span>
                      <b>{member.position}:</b> {member.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        destroyOnHidden={true}
      >
        <CompanyForm
          initialData={editingCompany}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};