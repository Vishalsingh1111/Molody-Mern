function PromoBanner() {
    return (
        <div className="mt-auto bg-gradient-to-r from-indigo-500 to-blue-400 text-white p-4 rounded-lg flex justify-between items-center">
            <div>
                <p className="font-bold">Preview of Spotify</p>
                <p className="text-sm">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
            </div>
            <button className="bg-white text-black font-bold py-3 px-6 rounded-full text-sm">
                Sign up free
            </button>
        </div>
    );
}
export default PromoBanner;