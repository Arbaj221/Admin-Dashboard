import { Link } from "react-router"
import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

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
            <BreadcrumbComp title="Users" items={BCrumb} />
            <div>
                <Link to="/users/details" >Go to Details</Link>
            </div>
        </>
    )
}

export default UsersList