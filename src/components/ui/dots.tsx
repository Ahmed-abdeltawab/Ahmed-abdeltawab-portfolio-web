interface DotsProps {
  rows?: number;
  cols?: number;
}

export default function Dots({ rows = 5, cols = 4 }: DotsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="w-1 h-1 rounded-full bg-gray" />
          ))}
        </div>
      ))}
    </div>
  );
}
