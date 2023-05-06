import {UlContacts,LiContacts,LiButton} from './ContactsListStyled'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

const ContactsList = ({events,deleteName}) => {
    return(
        <UlContacts>
        {events.map(event =>(
            <LiContacts key={nanoid()}>{event.name}: {event.number}
            <LiButton id={event.id} onClick={deleteName}>Delete</LiButton>
            </LiContacts>
            
        ))}
    </UlContacts>
    )
}

ContactsList.propTypes = {
    deleteName:PropTypes.func.isRequired,
    events:PropTypes.arrayOf(
        PropTypes.exact({
            id:PropTypes.string.isRequired,
            name:PropTypes.string.isRequired,
            number:PropTypes.string.isRequired,
        })
    ),
}


export default ContactsList