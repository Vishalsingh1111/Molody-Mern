function SidebarNavItem({ type }) {
    return (
        <div className="bg-neutral-900 rounded-full p-3">
            {type === 'home' && (
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                    <path fill="currentColor" d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" />
                </svg>
            )}
        </div>
    );
}

export default SidebarNavItem;