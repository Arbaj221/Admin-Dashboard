// modules/user/UserDetails.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Icon } from "@iconify/react";

import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import CardBox from "src/components/shared/CardBox";
import profileImg from "src/assets/images/profile/user-1.jpg";

import { userService } from "./services/userService";
import { rolesService } from "src/modules/admin/roles/services/rolesService";

const UserDetails = () => {
    const { id } = useParams();

    const [user, setUser] = useState<any>(null);
    const [roleName, setRoleName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const BCrumb = [
        { to: "/", title: "Home" },
        { title: "User Profile" },
    ];

    const loadData = async () => {
        if (!id) return;

        try {
            const [userData, roles] = await Promise.all([
                userService.getUserById(Number(id)),
                rolesService.getRoles(),
            ]);

            setUser(userData);

            const role = roles.find((r) => r.id === userData.roleId);
            setRoleName(role?.name || "N/A");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    if (loading) {
        return <p className="text-muted-foreground">Loading...</p>;
    }

    if (!user) {
        return <p className="text-muted-foreground">User not found</p>;
    }

    return (
        <>
            <SlimBreadcrumb title="User Profile" items={BCrumb} />

            <div className="flex flex-col gap-6">

                {/* HEADER */}
                <CardBox className="p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-6">

                        <img
                            src={profileImg}
                            alt="profile"
                            className="w-20 h-20 rounded-full"
                        />

                        <div className="flex flex-col text-center sm:text-left gap-1">
                            <h5 className="card-title">{user.username}</h5>
                            <p className="text-sm text-muted-foreground">
                                {user.jobTitle} • {user.workLocation}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Role: {roleName}
                            </p>
                        </div>

                        {/* Social icons (kept as UI enhancement) */}
                        <div className="flex gap-2 ml-auto">
                            <Icon icon="streamline-logos:facebook-logo-2-solid" width={20} />
                            <Icon icon="streamline-logos:x-twitter-logo-solid" width={20} />
                            <Icon icon="ion:logo-github" width={20} />
                        </div>

                    </div>
                </CardBox>

                {/* DETAILS */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* PERSONAL */}
                    <CardBox className="p-6">
                        <h5 className="card-title mb-4">Personal Information</h5>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground text-xs">Username</p>
                                <p>{user.username}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-xs">Email</p>
                                <p>{user.email}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-xs">Mobile</p>
                                <p>{user.mobileNumber}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-xs">Role</p>
                                <p>{roleName}</p>
                            </div>
                        </div>
                    </CardBox>

                    {/* WORK */}
                    <CardBox className="p-6">
                        <h5 className="card-title mb-4">Work Information</h5>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground text-xs">Job Title</p>
                                <p>{user.jobTitle}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-xs">Location</p>
                                <p>{user.workLocation}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-xs">Created At</p>
                                <p>{user.createdAt}</p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-xs">Updated At</p>
                                <p>{user.updatedAt}</p>
                            </div>
                        </div>
                    </CardBox>

                </div>
            </div>
        </>
    );
};

export default UserDetails;