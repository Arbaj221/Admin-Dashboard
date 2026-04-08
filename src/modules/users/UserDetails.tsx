import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

const UserDetails = () => {
    const BCrumb = [
        {
            to: "/",
            title: "Home",
        },
        {
            to: '/users',
            title: "Users",
        },
        {
            title: "User Details",
        },
    ];

    return (
        <>
            <BreadcrumbComp title="User-Details" items={BCrumb} />
            <div>Hello World!</div>
        </>
    );
};
export default UserDetails