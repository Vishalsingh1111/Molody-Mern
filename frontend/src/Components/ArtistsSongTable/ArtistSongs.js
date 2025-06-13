
// ArtistSongs.jsx
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Play, Pause, Shuffle, MoreHorizontal } from "lucide-react";
import { useMusic } from "../../Context/MusicContext"; // Adjust path as needed
import TopNav from "../MainContent/TopNav";
import Sidebars from "../Sidebar/Sidebar";

function ArtistSongs() {
    const { id } = useParams();
    const location = useLocation();
    const artistName = location.state?.artistName;
    const artistImg = location.state?.artistImg;

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [artistInfo, setArtistInfo] = useState({
        name: artistName || "Unknown Artist",
        monthlyListeners: "3,25,733",
        verified: true,
        coverImage: artistImg || "https://i.scdn.co/image/ab67616d0000b27388e550a5645aa55c5be19b07" // Default image
    });

    const {
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
        playlist,
        setPlaylist,
        getArtistImageUrl
    } = useMusic();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await fetch("https://molody-mern-6imo.onrender.com/api");
                if (!res.ok) throw new Error("Failed to fetch songs");

                const data = await res.json();

                // Filter songs by artist name and format them
                const filteredSongs = data.filter(song =>
                    song.artist
                        ?.toLowerCase()
                        .split(",")
                        .map(a => a.trim())
                        .includes(artistName?.toLowerCase())
                ).map(song => ({
                    ...song,
                    songUrl: song.songUrl.startsWith('http') ? song.songUrl : `https://molody-mern-6imo.onrender.com/api/${song.songUrl}`,
                    coverUrl: getArtistImageUrl(song.coverUrl || song.image),
                    plays: Math.floor(Math.random() * 100000000) + 1000000, // Random play count for demo
                    duration: formatDuration(Math.floor(Math.random() * 180) + 120) // Random duration for demo
                }));

                setSongs(filteredSongs);

                // Update artist info - get artist image from backend
                if (filteredSongs.length > 0) {
                    // Try to get artist-specific image or use first song's cover
                    const artistImageUrl = getArtistImageUrl(`${artistName?.toLowerCase().replace(/\s+/g, '_')}.jpg`) ||
                        getArtistImageUrl(filteredSongs[0].image) ||
                        filteredSongs[0].coverUrl;

                    setArtistInfo(prev => ({
                        ...prev,
                        coverImage: artistImageUrl
                    }));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (artistName) {
            fetchSongs();
        }
    }, [artistName, getArtistImageUrl]);

    // Format duration from seconds to mm:ss
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Format play count
    const formatPlayCount = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(2)}M`.replace('.00', '');
        }
        return count.toLocaleString();
    };

    // Handle play all button click
    const handlePlayAll = () => {
        if (songs.length > 0) {
            // Set the entire songs array as playlist and play first song
            setPlaylist(songs, 0);
        }
    };

    // Handle individual song play
    const handleSongPlay = (song, index) => {
        // Check if this song is currently selected
        const isSameSong = currentSong?.songUrl === song.songUrl;

        if (isSameSong) {
            // If same song, toggle play/pause
            togglePlayPause();
        } else {
            // If different song, set playlist starting from this song and play
            const reorderedPlaylist = [
                ...songs.slice(index),
                ...songs.slice(0, index)
            ];
            setPlaylist(reorderedPlaylist, 0);
        }
    };

    // Check if current song is from this artist's songs
    const isCurrentArtistSong = currentSong && songs.some(song => song.songUrl === currentSong.songUrl);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black text-white flex items-center justify-center">
                <p className="text-xl">Loading songs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black text-white flex items-center justify-center">
                <p className="text-red-500 text-xl">Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <TopNav />
            <div className="flex bg-black text-white gap-2" style={{ height: 'calc(100vh - 160px)' }}>
                <Sidebars />
                <div className="rounded-md p-4 overflow-y-auto bg-gradient-to-b from-neutral-900 via-neutral-800 to-black text-white">
                    {/* Simplified Artist Header - Only Name and Cover */}
                    <div className="relative px-6 pt-16 pb-6 w-[1060px]">
                        <div className="flex items-center gap-6">
                            {/* Artist Image from Backend */}
                            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl">
                                <img
                                    src={artistInfo.coverImage}
                                    alt={artistInfo.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to default image if artist image fails to load
                                        e.target.src = "https://i.scdn.co/image/ab67616d0000b27388e550a5645aa55c5be19b07";
                                    }}
                                />
                            </div>

                            <div className="flex-1">
                                {artistInfo.verified && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">Verified Artist</span>
                                    </div>
                                )}

                                <h1 className="text-8xl font-black mb-6 tracking-tight">
                                    {artistInfo.name}
                                </h1>

                                <p className="text-lg opacity-80">
                                    {artistInfo.monthlyListeners} monthly listeners
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 pb-6">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handlePlayAll}
                                disabled={songs.length === 0}
                                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPlaying && isCurrentArtistSong ?
                                    <Pause className="w-6 h-6 text-black ml-0" /> :
                                    <Play className="w-6 h-6 text-black ml-1" />
                                }
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center hover:scale-110 transform transition-transform">
                                <Shuffle className="w-8 h-8 text-gray-300 hover:text-white" />
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center hover:scale-110 transform transition-transform">
                                <MoreHorizontal className="w-8 h-8 text-gray-300 hover:text-white" />
                            </button>

                            <button className="px-6 py-2 border border-gray-400 rounded-full text-sm font-semibold hover:border-white transition-colors">
                                Follow
                            </button>
                        </div>
                    </div>

                    {/* Songs Section */}
                    <div className="px-6 pb-20">
                        <h2 className="text-2xl font-bold mb-6">Popular</h2>

                        {songs.length === 0 ? (
                            <p className="text-gray-400 text-lg">No songs found for this artist.</p>
                        ) : (
                            <div className="space-y-2">
                                {songs.map((song, index) => {
                                    const isCurrentSong = currentSong?.songUrl === song.songUrl;
                                    const isCurrentPlaying = isCurrentSong && isPlaying;

                                    return (
                                        <div
                                            key={song._id || index}
                                            className="group flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                                            onClick={() => handleSongPlay(song, index)}
                                        >
                                            {/* Track Number / Play Button */}
                                            <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-white">
                                                {isCurrentPlaying ? (
                                                    <Pause className="w-4 h-4 text-green-500" />
                                                ) : isCurrentSong ? (
                                                    <Play className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <>
                                                        <span className="group-hover:hidden text-sm font-medium">
                                                            {index + 1}
                                                        </span>
                                                        <Play className="w-4 h-4 hidden group-hover:block" />
                                                    </>
                                                )}
                                            </div>

                                            {/* Song Cover from Backend */}
                                            <div className="w-10 h-10 rounded overflow-hidden">
                                                <img
                                                    src={song.coverUrl}
                                                    alt={song.songName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback to default image if song cover fails to load
                                                        e.target.src = "https://i.scdn.co/image/ab67616d0000b27388e550a5645aa55c5be19b07";
                                                    }}
                                                />
                                            </div>

                                            {/* Song Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-medium truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                                                    {song.songName}
                                                </h3>
                                                <p className="text-sm text-gray-400 truncate">
                                                    {song.artist}
                                                </p>
                                            </div>

                                            {/* Play Count */}
                                            <div className="text-sm text-gray-400 w-20 text-right">
                                                {formatPlayCount(song.plays)}
                                            </div>

                                            {/* Duration */}
                                            <div className="text-sm text-gray-400 w-12 text-right">
                                                {song.duration}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArtistSongs;