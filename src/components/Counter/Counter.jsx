import React from 'react'
import {Container,Form,Title,Button,Text,InputText,UlContacts,LiContacts,LiButton} from './CounterStyled';

class PhoneBookContainer extends React.Component { 

    state= {
        name: '',
        number: ''
    }
    currentName = (event) =>{
        const {name,value} = event.currentTarget
        this.setState({[name]:[value]})
      }
    
    addNewName = (event) =>{
        const {name,number} = this.state
        event.preventDefault()
        this.props.newState(name,number)
  }

    render(){
    return (
        <Container>
        <Title>Phonebook</Title>
        <Form onSubmit={this.addNewName}>
        <Text>Name</Text>
        <InputText
        onChange={this.currentName}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        ></InputText>
        <Text>Number</Text>
        <InputText
        onChange={this.currentName}
  type="tel"
  name="number"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
></InputText>
        <Button type='submit'>Add contact</Button>
        </Form>
        <Title>Contacts</Title>
        <Text>Find contacts by name</Text>
        <InputText
        onChange={this.props.filterName}
        name="filter"
        >
        </InputText>
        <UlContacts>
            {this.props.events && this.props.events.map(event =>(
                <LiContacts key={event.id}>{event.name}: {event.number}
                <LiButton id={event.id} onClick={this.props.deleteName}>Delete</LiButton>
                </LiContacts>
                
            ))}
        </UlContacts>
        </Container>
    )
    } 
};

export default PhoneBookContainer
