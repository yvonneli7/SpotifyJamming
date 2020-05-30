import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handTermChange = this.handTermChange.bind(this);
    }

    handleSearch(){
        let term = this.state.searchTerm;
        this.props.onSearch(term);
    }

    handTermChange(event){
        let searchTerm = event.target.value;
        this.setState({
            searchTerm: searchTerm
        });
    }
    
    render(){
        return (
            <div class="SearchBar">
                <input onChange = {this.handTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button onClick = {this.handleSearch} className="SearchButton">SEARCH</button>
            </div>
        );
    }
}
export default SearchBar;