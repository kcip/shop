import React from 'react'
import SignIn from '../signIn/SignIn'
import SignUp from '../../components/signUp/signUp'
import './signInAndUp.scss'

const SignInAndUp = () => {
 return (
  <div className="sign-in-and-sign-up">
   <SignIn />
   <SignUp />
  </div>
 )
}
export default SignInAndUp;