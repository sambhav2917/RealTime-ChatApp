import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#ff4d4f',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6666'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff4d4f'}
        >
            <BiPowerOff />
        </div>
    );
}
