import React from 'react';

const HeaderBar = () => {

    const reloadPage = () => window.location.reload(false);

    return (
        <div className="ig-logo">
            <a href="#" onClick={reloadPage}>
                <img src="/ig_logo.png" alt="Instagram Lite" />
            </a>
        </div>
    )
}

export default HeaderBar;