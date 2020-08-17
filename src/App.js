import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndUp'
import Header from './components/header/Header'
import Checkout from './components/checkout/Checkout'


import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends Component {


 unsubscribeFromAuth = null

 componentDidMount() {
  const { setCurrentUser } = this.props

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
   if (userAuth) {
    const userRef = await createUserProfileDocument(userAuth);

    userRef.onSnapshot(snapShot => {
     setCurrentUser({
      id: snapShot.id,
      ...snapShot.data()
     });
    });
   }
   setCurrentUser(userAuth)
  });
 }

 componentWillUnmount() {
  this.unsubscribeFromAuth()
 }
 render() {
  return (
   <div className="App">
    <Header />
    <Switch>
     <Route exact path="/" component={HomePage} />
     <Route path="/shop" component={ShopPage} />
     <Route exact path="/checkout" component={Checkout} />
     <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)} />
    </Switch>

   </div>
  );

 }


}

const mapStateToProps = createStructuredSelector({
 currentUser: selectCurrentUser
})



const mapDispatchToProps = dispatch => ({
 setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);