import React, {useState} from 'react'

function Search(props) {
  const [searchValue,setSearchValue] = useState('')
  
  const handleSearchInputChanges = (e)=> {
    setSearchValue(e.target.value)
  }
  
  const resetInputField = ()=> setSearchValue('')
  
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }
  
  return (
    <form className="search">
      <input type="text"
      onChange={handleSearchInputChanges}
      value = {searchValue}
      />
      <input type="submit" onClick={callSearchFunction} value='SEARCH'/>
    </form>
  )
}

export default Search