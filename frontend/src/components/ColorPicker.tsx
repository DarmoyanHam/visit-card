import { Tag, Tooltip } from "antd";

export const ColorPickerGrid = ({ title, colors, selectedColor, onSelect }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {colors.map((color) => (
          <Tooltip key={color} title={color}>
            <Tag
              color={color}
              onClick={() => onSelect(color)}
              style={{
                cursor: "pointer",
                border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                padding: 0,
                width: 32,
                height: 32,
                borderRadius: 4,
              }}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};