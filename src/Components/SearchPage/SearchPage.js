import React from 'react';

import moment from 'moment';

import Navbar from "../Navbar/Navbar";
import Pagination from "../Pagination/Pagination"

import "./SearchPage.css"

const SearchPage = (props) => {
    // pageData collects limited amout of data from the search API
    const pageData = props.resultItem.slice(props.indexOfFirstPost,props.indexOfLastPost).map(page => page);

    // paginate changes the page number
    const paginate = (pageNumber) => {
        props.setCurrentPage(pageNumber)
    };

    return ( 
        <div className="SearchPage">
            <Navbar />
            <div className="searchContainer">
                <h2 className="searchHeading">Search Results for {props.searchItem}</h2>
                <ul>
                    {pageData.map(data => 
                            <div key={data.data[0].nasa_id} className="cardContainer">
                                    <img src={data.links[0].href}/>

                                <div className="cardData">
                                    <p>{data.data[0].title}</p>
                                    <p>{moment(data.data[0].date_created).format("MMMM Do YYYY")}</p>
                                </div>
                            </div>
                        )}
                </ul>
                <Pagination paginate={paginate} postsPerPage={props.postsPerPage} totalPosts={props.resultItem.slice(0,25).length}/>
                <div className="relatedSearches">
                    <h2>Related Searches</h2>
                    {pageData.map(item => 
                        <span key={item.data[0].nasa_id} class="badge bg-primary">{item.data[0].keywords[1]}</span>
                        )}
                </div>
            </div>
        </div>
     );
}
 
export default SearchPage;