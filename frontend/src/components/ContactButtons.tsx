import {
  PhoneOutlined, MessageOutlined, SendOutlined, LinkedinOutlined
} from '@ant-design/icons';

export const buttons = [
  { icon: <PhoneOutlined />, label: 'Phone', link: 'tel:+374XXXXXXXX', id: Date.now() },
  { icon: <MessageOutlined />, label: 'SMS', link: 'sms:+374XXXXXXXX', id: Date.now() },
  { icon: <SendOutlined />, label: 'Telegram', link: 'https://t.me/username', id: Date.now() },
  { icon: <LinkedinOutlined />, label: 'LinkedIn', link: 'https://linkedin.com/in/username', id: Date.now() },
];