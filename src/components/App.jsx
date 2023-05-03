import React from 'react'
import ContactForm from './ContactsForm/ContactForm'
import Filter from './Filter/Filter'
import ContactsList from './ContactsList/ContactsList'
import {Container} from './AppStyled'
import { nanoid } from 'nanoid'

class App extends React.Component{
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  newState = (name,number) =>{
    if(this.state.contacts.find(option => option.name.toLowerCase() === `${name}`.toLowerCase())){
      return alert(`${name} is already in contact`)
    }

    if(this.state.contacts.find(option => option.number === `${number}`)){
      return alert(`${number} is already in contact`)
    }

    const updateSlice = [{id: `id-${nanoid()}`, name:`${name}`, number:`${number}`}]
    const currentState = this.state.contacts

    this.setState({contacts:[...currentState,...updateSlice]})
  }

  deleteName = (event) =>{
    const currentState = this.state.contacts
    const newState = currentState.filter(option => option.id !== `${event.currentTarget.id}`)
    this.setState({contacts:[...newState]})
    
  }

  filterName = (event) =>{
    this.setState({filter:`${event.currentTarget.value}`})
  }
  
  render(){
    
    const {filter} = this.state
    const currentState = this.state.contacts
    const newState = currentState.filter(option => option.name.toLowerCase().includes(`${filter.toLowerCase()}`))
    
    return (
      <Container>
    <h1>PhoneBook</h1>
    <ContactForm
    newState={this.newState}
    />
    
    <h2>Contacts</h2>
    <Filter
    filterName={this.filterName}
    filterValue={this.state.filter}
    />
    <ContactsList
    deleteName={this.deleteName}
    events={newState}
    /> 
    </Container>
  );
}
};

export default App