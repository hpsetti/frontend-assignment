import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import axios from "axios";

import Home from './Components/Home/Home';
import SearchPage from "./Components/SearchPage/SearchPage";

import './App.css';


function App() {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchItem,  setSearchItem] = useState('');
  const [resultItem, setResultItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    const fetchPOD = async () => {
      const result = await axios(process.env.REACT_APP_NASA_APOD_URI);

      setItems(result.data);
      setLoading(false);
    }
    fetchPOD();
  },[]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home loading={loading} items={items}  searchItem={searchItem} setSearchItem={setSearchItem} setResultItem={setResultItem}/>
          </Route>
          <Route path="/search" exact>
            <SearchPage resultItem={resultItem} searchItem={searchItem} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} indexOfLastPost={indexOfLastPost} indexOfFirstPost={indexOfFirstPost}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
