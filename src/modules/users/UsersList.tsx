import { Link } from "react-router"

const UsersList = () => {
    return (
        <div className="h-dvh">
            <div>
                <Link to="/users/details" >Go to Details</Link>
            </div>
        </div>
    )
}

export default UsersList