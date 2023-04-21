import PhoneBookContainer from './Counter/Counter'
import React from 'react'

class App extends React.Component{
  state = {
    contacts: [],
    filter: '',
  }

  newState = (name,number) =>{
    if(JSON.parse(localStorage.getItem('contactsContainer')) === null){
      return this.firstName(name,number)
    }
  
    if(this.state.contacts.find(option => option.name === `${name}`)){
      return alert(`${name} is already in contact`)
    } 

    const id = this.state.contacts.length+1

    const updateSlice = [{id: `id-${id}`, name:`${name}`, number:`${number}`}]
    const currentState = this.state.contacts

    this.setState({contacts:[...currentState,...updateSlice]})
  }

  firstName = (name,number) =>{
    const updateSlice = [{id: `id-${1}`, name:`${name}`, number:`${number}`}]
    this.setState({contacts:[...updateSlice]})
  }

  deleteName = (event) =>{
    const currentState = this.state.contacts
    const newState = currentState.filter(option => option.id !== `${event.currentTarget.id}`)
    this.setState({contacts:[...newState]})
  }

  filterName = (event) =>{
    this.setState({filter:`${event.currentTarget.value}`})
  }
  
  componentDidUpdate(prevProps, prevState){
  if(this.state.contacts !== prevState.contacts){
  localStorage.setItem('contactsContainer', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount(prevProps, prevState){
    const contactsList = JSON.parse(localStorage.getItem('contactsContainer'))
  this.setState({contacts:contactsList})
  }

  render(){
    
    const {filter} = this.state
    const currentState = this.state.contacts
    const newState = JSON.parse(localStorage.getItem('contactsContainer')) === null 
    ? false 
    : currentState.filter(option => option.name.toLowerCase().includes(`${filter.toLowerCase()}`))

    return (
    <PhoneBookContainer
    events={newState}
    deleteName={this.deleteName}
    filterName={this.filterName}
    newState={this.newState}
    />
    
  );
}
};

export default App