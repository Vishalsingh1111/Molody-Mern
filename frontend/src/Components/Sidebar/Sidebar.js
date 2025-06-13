
import SidebarFooter from "./SidebarFooter";
import CreateCard from "./CreateCard";
import { Plus } from 'lucide-react';

function Sidebar() {
    return (
        <div className="w-80 bg-neutral-900 rounded-lg p-3 flex flex-col">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-base">Your Library</h2>
                    <Plus className="w-5 h-5 text-neutral-400" />
                </div>
            </div>

            <CreateCard
                title="Create your first playlist"
                description="It's easy, we'll help you"
                buttonText="Create playlist"
            />

            <CreateCard
                title="Let's find some podcasts to follow"
                description="We'll keep you updated on new episodes"
                buttonText="Browse podcasts"
            />

            <SidebarFooter />
        </div>
    );
}

export default Sidebar;