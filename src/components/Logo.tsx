import { Bird } from "lucide-react";

export default function Logo() {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-heron-500 text-slate-950 shadow-md shadow-heron-500/25">
        <Bird className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <div className="text-sm font-extrabold tracking-tight text-white">
          Heronfy
        </div>
        <div className="text-xs text-slate-400">Social Media</div>
      </div>
    </div>
  );
}