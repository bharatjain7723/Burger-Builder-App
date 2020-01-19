import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
        price: 4
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Bharat',
                address: {
                    street: 'Ramakrishna marg',
                    zipcode: '110034',
                    country: 'India'
                },
                email: 'bharat@test.com'
            },
            deliveryMethod: 'Teleport'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            })    
        }

    render(){
        let form = '';
        if(this.state.loading){
            form = (
                <Spinner />
            )
        } else {
            form = (
                <form>
                    <input type="text" name="name" placeholder="Your Name" className={classes.Input} />
                    <input type="email" name="email" placeholder="Your Email" className={classes.Input} />
                    <input type="text" name="Street" placeholder="Street" className={classes.Input} />
                    <input type="text" name="postal" placeholder="Postal Code" className={classes.Input} />
                    <Button 
                        btnType="Success"
                        clicked={this.orderHandler}>ORDER</Button>
                </form>
            )
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;