
import React, { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import SongCard from "./SongCard";

function TrendingSongs() {
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
        <div className="mb-8">
            <SectionHeader title="Trending Songs" link="/showtrendingsong" />
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 flex-nowrap">
                    {songs.map((song) => (
                        <div key={song.id} className="w-[200px] h-[300px] flex-shrink-0">
                            <SongCard song={song} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TrendingSongs;

