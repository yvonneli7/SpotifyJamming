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
      playlistTracks: [{name : 'fun song2', artist: 'bob2', album: 'album 2', id: 2}],
      playlistName: 'New Playlist'
    }

    this.addTrack = this.addTrack.bind(this);


  }

  addTrack(track){
    let tracks = this.state.playlistTracks;

    this.state.playlistTracks.find(element => {
      if(element.id === track.id){
        return;
      }
      tracks.push(track);
      this.setState({playlistTracks: tracks});


    });


  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}  />
            <Playlist playlistTracks = {this.state.playlistTracks} playlistName = {this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
