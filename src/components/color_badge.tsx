export const ColorBadge = ({ color }: { color: string }) => (
  <div className="flex items-center gap-2">
    <span>{color}</span>
    <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
  </div>
)
