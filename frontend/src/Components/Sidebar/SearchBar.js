import { Search } from 'lucide-react';
function SearchBar() {
    return (
        <div className="relative flex-1 w-[500px]">
            <div className="bg-neutral-800 rounded-full flex items-center px-6 py-4">
                <Search className="h-5 w-5 text-neutral-400" />
                <input
                    type="text"
                    placeholder="What do you want to play?"
                    className="bg-transparent border-none outline-none text-sm px-2 w-full text-neutral-400"
                />
            </div>
        </div>
    );
}
export default SearchBar;