import React from 'react'
import Search from './search'

function Header(props){
  return (
    <header className="App-header">
      <h2>{props.text}</h2> 
      <Search search={props.search}/>
    </header>
  )
}

export default Header;
