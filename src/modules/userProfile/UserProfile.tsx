import { Icon } from "@iconify/react/dist/iconify.js"
import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import CardBox from "src/components/shared/CardBox";
import profileImg from "src/assets/images/profile/user-1.jpg"

const UserProfile = () => {

    const BCrumb = [
        {
            to: "/",
            title: "Home",
        },
        {
            title: "Userprofile",
        },
    ];

    const socialLinks = [
        { href: "https://www.facebook.com/wrappixel", icon: "streamline-logos:facebook-logo-2-solid" },
        { href: "https://twitter.com/wrappixel", icon: "streamline-logos:x-twitter-logo-solid" },
        { href: "https://github.com/wrappixel", icon: "ion:logo-github" },
        { href: "https://dribbble.com/wrappixel", icon: "streamline-flex:dribble-logo-remix" },
    ];

    return (
        <>
            <SlimBreadcrumb title="User Profile" items={BCrumb} />
            <div className="flex flex-col gap-6">
                <CardBox className="p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl relative w-full break-words">
                        <div>
                            <img src={profileImg} alt="image" width={80} height={80} className="rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
                            <div className="flex flex-col sm:text-left text-center gap-1.5">
                                <h5 className="card-title">Mathew Anderson</h5>
                                <div className="flex flex-wrap items-center gap-1 md:gap-3">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Team Leader</p>
                                    <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">United States</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {socialLinks.map((item, index) => (
                                    <a key={index} href={item.href} target="_blank" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full shadow-md border border-ld hover:bg-gray-50 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                        <Icon icon={item.icon} width="20" height="20" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardBox>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <CardBox className="p-6 overflow-hidden">
                        <h5 className="card-title mb-6">Personal Information</h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32 mb-6">
                            <div><p className="text-xs text-gray-500">First Name</p><p>Mathew</p></div>
                            <div><p className="text-xs text-gray-500">Last Name</p><p>Anderson</p></div>
                            <div><p className="text-xs text-gray-500">Email</p><p>mathew.anderson@gmail.com</p></div>
                            <div><p className="text-xs text-gray-500">Position</p><p>Team Leader</p></div>
                        </div>
                    </CardBox>

                    <CardBox className="p-6 overflow-hidden">
                        <h5 className="card-title mb-6">Address Details</h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32 mb-6">
                            <div><p className="text-xs text-gray-500">Location</p><p>United States</p></div>
                            <div><p className="text-xs text-gray-500">Province / State</p><p>San Diego, California, United States</p></div>
                            <div><p className="text-xs text-gray-500">PIN Code</p><p>92101</p></div>
                            <div><p className="text-xs text-gray-500">ZIP</p><p>030302</p></div>
                            <div><p className="text-xs text-gray-500">Federal Tax No.</p><p>GA45273910</p></div>
                        </div>
                    </CardBox>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
