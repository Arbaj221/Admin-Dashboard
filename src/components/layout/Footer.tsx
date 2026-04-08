const Footer = () => {
  return (
    <footer className="border-t border-border bg-sidebar dark:bg-sidebar mt-auto">
      <div className="px-6 py-4 flex items-center justify-center gap-2">
        <p className="text-xs text-muted-foreground">
          Designed & Developed by <span className="text-primary font-medium">ProspectVine</span>
        </p>
        <span className="w-px h-3 bg-border" />
        <p className="text-xs text-muted-foreground">
          Copyright © {new Date().getFullYear()} <span className="text-foreground font-medium">ProspectVine Pvt. Ltd.</span> — ProspectVine CRM. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;