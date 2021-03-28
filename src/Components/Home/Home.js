import React from 'react';
import { useHistory } from "react-router-dom";

import axios from "axios";

import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";

import "./Home.css"

const Home = (props) => {
    let history = useHistory();
    
    // calling NASA searchAPI and sending it to App.js component via setResultItem

    const handleSearchQuery = (e) => {
        e.preventDefault(); 
        const fetchSearchResult = async (searchItem) => {
            const searchResult = await axios(process.env.REACT_APP_NASA_SEARCH_API+searchItem);
            props.setResultItem(searchResult.data.collection.items);
            history.push("/search");
        }
        fetchSearchResult(props.searchItem);
    }

    // displaying NASA APOD if it loads

    return props.loading ? (<h1>is loading...</h1>) : (
        <div className="Home">
            <Navbar />
            <nav className="searchStyle">
                <h2>{props.items.title}</h2>
                <Search handleSearchQuery={handleSearchQuery} searchItem={props.searchItem} setSearchItem={props.setSearchItem}/>
            </nav>
            <div className="imageOfDaySection">
                <img src={props.items.url} alt="image-of-the-day"/>
                <p className="description">{props.items.explanation}</p>
                <p className="date">{props.items.date}</p>
            </div>
            <p className="copyrightInfo">© {props.items.copyright}</p>
        </div>
    );
}
 
export default Home;