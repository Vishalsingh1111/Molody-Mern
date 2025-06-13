import Logo from "../Sidebar/Logo";
import SearchBar from "../Sidebar/SearchBar";
import SidebarNavItem from "../Sidebar/SidebarNavItem";
function TopNav() {
    return (
        <div className="flex justify-between my-3 mx-3">
            <div className="flex gap-6">
                <Logo />
                <SidebarNavItem type="home" />
                <SearchBar />
            </div>
            <div className="flex items-center gap-6">
                <button className="text-neutral-400 font-medium text-md hover:text-white">Premium</button>
                <button className="text-neutral-400 font-medium text-md hover:text-white">Support</button>
                <button className="text-neutral-400 font-medium text-md hover:text-white">Download</button>
                <div className="h-6 w-px bg-neutral-700"></div>
                <button className="text-neutral-400 font-medium text-md hover:text-white">Install App</button>
                <button className="text-neutral-400 font-medium text-md hover:text-white">Sign up</button>
                <button className="bg-white text-black font-bold py-2 px-6 rounded-full text-md">
                    Log in
                </button>
            </div>
        </div>
    );
}

export default TopNav;