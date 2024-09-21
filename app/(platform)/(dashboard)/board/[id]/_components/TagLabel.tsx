// Utility function to convert hex color to RGB
function hexToRgb(hex: string) {
  // Remove the '#' if present
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values from the hex string
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

// Utility function to calculate perceived lightness
function calculatePerceivedLightness(r: number, g: number, b: number) {
  return (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
}

const TagLabel = ({ name, color }: { name: string; color: string }) => {
  const [r, g, b] = hexToRgb(color);
  const perceivedLightness = calculatePerceivedLightness(r, g, b);

  const lightnessThreshold = 0.6;
  const backgroundAlpha = 0.18;
  const borderAlpha = 0.3;
  const lightenBy = (lightnessThreshold - perceivedLightness) * 100;

  const backgroundColor = `rgba(${r}, ${g}, ${b}, ${backgroundAlpha})`;
  const borderColor = `hsla(${Math.round((r + g + b) / 3)}, 100%, ${Math.min(
    100,
    lightenBy
  )}%, ${borderAlpha})`;
  const textColor = perceivedLightness > 0.5 ? "#000" : "#fff"; // Adjust text color based on lightness

  return (
    <div
      className="py-1 px-2 w-max rounded-md"
      style={{
        backgroundColor,
        borderColor: color,
        color: color,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <p className="text-xs font-semibold">{name}</p>
    </div>
  );
};

export default TagLabel;
