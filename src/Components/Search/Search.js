import React from 'react';


const Search = (props) => {
    
    return ( 
        <div className="Search">
            <form onSubmit={props.handleSearchQuery}>
                <input type="text" value={props.searchItem} placeholder="Search for images" required onChange={e => props.setSearchItem(e.target.value)}/>
                <button type="submit" >Submit</button>
            </form>
        </div>
     );
}
 
export default Search;