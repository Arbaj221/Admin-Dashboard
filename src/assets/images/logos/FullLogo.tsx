interface FullLogoProps {
  collapsed?: boolean;
}

const FullLogo = ({ collapsed = false }: FullLogoProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <img
        src="https://crm.prospectvine.com/assets/img/logo.png"
        alt="ProspectVine"
        className="w-10 h-10 block dark:hidden rtl:scale-x-[-1] flex-shrink-0"
      />
      <img
        src="https://crm.prospectvine.com/assets/img/app_logo_mini.png"
        alt="ProspectVine"
        className="w-10 h-10 hidden dark:block rtl:scale-x-[-1] flex-shrink-0"
      />
      <span
        className={`text-foreground font-bold text-lg whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
        }`}
      >
        ProspectVine
      </span>
    </div>
  );
};

export default FullLogo;