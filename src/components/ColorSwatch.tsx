export default function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div
      className="swatch"
      style={{ backgroundColor: color }}
      title={color}
      aria-label={`${name}: ${color}`}
    />
  );
}
