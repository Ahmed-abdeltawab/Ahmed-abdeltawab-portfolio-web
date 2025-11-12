import { personalInfo } from "@/data/personalInfo";

export default function Logo() {
  const firstName = personalInfo.name.split(" ")[0];

  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 relative">
        <div className="absolute w-1 h-1 bg-white left-[50%] top-0"></div>
        <div className="absolute w-1 h-1 bg-white left-[75%] top-[50%]"></div>
        <div className="absolute w-1 h-1 bg-white left-[75%] top-[25%]"></div>
        <div className="absolute w-1 h-1 bg-white left-[75%] top-0"></div>
        <div className="absolute w-1 h-1 bg-white left-[50%] top-[50%]"></div>
        <div className="absolute w-1 h-1 bg-white left-[25%] top-[25%]"></div>
        <div className="absolute w-1 h-1 bg-white left-0 top-[25%]"></div>
        <div className="absolute w-1 h-1 bg-white left-0 top-[50%]"></div>
        <div className="absolute w-1 h-1 bg-white left-0 top-[75%]"></div>
        <div className="absolute w-1 h-1 bg-white left-[25%] top-[75%]"></div>
      </div>
      <span className="font-fira font-bold text-white">{firstName}</span>
    </div>
  );
}
