interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="flex items-start">
        <span className="font-fira font-medium text-[2rem] text-primary">
          #
        </span>
        <span className="font-fira font-medium text-[2rem] text-white">
          {title}
        </span>
      </div>
      <div className="flex-1 h-px bg-primary"></div>
    </div>
  );
}
