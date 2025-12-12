import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} CodeReviewAI. All rights reserved.
          </p>
          <p>
            Developed by <span className="font-semibold text-primary">Ruwini Tharanga</span>
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-destructive fill-destructive" /> for better code
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
