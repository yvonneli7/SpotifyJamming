let accessToken;
const clientId = '2bee81c9516d4cfa94865d02f4c6a843';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {
            const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUri;
            this.getAccessToken();
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if(response.ok) {
                return response.json();

            }
        }).then(jsonResponse => {
            let tracks = jsonResponse.tracks;
            if(!tracks){
                return [];
            } else {
                return tracks.items.map(item => ({
                    id: item.id, 
                    name: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name,
                    uri: item.uri
                }));
            }  
            
        })
    },


    savePlaylist(playlistName, tracks){
        if(!playlistName || !tracks.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => { return response.json()}
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => {return response.json() }
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers:headers,
                    method: 'POST', 
                    body: JSON.stringify({uris: tracks})
                })
            })
        });
    }
};

export default Spotify;