import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (updatedIngredients){
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients)
            .map((igKey)=>{
                return ingredients[igKey];
            })
            .reduce((sum, el)=>{
                return sum + el; 
            }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientListener = (type)=>{
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;

        const oldTotalPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newTotalPrice = oldTotalPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientListener = (type)=>{
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount <= 0){
            return;
        }
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;

        const oldTotalPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newTotalPrice = oldTotalPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = ()=>{
        alert('you continue')
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                     ingredients={this.state.ingredients}
                     purchaseContinued={this.purchaseContinueHandler}
                     purchaseCancelled={this.purchaseCancelHandler}
                     price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addedIngredient={this.addIngredientListener}
                    removedIngredient={this.removeIngredientListener}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;