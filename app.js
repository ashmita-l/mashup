const APIController = (function() {
    // Spotify API Credentials
    const clientID = '8699c04be548451f94b8ac070a6bab48';
    const clientSecret = '43a9f186221747e0b5062b1221b14e96';
    //let accessToken = '';

    // Function to get access token
    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.access_token;;
    }

// API Endpoints
// https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
const _getGenres = async (token) => {
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items;
}

const _getTracks = async (token, tracksEndPoint) => {
    const limit = 10;
    const result = await fetch('${tracksEndPoint}?limit=${limit}', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer' + token}
    });

    const data = await result.json();
    return data.items;
}

const _getTrack = async (token, trackEndPoint) => {
    const result = await fetch('${trackEndPoint}', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data;
}

return {
    getToken() {
        return _getToken();
    },
    getGenres(token) {
        return _getGenres();
    },
    getTracks(token, tracksEndPoint) {
        return _getTrack();
    },
    getTrack(token, trackEndPoint) {
        return _getTrack();
    }
}
})();

// UI Module
const UIController = (function() {
    // Object to hold references to html selectors
    const DOMElements = {
        selectGenre: 'select_genre',
        selectLanguage: 'select_language',
        submitButton: '#submit_button',
        
    }
})();

