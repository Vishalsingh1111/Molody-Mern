import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../Common/SectionHeader";
import ArtistCard from "./ArtistCard";

function PopularArtists() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch("http://localhost:3003/artist");
                if (!res.ok) throw new Error("Failed to fetch artists");
                const data = await res.json();
                setArtists(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) return <p>Loading artists...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="mb-8">
            <SectionHeader title="Popular Artists" link="/showartist" />

            {/* Horizontal scrollable container */}
            <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
                {artists.map((artist) => (
                    <div key={artist._id} className="relative group min-w-[200px] group bg-transparent  rounded-md p-4 cursor-pointer hover:bg-neutral-800 transition duration-300 relative">
                        {/* <Link to={`/artist/${artist._id}`}> */}
                        <Link to={`/artist/${artist._id}`} state={{ artistName: artist.Name, artistImg: artist.image }}>

                            <ArtistCard artist={artist} />
                            <div className="font-semibold text-base ">
                                {artist.Name}
                            </div>
                            <span className="text-sm text-neutral-400">Artist</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularArtists;
