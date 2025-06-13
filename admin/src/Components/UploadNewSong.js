import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadSong() {
    const [formData, setFormData] = useState({
        serialNo: '',
        songName: '',
        artist: '',
        categories: '',
        year: ''
    });

    const [cover, setCover] = useState(null);
    const [song, setSong] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categoriesOptions = ['Love', 'Sad', 'Trending', 'Pop', 'New', 'Old'];


    useEffect(() => {
        // Fetch serialNo count from backend
        const fetchSerialNo = async () => {
            try {
                const response = await fetch('https://molody-mern-6imo.onrender.com/api/count');
                const data = await response.json();
                setFormData(prev => ({ ...prev, serialNo: data.count + 1 }));
            } catch (err) {
                console.error('Error fetching song count:', err);
            }
        };
        fetchSerialNo();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoriesChange = (category) => {
        setFormData(prev => {
            const categories = prev.categories.includes(category)
                ? prev.categories.filter(cat => cat !== category)
                : [...prev.categories, category];
            return { ...prev, categories };
        });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'cover') {
            setCover(e.target.files[0]);
        } else if (e.target.name === 'song') {
            setSong(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cover || !song) {
            alert('Please upload both cover image and song file.');
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('cover', cover);
        data.append('song', song);

        try {
            const res = await axios.post('https://molody-mern-6imo.onrender.com/api', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Uploaded:', res.data);
            alert('Song uploaded successfully!');
            setFormData({
                serialNo: '',
                songName: '',
                artist: '',
                categories: '',
                year: ''
            });
            setCover(null);
            setSong(null);
        } catch (err) {
            console.error(err);
            alert('Error uploading song.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Spotify Admin - Upload Song</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="number"
                        name="serialNo"
                        value={formData.serialNo}
                        disabled
                        className="bg-gray-700 text-white p-3 rounded-md w-full cursor-not-allowed"
                    />



                    <input
                        type="text"
                        name="songName"
                        placeholder="Song Name"
                        value={formData.songName}
                        onChange={handleChange}
                        className="bg-gray-700 text-white placeholder-gray-400 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="text"
                        name="artist"
                        placeholder="Artist"
                        value={formData.artist}
                        onChange={handleChange}
                        className="bg-gray-700 text-white placeholder-gray-400 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    {/* Categories - Custom Dropdown */}
                    <div className="relative">
                        <label className="block text-gray-300 mb-2">
                            Categories
                        </label>

                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="w-full bg-gray-700 text-white p-3 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <span className="text-left">
                                {formData.categories.length > 0
                                    ? formData.categories.join(', ')
                                    : 'Select categories...'}
                            </span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                {categoriesOptions.map((category) => (
                                    <div
                                        key={category}
                                        onClick={() => handleCategoriesChange(category)}
                                        className={`flex items-center p-3 cursor-pointer hover:bg-gray-600 ${formData.categories.includes(category) ? 'bg-green-600' : ''
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 mr-3 border-2 rounded flex items-center justify-center ${formData.categories.includes(category)
                                                ? 'bg-green-400 border-green-400'
                                                : 'border-gray-400'
                                                }`}
                                        >
                                            {formData.categories.includes(category) && (
                                                <svg
                                                    className="w-3 h-3 text-black"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-white">{category}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {formData.categories.length > 0 && (
                            <div className="mt-2 p-2 bg-gray-600 rounded-md">
                                <span className="text-gray-300 text-sm">Selected ({formData.categories.length}): </span>
                                <span className="text-green-400 font-semibold">
                                    {formData.categories.join(', ')}
                                </span>
                            </div>
                        )}
                    </div>



                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleChange}
                        className="bg-gray-700 text-white placeholder-gray-400 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div>
                        <label className="block text-gray-300 mb-2">Cover Image</label>
                        <input
                            type="file"
                            name="cover"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-black hover:file:bg-green-500"
                            required
                        />
                        {cover && <img src={URL.createObjectURL(cover)} alt="Cover Preview" className="w-32 h-32 object-cover mt-3 rounded-md shadow-md" />}
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Song File</label>
                        <input
                            type="file"
                            name="song"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-black hover:file:bg-green-500"
                            required
                        />
                        {song && <audio controls src={URL.createObjectURL(song)} className="w-full mt-3 rounded-md" />}
                    </div>

                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-md transition">
                        Upload Song
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadSong;
