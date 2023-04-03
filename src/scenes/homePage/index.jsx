import React from 'react';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            home page
            <UserWidget userId={'6426ad9298089129d59cb649'} picturePath={'47 afin.jpg'}/>
        </div>
    );
};

export default HomePage;