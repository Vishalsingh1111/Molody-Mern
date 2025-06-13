import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, List, Pencil, Expand, Cast } from 'lucide-react';
import { useMusic } from '../../Context/MusicContext';
import { useState, useEffect } from 'react';

function MusicPlayer() {
    const {
        currentSong,
        isPlaying,
        duration,
        currentTime,
        volume,
        isShuffle,
        isRepeat,
        audioRef,
        togglePlayPause,
        nextSong,
        prevSong,
        seekTo,
        changeVolume,
        toggleShuffle,
        toggleRepeat,
        onTimeUpdate,
        onEnded,
        onLoadedMetadata,
        // playlist,
        setPlaylist,
        // playSong
    } = useMusic();

    const [showVolume, setShowVolume] = useState(false);
    const [allSongs, setAllSongs] = useState([]);
    const [readyToPlaySong, setReadyToPlaySong] = useState(null);

    // Fetch all songs on component mount
    useEffect(() => {
        const fetchAllSongs = async () => {
            try {
                const res = await fetch("https://molody-mern-6imo.onrender.com/api");
                if (!res.ok) throw new Error("Failed to fetch songs");

                const data = await res.json();
                const formattedSongs = data.map(song => ({
                    ...song,
                    songUrl: song.songUrl.startsWith('http') ? song.songUrl : `https://molody-mern-6imo.onrender.com/api/${song.songUrl}`,
                    coverUrl: song.coverUrl || song.image || "https://i.scdn.co/image/ab67616d0000b27388e550a5645aa55c5be19b07"
                }));

                setAllSongs(formattedSongs);

                // Set a random song to be ready to play
                if (formattedSongs.length > 0 && !currentSong) {
                    const randomIndex = Math.floor(Math.random() * formattedSongs.length);
                    setReadyToPlaySong(formattedSongs[randomIndex]);
                }
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchAllSongs();
    }, [currentSong]);

    // Handle play button click when no song is selected
    const handlePlayWithoutSong = () => {
        if (readyToPlaySong) {
            // Play the ready-to-play song
            const songIndex = allSongs.findIndex(song => song._id === readyToPlaySong._id);
            setPlaylist(allSongs, songIndex >= 0 ? songIndex : 0);
        } else if (allSongs.length > 0) {
            // Fallback: select a random song
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            setPlaylist(allSongs, randomIndex);
        }
    };

    // Format time in mm:ss
    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Calculate progress percentage
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Handle progress bar click
    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
        const seekPercentage = clickPosition / progressBarWidth;
        const seekTime = seekPercentage * duration;
        seekTo(seekTime);
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        const volumeBar = e.currentTarget;
        const clickPosition = e.clientX - volumeBar.getBoundingClientRect().left;
        const volumeBarWidth = volumeBar.clientWidth;
        const volumeValue = Math.max(0, Math.min(1, clickPosition / volumeBarWidth));
        changeVolume(volumeValue);
    };

    // Show player with ready-to-play song when no song is currently playing
    if (!currentSong && readyToPlaySong) {
        return (
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-black text-white px-4 py-2 gap-4 w-full">
                <div className='flex item-center gap-3 w-[400px]'>
                    {/* Hidden audio element */}
                    <audio ref={audioRef} />

                    {/* Album Art - Show ready-to-play song cover */}
                    <img
                        src={readyToPlaySong.coverUrl}
                        alt={readyToPlaySong.songName}
                        className="w-14 h-14 rounded"
                    />

                    {/* Song Info - Show ready-to-play song info */}
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <span className="font-semibold text-sm truncate text-gray-300">{readyToPlaySong.songName}</span>
                        <span className="text-xs text-gray-400 truncate">{readyToPlaySong.artist}</span>
                    </div>
                </div>

                <div className='flex item-center gap-3'>


                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        <button onClick={toggleShuffle}>
                            <Shuffle className={`w-5 h-5 ${isShuffle ? 'text-green-500' : 'text-gray-400'} hover:text-white`} />
                        </button>

                        <button disabled>
                            <SkipBack className="w-5 h-5 text-gray-700" />
                        </button>

                        <button
                            className="bg-white text-black rounded-full p-2 hover:bg-gray-200"
                            onClick={handlePlayWithoutSong}
                        >
                            <Play className="w-4 h-4" />
                        </button>

                        <button disabled>
                            <SkipForward className="w-5 h-5 text-gray-700" />
                        </button>

                        <button onClick={toggleRepeat}>
                            <Repeat className={`w-5 h-5 ${isRepeat ? 'text-green-500' : 'text-gray-400'} hover:text-white`} />
                        </button>
                    </div>

                    {/* Progress Bar - Empty initially */}
                    <div className="flex items-center gap-2 w-[300px]">
                        <span className="text-xs text-gray-700">0:00</span>
                        <div className="flex-grow bg-gray-700 h-1 rounded">
                            <div className="bg-gray-700 h-1 w-0 rounded"></div>
                        </div>
                        <span className="text-xs text-gray-700">0:00</span>
                    </div>
                </div>

                {/* Volume & Others */}
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                    <List className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />

                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowVolume(true)}
                            onMouseLeave={() => setShowVolume(false)}
                        >
                            <Volume2 className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                        </button>

                        {showVolume && (
                            <div
                                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-700 rounded cursor-pointer"
                                onClick={handleVolumeChange}
                                onMouseEnter={() => setShowVolume(true)}
                                onMouseLeave={() => setShowVolume(false)}
                            >
                                <div
                                    className="bg-white h-1 rounded"
                                    style={{ width: `${volume * 100}%` }}
                                ></div>
                            </div>
                        )}
                    </div>

                    <div
                        className="w-20 h-1 bg-gray-700 rounded cursor-pointer"
                        onClick={handleVolumeChange}
                    >
                        <div
                            className="bg-white h-1 rounded"
                            style={{ width: `${volume * 100}%` }}
                        ></div>
                    </div>

                    <Cast className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                    <Expand className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                </div>
            </div>
        );
    }

    // Fallback when no songs are loaded yet
    if (!currentSong && !readyToPlaySong) {
        return (
            <div className="fixed bottom-0 left-0 right-0 flex items-center bg-black text-white px-4 py-2 gap-4 w-full">
                {/* Hidden audio element */}
                <audio ref={audioRef} />

                {/* Loading placeholder */}
                <div className="w-14 h-14 rounded bg-neutral-800 animate-pulse"></div>

                {/* Loading song info */}
                <div className="flex flex-col flex-grow overflow-hidden">
                    <span className="font-semibold text-sm text-gray-400">Loading songs...</span>
                    <span className="text-xs text-gray-500">Please wait</span>
                </div>

                {/* Controls (disabled) */}
                <div className="flex items-center gap-4">
                    <Shuffle className="w-5 h-5 text-gray-700" />
                    <SkipBack className="w-5 h-5 text-gray-700" />
                    <div className="bg-gray-700 text-gray-500 rounded-full p-2">
                        <Play className="w-4 h-4" />
                    </div>
                    <SkipForward className="w-5 h-5 text-gray-700" />
                    <Repeat className="w-5 h-5 text-gray-700" />
                </div>

                {/* Empty progress bar */}
                <div className="flex items-center gap-2 w-[300px]">
                    <span className="text-xs text-gray-700">0:00</span>
                    <div className="flex-grow bg-gray-800 h-1 rounded">
                        <div className="bg-gray-700 h-1 w-0 rounded"></div>
                    </div>
                    <span className="text-xs text-gray-700">0:00</span>
                </div>

                {/* Volume & Others (disabled) */}
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-gray-700" />
                    <List className="w-5 h-5 text-gray-700" />
                    <Volume2 className="w-5 h-5 text-gray-700" />
                    <div className="w-20 h-1 bg-gray-800 rounded">
                        <div className="bg-gray-700 h-1 w-1/2 rounded"></div>
                    </div>
                    <Cast className="w-5 h-5 text-gray-700" />
                    <Expand className="w-5 h-5 text-gray-700" />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-black text-white px-4 py-2 gap-4 w-full ">
            <div className='flex item-center gap-3 w-[400px]'>
                {/* Hidden audio element */}
                <audio
                    ref={audioRef}
                    onTimeUpdate={onTimeUpdate}
                    onEnded={onEnded}
                    onLoadedMetadata={onLoadedMetadata}
                />

                {/* Album Art */}
                <img
                    src={currentSong.coverUrl}
                    alt={currentSong.songName}
                    className="w-14 h-14 rounded"
                />

                {/* Song Info */}
                <div className="flex flex-col flex-grow overflow-hidden">
                    <span className="font-semibold text-sm truncate">{currentSong.songName}</span>
                    <span className="text-xs text-gray-400 truncate">{currentSong.artist}</span>
                </div>

            </div>

            <div className='flex item-center gap-3'>
                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button onClick={toggleShuffle}>
                        <Shuffle className={`w-5 h-5 ${isShuffle ? 'text-green-500' : 'text-gray-400'} hover:text-white`} />
                    </button>

                    <button onClick={prevSong}>
                        <SkipBack className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                    </button>

                    <button
                        className="bg-white text-black rounded-full p-2 hover:bg-gray-200"
                        onClick={togglePlayPause}
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button onClick={nextSong}>
                        <SkipForward className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                    </button>

                    <button onClick={toggleRepeat}>
                        <Repeat className={`w-5 h-5 ${isRepeat ? 'text-green-500' : 'text-gray-400'} hover:text-white`} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 w-[300px]">
                    <span className="text-xs">{formatTime(currentTime)}</span>
                    <div
                        className="flex-grow bg-gray-700 h-1 rounded cursor-pointer"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="bg-white h-1 rounded"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <span className="text-xs">{formatTime(duration)}</span>
                </div>

            </div>

            {/* Volume & Others */}
            <div className="flex items-center gap-3 ">
                <Pencil className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                <List className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />

                <div className="relative">
                    <button
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={() => setShowVolume(false)}
                    >
                        <Volume2 className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                    </button>

                    {showVolume && (
                        <div
                            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-700 rounded cursor-pointer"
                            onClick={handleVolumeChange}
                            onMouseEnter={() => setShowVolume(true)}
                            onMouseLeave={() => setShowVolume(false)}
                        >
                            <div
                                className="bg-white h-1 rounded"
                                style={{ width: `${volume * 100}%` }}
                            ></div>
                        </div>
                    )}
                </div>

                <div
                    className="w-20 h-1 bg-gray-700 rounded cursor-pointer"
                    onClick={handleVolumeChange}
                >
                    <div
                        className="bg-white h-1 rounded"
                        style={{ width: `${volume * 100}%` }}
                    ></div>
                </div>

                <Cast className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
                <Expand className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
            </div>
        </div>
    );
}

export default MusicPlayer;