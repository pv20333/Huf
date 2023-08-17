import React, { useState, useEffect } from 'react';

const NameProfile = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // Na renderização do componente:
    return (
        <div>
            {username}
        </div>
    );
};

export default NameProfile;
