import React, { Component } from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../../components/custom-button/CustomButton'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import './signin.scss'
export default class SignIn extends Component {
 constructor(props) {
  super(props);

  this.state = {
   email: '',
   password: ''
  }
 }

 handleSubmit = async event => {
  event.preventDefault();
  const { email, password } = this.state;

  try {
   await auth.signInWithEmailAndPassword(email, password)
   this.setState({
    email: '',
    password: ''
   })
  } catch (error) {
   console.log(error)
  }



 }

 handleChange = event => {
  const { value, name } = event.target;
  this.setState({ [name]: value })
 }
 render() {
  return (
   <div className="sign-in">
    <h2>I already have an account</h2>
    <span>Sign in with your email and password</span>
    <form onSubmit={this.handleSubmit}>
     <FormInput
      name="email"
      type="email"
      handleChange={this.handleChange}
      value={this.state.email}
      label="email"
     />

     <FormInput
      name="password"
      handleChange={this.handleChange}
      value={this.state.password}
      label="password"
      type="password" />

     <div className="buttons">
      <CustomButton type="submit"> Signin </CustomButton>
      <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn> Signin with Google</CustomButton>
     </div>

    </form>
   </div>
  )
 }
}
