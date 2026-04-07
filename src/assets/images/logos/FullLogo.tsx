const FullLogo = () => {
  return (
   <div className='flex justify-center items-center'>
      <img
        src="https://crm.prospectvine.com/assets/img/logo.png"
        alt=""
        className='w-logo h-logo block dark:hidden rtl:scale-x-[-1]'
      />
      <img
        src="https://crm.prospectvine.com/assets/img/app_logo_mini.png"
        alt=""
        className='w-logo h-logo hidden dark:block rtl:scale-x-[-1]'
      />
      <span className='text-foreground font-bold text-lg'>
        ProspectVine CRM
      </span>
    </div>
  );
};

export default FullLogo;
