import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import {useNavigate} from 'react-router-dom'
import './SearchBar.css'
const SearchBar = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const handleClick = () => {
        navigate(`/search/${value}`)
        navigate(0)
    }
    const handleEnter = (e) => {
        if(e.keyCode === 13){
            handleClick()
        }
    }
    const handleChange = (e) => {
      setValue(e.target.value)
    }
  return (
    <div className="backgroundImg">
      <div className="inputBox">
        <input type="text" required id='searchInput' value={value} onKeyDown={handleEnter} onChange={handleChange}/>
        <FcSearch className="icon" size={30} onClick={handleClick}/>
        <span>搜尋免費相片</span>
        <i></i>
      </div>
    </div>
  );
};

export default SearchBar;
