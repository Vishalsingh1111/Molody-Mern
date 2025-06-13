import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../MainContent/TopNav";
import SongCard from "../MainContent/SongCard";
import PromoBanner from "../MainContent/PromoBanner";

const Trending = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const res = await fetch("https://molody-mern-6imo.onrender.com/api"); // Fetch all songs
                if (!res.ok) {
                    throw new Error(`Failed to fetch songs, status: ${res.status}`);
                }
                const data = await res.json();

                // ✅ Filter songs where categories include "sad"
                const sadSongs = data.filter(song =>
                    song.categories
                        ?.toLowerCase()
                        .split(",")
                        .map(cat => cat.trim())
                        .includes("trending")
                );

                setSongs(sadSongs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSongs();
    }, []);

    if (loading) return <p>Loading songs...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <TopNav />
            <div className="flex bg-black text-white gap-2" style={{ height: 'calc(100vh - 160px)' }}>
                <Sidebar />
                {/* Main Content */}
                <div className="bg-neutral-900 rounded-md p-4 overflow-y-auto">
                    <h1 className="pt-[50px] p-4 text-white text-3xl font-bold ">Trending Songs</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5">
                        {songs.map((song) => (
                            <div key={song.id} className="w-[215px] h-[300px] flex-shrink-0">
                                <SongCard song={song} />
                            </div>
                        ))}

                    </div>
                    <PromoBanner />
                </div>

            </div>

        </>
    );
};

export default Trending;
