import React, { useState } from 'react';

const ImageUpload = () => {
    const [image, setImage] = useState<string | null>(null); // For preview
    const [base64, setBase64] = useState<string | null>(null);

    // Handle file input and convert to Base64
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String); // Preview
                setBase64(base64String.split(',')[1]); // Remove prefix for backend
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };

    // Upload to Backend
    const handleUpload = async () => {
        if (!base64) return;

        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 }),
            });
        } catch (error) {
        }
    };

    return (
        <div>
            {/* {JSON.stringify({ image: base64 })} */}
            <p>{base64}</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
            <button onClick={handleUpload} disabled={!base64}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
