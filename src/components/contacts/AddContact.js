import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addContact } from '../../actions/contactActions';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
		street: '',
		suite: '',
		city: '',
		zipcode: '',
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, street, suite, city, zipcode } = this.state;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }
		
		if(street === '') {
			this.setState({errors: {street: 'Street is required'}});
			return;
		}
		
		if(suite === '') {
			this.setState({errors: {suite: 'Suite is required'}});
			return;
		}
		
		if(city === '') {
			this.setState({errors: {city: 'City is required'}});
			return;
		}
		
		if(zipcode === '') {
			this.setState({errors: {zipcode: 'Zip Code is required'}});
			return;
		}
	  
	 const { id } = this.props.match.params;

    const newContact = {
	    id,
      name,
      email,
      phone,
			address: {
				street,
				suite,
				city,
				zipcode	
			}
    };

    this.props.addContact(newContact);

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
			street: '',
			suite: '',
			city: '',
			zipcode: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, street, suite, city, zipcode, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
						<TextInputGroup 
							label="Street"
							name="street"
							placeholder="Enter Street"
							value={street}
							onChange={this.onChange}
							error={errors.street}
						/>
						<TextInputGroup 
							label="Suite"
							name="suite"
							placeholder="Enter Suite"
							value={suite}
							onChange={this.onChange}
							error={errors.suite}
						/>
						<TextInputGroup 
							label="City"
							name="city"
							placeholder="Enter City"
							value={city}
							onChange={this.onChange}
							error={errors.city}
						/>
						<TextInputGroup 
							label="Zip Code"
							name="zipcode"
							placeholder="Enter Zip Code"
							value={zipcode}
							onChange={this.onChange}
							error={errors.zipcode}
						/>
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-dark btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
	addContact: PropTypes.func.isRequired
}

export default connect(null, { addContact })(AddContact);
