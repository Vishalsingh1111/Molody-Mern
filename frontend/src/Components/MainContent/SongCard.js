import { Play, Pause } from 'lucide-react';
import { useMusic } from '../../Context/MusicContext';

function SongCard({ song }) {
    const { currentSong, isPlaying, playSong } = useMusic();

    // Check if this card's song is the current song and is playing
    const isCurrentSongPlaying = currentSong?.songUrl === song.songUrl && isPlaying;

    // Check if this is the current song (regardless of playing status)
    const isCurrentSong = currentSong?.songUrl === song.songUrl;

    const handleClick = () => {
        playSong(song);
    };

    return (
        <div
            onClick={handleClick}
            className={`group bg-transparent rounded-md p-4 cursor-pointer hover:bg-neutral-800 transition duration-300 relative min-h-[300px]  ${isCurrentSong ? 'bg-neutral-800' : ''}`}
        >
            <div className="mb-4 relative">
                <img
                    src={song.coverUrl}
                    alt={song.songName}
                    className="w-full aspect-square object-cover rounded shadow-lg"
                />
                <div
                    className={`absolute bottom-2 right-2 bg-green-500 text-black p-2 rounded-full shadow-black shadow-xl transition-opacity duration-300 
                    ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    {isCurrentSongPlaying ? <Pause size={30} /> : <Play size={30} />}
                </div>
            </div>
            <h3 className={`font-bold text-base ${isCurrentSong ? 'text-green-500 ' : ''}`}>{song.songName}</h3>
            <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{song.artist}</p>
        </div>
    );
}


export default SongCard;