import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">Facebook</span>
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} ChatSaaS, Inc. Todos os direitos
            reservados.
          </p>
          <div className="flex justify-center mt-2 space-x-4 text-xs text-muted-foreground">
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              to="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
