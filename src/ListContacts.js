import React from 'react';

import PropTypes from 'prop-types';

class ListContacts extends React.Component {

	static propTypes = {
		contacts: PropTypes.array.isRequired,
		remove: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (e) => {
		this.setState( () => ({ query: e.trim() }) )
	}

	clearQuery = () => {
		this.updateQuery('')
	}
	
	render(){

		const { query } = this.state;
		const { contacts, remove, onNavigate } = this.props;

		const showingContact = query === ''
			? contacts 
			: contacts.filter( e => (
				e.name.toLowerCase().includes(query.toLocaleLowerCase())
			) )
		
		return(
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input 
						className='search-contacts' 
						type='text'
						placeholder='Search Contacts'
						value={this.state.query}
						onChange={ e => this.updateQuery(e.target.value)}
					/>
					<a
						href='#create'
						onClick={onNavigate}
						className='add-contact'
					>Add Contact</a>
				</div>

				{ showingContact.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Now showing {showingContact.length} of {contacts.length}</span>
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				)}

				{/* {JSON.stringify(this.props)} */}
				<ol className='contact-list'>
					{showingContact.map((contact)=>(
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}}></div>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.handle}</p>
							</div>
							<button 
								className='contact-remove'
								onClick={ ()=>remove(contact) }
								>Remove</button>
						</li>
					))}
				</ol>	
			</div>
		)
	}
}

export default ListContacts;