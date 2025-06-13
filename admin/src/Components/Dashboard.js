import React, { useState } from 'react';
import UploadSong from './UploadNewSong';
import Artist from './NewArtist';
import { Home, Music, Upload, LogOut } from 'lucide-react';

const DashboardLayout = () => {
    const [activeView, setActiveView] = useState('artist');

    const renderContent = () => {
        switch (activeView) {
            case 'upload':
                return <UploadSong />;
            case 'artist':
            default:
                return <Artist />;
        }
    };

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 flex flex-col p-5">
                <div className="text-green-400 text-2xl font-bold mb-10">Melody Admin</div>
                <nav className="flex flex-col space-y-4 text-gray-300">
                    <button
                        onClick={() => setActiveView('artist')}
                        className={`text-left hover:text-green-400 flex items-center gap-2 ${activeView === 'artist' ? 'text-green-400' : ''}`}
                    >
                        <Music size={18} /> Artist
                    </button>
                    <button
                        onClick={() => setActiveView('upload')}
                        className={`text-left hover:text-green-400 flex items-center gap-2 ${activeView === 'upload' ? 'text-green-400' : ''}`}
                    >
                        <Upload size={18} /> Upload New Song
                    </button>
                </nav>
                <div className="mt-auto pt-10 border-t border-gray-700">
                    <a href="#" className="hover:text-red-500 flex items-center gap-2"><LogOut size={18} /> Logout</a>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-gray-800 flex items-center justify-between px-6 shadow">
                    <h1 className="text-xl font-semibold text-green-400"></h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">Admin User</span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-green-400"
                        />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-900 via-black to-black">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
