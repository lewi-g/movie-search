import React from 'react'
import Search from './search'

function Header(props){
  return (
    <header className="App-header">
      <h1>{props.text}</h1> 
      <Search search={props.search}/>
    </header>
  )
}

export default Header;
