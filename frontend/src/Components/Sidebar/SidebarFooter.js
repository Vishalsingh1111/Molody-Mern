import { Globe } from 'lucide-react';

function SidebarFooter() {
    return (
        <div className="mt-20 text-xs text-neutral-400">
            <div className="flex flex-wrap gap-3 mb-3">
                <a href="#" className="hover:underline">Legal</a>
                <a href="#" className="hover:underline">Safety & Privacy Center</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
                <a href="#" className="hover:underline">Cookies</a>
                <a href="#" className="hover:underline">About Ads</a>
                <a href="#" className="hover:underline">Accessibility</a>
            </div>

            <button className="border border-neutral-600 rounded-full py-1 px-3 flex items-center gap-1 mb-3">
                <Globe className="w-4 h-4" />
                <span>English</span>
            </button>
        </div>
    );
}

export default SidebarFooter;