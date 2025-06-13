function ArtistCard({ artist }) {
    return (
        <div className="group cursor-pointer">
            <div className="relative mb-3">
                <img
                    src={artist.image}
                    alt={artist.Name}
                    className="w-full aspect-square object-cover rounded-full shadow-lg"
                />
            </div>
        </div>
    );
}
export default ArtistCard;