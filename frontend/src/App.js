import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./Main";
import { MusicProvider } from "./Context/MusicContext";
import MusicPlayer from "./Components/Common/MusicPlayers";
import Trending from "./Components/SectionsHeadersPages/Trending";
import SadSongs from "./Components/SectionsHeadersPages/Sad";
import LoveSongs from "./Components/SectionsHeadersPages/Romantic";
import ArtistSong from "./Components/ArtistsSongTable/ArtistSongs";

function App() {
  return (
    <Router>
      <MusicProvider>
        <div className="min-h-screen bg-black text-white pb-20">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/showtrendingsong" element={<Trending />} />
            <Route path="/showsadsong" element={<SadSongs />} />
            <Route path="/showlovesong" element={<LoveSongs />} />
            <Route path="/artist/:id" element={<ArtistSong />} />

          </Routes>

          {/* Music player will be fixed at bottom */}
          <MusicPlayer />
        </div>
      </MusicProvider>
    </Router>
  );
}

export default App;