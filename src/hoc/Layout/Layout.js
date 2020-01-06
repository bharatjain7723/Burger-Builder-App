import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state={
        showSidebar: false
    }

    sidebarCloseHandler = ()=>{
        this.setState({showSidebar: false});
    }

    sidebarOpenHandler = () =>{
        this.setState({showSidebar: true})
    }

    sidebarToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSidebar: !prevState.showSidebar};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                 drawerToggleClicked={this.sidebarToggleHandler}
                 opened={this.sidebarOpenHandler}/>
                <Sidedrawer
                 closed={this.sidebarCloseHandler}
                 open={this.state.showSidebar}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default Layout;