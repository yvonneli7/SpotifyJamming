import React from 'react';

import './Playlist.css';
import TrackList from '../TrackList/TrackList';

//let defaultValue = 'New Playlist'

class Playlist extends React.Component{
    render(){
        return (
            <div className="Playlist">
                <input value={this.props.playlistName}/>
                <TrackList isRemoval = {true} tracks = {this.props.playlistTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
export default Playlist;