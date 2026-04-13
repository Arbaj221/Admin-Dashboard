import { Link } from "react-router"
import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";

const UsersList = () => {
    const BCrumb = [
        {
            to: "/",
            title: "Home",
        },
        {
            title: "Users",
        },
    ];
    return (
        <>
            <SlimBreadcrumb title="Users" items={BCrumb} />
            <div>
                <Link to="/users/details" >Go to Details</Link>
            </div>
        </>
    )
}

export default UsersList