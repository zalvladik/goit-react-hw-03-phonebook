import { Component } from 'react'
import ContactForm from './ContactsForm/ContactForm'
import Filter from './Filter/Filter'
import ContactsList from './ContactsList/ContactsList'
import {Container} from './AppStyled'
import { nanoid } from 'nanoid'

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }
  
  componentDidMount(){
    if(localStorage.getItem('friendsList') === null){
      return
    }
    this.setState({contacts:JSON.parse(localStorage.getItem('friendsList'))})
  }
 
  componentDidUpdate(prevProps, prevState){
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem('friendsList', JSON.stringify(this.state.contacts))
    }

  }

  newState = (name,number) => {
    if(localStorage.getItem('friendsList') !== null){
      if(this.state.contacts.find(option => option.name.toLowerCase() === `${name}`.toLowerCase())){
        return alert(`${name} is already in contact`)
      }
  
      if(this.state.contacts.find(option => option.number === `${number}`)){
        return alert(`${number} is already in contact`)
      }
    }
      
    

    const updateSlice = [{id: `${nanoid()}`, name:`${name}`, number:`${number}`}]
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
    const newState = currentState && currentState.filter(option => option.name.toLowerCase().includes(`${filter.toLowerCase()}`))
    
    
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
    {this.state.contacts && 
    <ContactsList
    deleteName={this.deleteName}
    events={newState}
    /> }
    </Container>
  );
}
};

export default App