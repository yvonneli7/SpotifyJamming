import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    render(){
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return <Track isRemoval = {this.props.isRemoval} onAdd = {this.props.onAdd} track = {track} onRemove = {this.props.onRemove}/>
                })}
            </div>
        );
    }
}

export default TrackList;