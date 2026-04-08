import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";


const ClientsList = () => {
     const BCrumb = [
        {
            to: "/",
            title: "Home",
        },
        {
            title: "Clients",
        },
    ];
    return (
        <>
            <BreadcrumbComp title="Clients" items={BCrumb} />
        </>
    )
}

export default ClientsList