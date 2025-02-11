import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { SidebarTrigger } from "@/Components/ui/sidebar";

export default function Topbar() {
    const user = usePage().props.auth.user;

    return (
        <nav className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
            <SidebarTrigger />
            <div>
                <Link href="/" className="text-lg md:text-xl font-bold">My App</Link>
            </div>
            <div className="relative">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700">
                            {user.name} ▼
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route("logout")} method="post" as="button">Log Out</Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </nav>
    );
}
