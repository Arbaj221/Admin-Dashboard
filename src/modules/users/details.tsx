import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";

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
            <SlimBreadcrumb title="User-Details" items={BCrumb} />
            <div>Hello World!</div>
        </>
    );
};
export default UserDetails