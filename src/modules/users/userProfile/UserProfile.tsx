import { useEffect, useState } from "react";
import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import CardBox from "src/components/shared/CardBox";
import profileImg from "src/assets/images/profile/user-1.jpg";

import { userService } from "../services/userService";
import { rolesService } from "src/modules/admin/roles/services/rolesService";
import { departmentService } from "src/modules/admin/departments/services/departmentService";

const UserProfile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);

    const BCrumb = [
        { to: "/", title: "Home" },
        { title: "User Profile" },
    ];

    useEffect(() => {
        const loadAll = async () => {
            try {
                const [profileData, rolesData, deptData] = await Promise.all([
                    userService.getProfile(),
                    rolesService.getAllRolesList(),
                    departmentService.getAllDepartmentsList(),
                ]);

                setProfile(profileData);
                setRoles(rolesData);
                setDepartments(deptData);
            } catch {
                // handled globally
            }
        };

        loadAll();
    }, []);

    // ✅ helpers
    const getRoleName = (id: number) =>
        roles.find((r) => r.id === id)?.name || "N/A";

    const getDeptName = (id: number) =>
        departments.find((d) => d.id === id)?.name || "N/A";

    if (!profile) return null;

    return (
        <>
            <SlimBreadcrumb title="User Profile" items={BCrumb} />

            <div className="flex flex-col gap-6">
                <CardBox className="p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl w-full">

                        {/* Image */}
                        <div>
                            <img
                                src={profileImg}
                                alt="image"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between items-center w-full">
                            <div className="flex flex-col gap-1.5 text-center sm:text-left">
                                <h5 className="card-title">
                                    {profile.first_name} {profile.last_name}
                                </h5>

                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-sm text-muted-foreground">
                                        {profile.job_title}
                                    </p>

                                    <div className="hidden h-4 w-px bg-border xl:block"></div>

                                    <p className="text-sm text-muted-foreground">
                                        {profile.work_location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBox>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* Personal Info */}
                    <CardBox className="p-6">
                        <h5 className="card-title mb-6">Personal Information</h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground">First Name</p>
                                <p>{profile.first_name}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Last Name</p>
                                <p>{profile.last_name}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p>{profile.email}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Position</p>
                                <p>{profile.job_title}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Mobile</p>
                                <p>{profile.mobile_number}</p>
                            </div>
                        </div>
                    </CardBox>

                    {/* Address / Org Info */}
                    <CardBox className="p-6">
                        <h5 className="card-title mb-6">Organization Details</h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Location</p>
                                <p>{profile.work_location}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Department</p>
                                <p>{getDeptName(profile.department_id)}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Role</p>
                                <p>{getRoleName(profile.role_id)}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <p>{profile.is_active ? "Active" : "Inactive"}</p>
                            </div>
                        </div>
                    </CardBox>

                </div>
            </div>
        </>
    );
};

export default UserProfile;