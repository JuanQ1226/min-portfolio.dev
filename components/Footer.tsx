import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-xs text-muted-foreground/30">
          Juan Quintana
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/JuanQ1226"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/juan-quintana-06468724b"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:juan.quintana5@upr.edu"
            className="text-muted-foreground/40 hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
