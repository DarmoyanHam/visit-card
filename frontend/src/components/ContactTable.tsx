import { Table, Input, Checkbox } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import "./ContactTable.css";

interface ContactData {
  key: string;
  label: string;
  value: string;
  enabled: boolean;
}

const initialData: ContactData[] = [
  { key: "1", label: "Phone", value: "", enabled: true },
  { key: "2", label: "Telegram", value: "", enabled: false },
  { key: "3", label: "WhatsApp", value: "", enabled: false },
  { key: "4", label: "Facebook", value: "", enabled: false },
];

export const ContactTable = () => {
  const [data, setData] = useState(initialData);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setData(prev =>
      prev.map(item =>
        item.key === key ? { ...item, enabled: checked } : item
      )
    );
  };

  const handleInputChange = (key: string, value: string) => {
    setData(prev =>
      prev.map(item =>
        item.key === key ? { ...item, value } : item
      )
    );
  };

  const columns: ColumnsType<ContactData> = [
    {
      title: "",
      dataIndex: "enabled",
      render: (_: any, record: ContactData) => (
        <Checkbox
          checked={record.enabled}
          onChange={e => handleCheckboxChange(record.key, e.target.checked)}
        />
      ),
      width: 60,
    },
    {
      title: "Type",
      dataIndex: "label",
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (_: any, record: ContactData) => (
        <Input
          value={record.value}
          onChange={e => handleInputChange(record.key, e.target.value)}
          disabled={!record.enabled}
        />
      ),
    },
  ];

  return (
    <div className="custom-table-wrapper">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
        className="custom-dark-table"
      />
    </div>
  );
}
