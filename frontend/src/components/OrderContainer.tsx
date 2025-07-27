import { useState } from "react";
import { Row, Col, Divider } from "antd";
import { CardPreview } from "./CardPreview";
import { ColorPickerGrid } from "./ColorPicker";
import { iconColors, iconBgColors, cardBgColors } from "../consts/colorPalette";

export const Order = () => {
  const [iconColor, setIconColor] = useState(iconColors[0]);
  const [iconBgColor, setIconBgColor] = useState(iconBgColors[0]);
  const [cardBgColor, setCardBgColor] = useState(cardBgColors[0]);

  return (
    <div style={{ padding: 32 }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12} lg={10}>
          <CardPreview
            iconColor={iconColor}
            iconBgColor={iconBgColor}
            cardBgColor={cardBgColor}
          />
        </Col>
        <Col xs={24} md={12} lg={14}>
          <ColorPickerGrid
            title="Icon Color"
            colors={iconColors}
            selectedColor={iconColor}
            onSelect={setIconColor}
          />
          <Divider />
          <ColorPickerGrid
            title="Icon Background"
            colors={iconBgColors}
            selectedColor={iconBgColor}
            onSelect={setIconBgColor}
          />
          <Divider />
          <ColorPickerGrid
            title="Card Background"
            colors={cardBgColors}
            selectedColor={cardBgColor}
            onSelect={setCardBgColor}
          />
        </Col>
      </Row>
    </div>
  );
};
