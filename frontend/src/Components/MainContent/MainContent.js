// import TopNav from "./TopNav";
import TrendingSongs from "./TrendingSongs";
import PopularArtists from "./PopularArtists";
import PromoBanner from "./PromoBanner";
import SadSongs from "./SadSongs";
import LoveSongs from "./LoveSongs";

function MainContent() {
    return (
        <div className="flex-1 bg-neutral-900 rounded-lg p-6 overflow-y-auto">
            {/* <TopNav /> */}
            <TrendingSongs />
            <PopularArtists />
            <LoveSongs />
            <SadSongs />
            <PromoBanner />
        </div>
    );
}

export default MainContent;