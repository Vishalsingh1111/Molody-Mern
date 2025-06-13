

// import { createContext, useContext, useState, useRef, useEffect } from 'react';

// const MusicContext = createContext();

// export const MusicProvider = ({ children }) => {
//     const [currentSong, setCurrentSong] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [duration, setDuration] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [volume, setVolume] = useState(0.7);
//     const [playlist, setPlaylist] = useState([]);
//     const [isShuffle, setIsShuffle] = useState(false);
//     const [isRepeat, setIsRepeat] = useState(false);

//     // Reference to audio element
//     const audioRef = useRef(null);

//     // Function to play a song
//     const playSong = (song) => {
//         if (currentSong?.songUrl === song.songUrl) {
//             // If it's the same song, just toggle play/pause
//             togglePlayPause();
//         } else {
//             // If it's a new song, set it as current and play
//             setCurrentSong(song);
//             // The actual audio source will be set in the useEffect below
//             setIsPlaying(true);

//             // Add song to playlist if not already there
//             if (!playlist.some(item => item.songUrl === song.songUrl)) {
//                 setPlaylist([...playlist, song]);
//             }
//         }
//     };

//     // Effect to handle audio playing when currentSong changes
//     useEffect(() => {
//         if (!audioRef.current || !currentSong) return;

//         audioRef.current.src = currentSong.songUrl;
//         audioRef.current.volume = volume;

//         if (isPlaying) {
//             audioRef.current.play().catch(err => {
//                 console.error("Error playing audio:", err);
//                 setIsPlaying(false);
//             });
//         }
//     }, [currentSong]);

//     // Effect to handle play/pause state changes
//     useEffect(() => {
//         if (!audioRef.current || !currentSong) return;

//         if (isPlaying) {
//             audioRef.current.play().catch(err => {
//                 console.error("Error playing audio:", err);
//                 setIsPlaying(false);
//             });
//         } else {
//             audioRef.current.pause();
//         }
//     }, [isPlaying]);

//     // Toggle play/pause
//     const togglePlayPause = () => {
//         if (!currentSong) return;
//         setIsPlaying(!isPlaying);
//     };

//     // Skip to next song
//     const nextSong = () => {
//         if (!currentSong || playlist.length <= 1) return;

//         const currentIndex = playlist.findIndex(song => song.songUrl === currentSong.songUrl);

//         if (isShuffle) {
//             // Play a random song different from current
//             let nextIndex;
//             do {
//                 nextIndex = Math.floor(Math.random() * playlist.length);
//             } while (nextIndex === currentIndex && playlist.length > 1);

//             setCurrentSong(playlist[nextIndex]);
//             setIsPlaying(true);
//         } else {
//             // Play next song in order
//             const nextIndex = (currentIndex + 1) % playlist.length;
//             setCurrentSong(playlist[nextIndex]);
//             setIsPlaying(true);
//         }
//     };

//     // Skip to previous song
//     const prevSong = () => {
//         if (!currentSong || playlist.length <= 1) return;

//         const currentIndex = playlist.findIndex(song => song.songUrl === currentSong.songUrl);

//         if (isShuffle) {
//             // Play a random song different from current
//             let prevIndex;
//             do {
//                 prevIndex = Math.floor(Math.random() * playlist.length);
//             } while (prevIndex === currentIndex && playlist.length > 1);

//             setCurrentSong(playlist[prevIndex]);
//             setIsPlaying(true);
//         } else {
//             // Play previous song in order
//             const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
//             setCurrentSong(playlist[prevIndex]);
//             setIsPlaying(true);
//         }
//     };

//     // Update progress
//     const onTimeUpdate = () => {
//         if (audioRef.current) {
//             setCurrentTime(audioRef.current.currentTime);
//         }
//     };

//     // Handle song ended
//     const onEnded = () => {
//         if (isRepeat) {
//             // Repeat the same song
//             audioRef.current.currentTime = 0;
//             audioRef.current.play();
//         } else {
//             // Play next song
//             nextSong();
//         }
//     };

//     // Load metadata
//     const onLoadedMetadata = () => {
//         if (audioRef.current) {
//             setDuration(audioRef.current.duration);
//         }
//     };

//     // Seek to position
//     const seekTo = (value) => {
//         if (audioRef.current) {
//             audioRef.current.currentTime = value;
//             setCurrentTime(value);
//         }
//     };

//     // Change volume
//     const changeVolume = (value) => {
//         if (audioRef.current) {
//             audioRef.current.volume = value;
//             setVolume(value);
//         }
//     };

//     // Toggle shuffle
//     const toggleShuffle = () => {
//         setIsShuffle(!isShuffle);
//     };

//     // Toggle repeat
//     const toggleRepeat = () => {
//         setIsRepeat(!isRepeat);
//     };

//     // Remove song from playlist
//     const removeSong = () => {
//         if (!currentSong) return;

//         const newPlaylist = playlist.filter(song => song.songUrl !== currentSong.songUrl);
//         setPlaylist(newPlaylist);

//         if (newPlaylist.length > 0) {
//             // Play next song
//             nextSong();
//         } else {
//             // No songs left in playlist
//             setCurrentSong(null);
//             setIsPlaying(false);
//         }
//     };

//     return (
//         <MusicContext.Provider
//             value={{
//                 currentSong,
//                 isPlaying,
//                 duration,
//                 currentTime,
//                 volume,
//                 playlist,
//                 isShuffle,
//                 isRepeat,
//                 audioRef,
//                 playSong,
//                 togglePlayPause,
//                 nextSong,
//                 prevSong,
//                 seekTo,
//                 changeVolume,
//                 toggleShuffle,
//                 toggleRepeat,
//                 removeSong,
//                 onTimeUpdate,
//                 onEnded,
//                 onLoadedMetadata
//             }}
//         >
//             {children}
//         </MusicContext.Provider>
//     );
// };

// export const useMusic = () => useContext(MusicContext);

import { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [playlist, setPlaylist] = useState([]);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reference to audio element
    const audioRef = useRef(null);

    // Function to get artist image URL from backend
    const getArtistImageUrl = (imagePath) => {
        if (!imagePath) return "https://i.scdn.co/image/ab67616d0000b27388e550a5645aa55c5be19b07";

        // If it's already a full URL, return as is
        if (imagePath.startsWith('http')) return imagePath;

        // Construct backend image URL
        return `https://molody-mern-6imo.onrender.com/artist/${imagePath}`;
    };

    // Function to play a song
    const playSong = (song, newPlaylist = null) => {
        // Format song with proper image URLs
        const formattedSong = {
            ...song,
            coverUrl: getArtistImageUrl(song.coverUrl || song.image),
            songUrl: song.songUrl.startsWith('http') ? song.songUrl : `https://molody-mern-6imo.onrender.com/api/${song.songUrl}`
        };

        if (currentSong?.songUrl === formattedSong.songUrl) {
            // If it's the same song, just toggle play/pause
            togglePlayPause();
        } else {
            // If it's a new song, set it as current and play
            setCurrentSong(formattedSong);
            setIsPlaying(true);

            // Handle playlist updates
            if (newPlaylist) {
                // Format all songs in the new playlist
                const formattedPlaylist = newPlaylist.map(s => ({
                    ...s,
                    coverUrl: getArtistImageUrl(s.coverUrl || s.image),
                    songUrl: s.songUrl.startsWith('http') ? s.songUrl : `https://molody-mern-6imo.onrender.com/api/${s.songUrl}`
                }));

                setPlaylist(formattedPlaylist);
                const index = formattedPlaylist.findIndex(s => s.songUrl === formattedSong.songUrl);
                setCurrentIndex(index >= 0 ? index : 0);
            } else {
                // Add song to existing playlist if not already there
                const songExists = playlist.some(item => item.songUrl === formattedSong.songUrl);
                if (!songExists) {
                    const newPlaylistWithSong = [...playlist, formattedSong];
                    setPlaylist(newPlaylistWithSong);
                    setCurrentIndex(newPlaylistWithSong.length - 1);
                } else {
                    const index = playlist.findIndex(item => item.songUrl === formattedSong.songUrl);
                    setCurrentIndex(index);
                }
            }
        }
    };

    // Function to set entire playlist
    const setPlaylistAndPlay = (newPlaylist, startIndex = 0) => {
        if (!newPlaylist || newPlaylist.length === 0) return;

        // Format all songs in the playlist
        const formattedPlaylist = newPlaylist.map(song => ({
            ...song,
            coverUrl: getArtistImageUrl(song.coverUrl || song.image),
            songUrl: song.songUrl.startsWith('http') ? song.songUrl : `https://molody-mern-6imo.onrender.com/api/${song.songUrl}`
        }));

        setPlaylist(formattedPlaylist);
        setCurrentIndex(startIndex);
        setCurrentSong(formattedPlaylist[startIndex]);
        setIsPlaying(true);
    };

    // Effect to handle audio playing when currentSong changes
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        audioRef.current.src = currentSong.songUrl;
        audioRef.current.volume = volume;

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.error("Error playing audio:", err);
                    setIsPlaying(false);
                });
            }
        }
    }, [currentSong]);

    // Effect to handle play/pause state changes
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.error("Error playing audio:", err);
                    setIsPlaying(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Toggle play/pause
    const togglePlayPause = () => {
        if (!currentSong) return;
        setIsPlaying(!isPlaying);
    };

    // Skip to next song
    const nextSong = () => {
        if (!currentSong || playlist.length <= 1) return;

        let nextIndex;

        if (isShuffle) {
            // Play a random song different from current
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentIndex && playlist.length > 1);
        } else {
            // Play next song in order
            nextIndex = (currentIndex + 1) % playlist.length;
        }

        setCurrentIndex(nextIndex);
        setCurrentSong(playlist[nextIndex]);
        setIsPlaying(true);
    };

    // Skip to previous song
    const prevSong = () => {
        if (!currentSong || playlist.length <= 1) return;

        let prevIndex;

        if (isShuffle) {
            // Play a random song different from current
            do {
                prevIndex = Math.floor(Math.random() * playlist.length);
            } while (prevIndex === currentIndex && playlist.length > 1);
        } else {
            // Play previous song in order
            prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        }

        setCurrentIndex(prevIndex);
        setCurrentSong(playlist[prevIndex]);
        setIsPlaying(true);
    };

    // Play specific song from playlist
    const playFromPlaylist = (index) => {
        if (index >= 0 && index < playlist.length) {
            setCurrentIndex(index);
            setCurrentSong(playlist[index]);
            setIsPlaying(true);
        }
    };

    // Update progress
    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle song ended
    const onEnded = () => {
        if (isRepeat) {
            // Repeat the same song
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(err => {
                    console.error("Error repeating audio:", err);
                });
            }
        } else {
            // Play next song
            nextSong();
        }
    };

    // Load metadata
    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Seek to position
    const seekTo = (value) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };

    // Change volume
    const changeVolume = (value) => {
        if (audioRef.current) {
            audioRef.current.volume = value;
            setVolume(value);
        }
    };

    // Toggle shuffle
    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    // Toggle repeat
    const toggleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    // Remove song from playlist
    const removeSong = (songToRemove = null) => {
        const targetSong = songToRemove || currentSong;
        if (!targetSong) return;

        const newPlaylist = playlist.filter(song => song.songUrl !== targetSong.songUrl);
        setPlaylist(newPlaylist);

        if (newPlaylist.length > 0) {
            // If we removed current song, play next one
            if (targetSong.songUrl === currentSong?.songUrl) {
                const newIndex = Math.min(currentIndex, newPlaylist.length - 1);
                setCurrentIndex(newIndex);
                setCurrentSong(newPlaylist[newIndex]);
                setIsPlaying(true);
            } else {
                // Update current index if needed
                const newCurrentIndex = newPlaylist.findIndex(song => song.songUrl === currentSong.songUrl);
                if (newCurrentIndex >= 0) {
                    setCurrentIndex(newCurrentIndex);
                }
            }
        } else {
            // No songs left in playlist
            setCurrentSong(null);
            setIsPlaying(false);
            setCurrentIndex(0);
        }
    };

    // Add song to playlist
    const addToPlaylist = (song) => {
        const formattedSong = {
            ...song,
            coverUrl: getArtistImageUrl(song.coverUrl || song.image),
            songUrl: song.songUrl.startsWith('http') ? song.songUrl : `https://molody-mern-6imo.onrender.com/api/${song.songUrl}`
        };

        const songExists = playlist.some(item => item.songUrl === formattedSong.songUrl);
        if (!songExists) {
            setPlaylist([...playlist, formattedSong]);
        }
    };

    // Clear playlist
    const clearPlaylist = () => {
        setPlaylist([]);
        setCurrentSong(null);
        setIsPlaying(false);
        setCurrentIndex(0);
    };

    return (
        <MusicContext.Provider
            value={{
                currentSong,
                isPlaying,
                duration,
                currentTime,
                volume,
                playlist,
                isShuffle,
                isRepeat,
                currentIndex,
                audioRef,
                playSong,
                togglePlayPause,
                nextSong,
                prevSong,
                playFromPlaylist,
                seekTo,
                changeVolume,
                toggleShuffle,
                toggleRepeat,
                removeSong,
                addToPlaylist,
                clearPlaylist,
                setPlaylist: setPlaylistAndPlay,
                getArtistImageUrl,
                onTimeUpdate,
                onEnded,
                onLoadedMetadata
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);