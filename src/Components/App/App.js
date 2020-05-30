import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

let track = {name : 'fun song', artist: 'bob', album: 'album 1', id: 1};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [track, track, track],
      playlistTracks: [],
      playlistName: 'New Playlist'
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);


  }

  addTrack(track){
    let tracks = this.state.playlistTracks;

    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      tracks.push(track);
      this.setState({
        playlistTracks : tracks
      })
    }

  }

  removeTrack(track){
    console.log('suk');
    let tracks = this.state.playlistTracks;

    let newPlaylist = tracks.filter(element => element.id !== track.id);
    console.log(newPlaylist);
    this.setState({
      playlistTracks: newPlaylist
    });
  }

  changePlaylistName(name){
    this.setState({
      playlistName: name

    });
  }


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}   />
            <Playlist playlistTracks = {this.state.playlistTracks} playlistName = {this.state.playlistName} onRemove = {this.removeTrack} changePlaylistName = {this.changePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
