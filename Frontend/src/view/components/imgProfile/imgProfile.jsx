import React, { useState, useEffect } from 'react';
import './styles.css';


const UserProfile = () => {
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        const userPhoto = localStorage.getItem('userPhoto');
        if(userPhoto) {
            setPhoto(userPhoto);
        }
    }, []);

    return (
        <div>
            {photo && <img src={`data:image/jpeg;base64,${photo}`} alt="User Profile" className="user-profile-image" />}
        </div>
    );
    
};

export default UserProfile;
