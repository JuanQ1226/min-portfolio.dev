import { FileText } from "lucide-react";

export default function FloatingResumeButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="/JuanQuintanaCV2025v2.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 shadow-lg shadow-black/20"
        aria-label="View Resume"
      >
        <FileText size={18} className="group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
}
