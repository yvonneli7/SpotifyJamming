import React from 'react';

import './Playlist.css';
import TrackList from '../TrackList/TrackList';

//let defaultValue = 'New Playlist'

class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        let name = event.target.value;
        this.props.changePlaylistName(name);

    }

    render(){
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange = {this.handleNameChange}/>
                <TrackList isRemoval = {true} tracks = {this.props.playlistTracks}  onRemove = {this.props.onRemove}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
export default Playlist;