
import React, { useState } from 'react';
import axios from 'axios';

function NewArtist() {
    const [formData, setFormData] = useState({
        Name: '',
        Nationalism: '',
        Duration: ''
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('image', image);

        try {
            const res = await axios.post('http://localhost:3003/artist', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Uploaded:', res.data);
            alert('Artist Details uploaded successfully!');
            setFormData({
                Name: '',
                Nationalism: '',
                Duration: ''
            });
            setImage(null);
        } catch (err) {
            console.error(err);
            alert('Error uploading artist details.');
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Upload Artist details </h2>
                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        name="Name"
                        placeholder="Artist Name"
                        value={formData.Name}
                        onChange={handleChange}
                        className="bg-gray-700 text-white placeholder-gray-400 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="text"
                        name="Nationalism"
                        placeholder="Artist Nationalism"
                        value={formData.Nationalism}
                        onChange={handleChange}
                        className="bg-gray-700 text-white placeholder-gray-400 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        type="text"
                        name="Duration"
                        placeholder="Duration of Artist"
                        value={formData.Duration}
                        onChange={handleChange}
                        className="bg-gray-700 text-white placeholder-gray-400 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div>
                        <label className="block text-gray-300 mb-2">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-black hover:file:bg-green-500"
                            required
                        />
                        {image && <img src={URL.createObjectURL(image)} alt="Cover Preview" className="w-32 h-32 object-cover mt-3 rounded-md shadow-md" />}
                    </div>



                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-md transition">
                        Upload Details
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewArtist;
