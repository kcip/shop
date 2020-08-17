import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
 apiKey: "AIzaSyBJbDDKitbsYjIYapxZIOqBF1ktUEzYygQ",
 authDomain: "shop-20fdd.firebaseapp.com",
 databaseURL: "https://shop-20fdd.firebaseio.com",
 projectId: "shop-20fdd",
 storageBucket: "shop-20fdd.appspot.com",
 messagingSenderId: "763710794386",
 appId: "1:763710794386:web:2d13dfddd7710b2fd0544b"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
 if (!userAuth) return;
 const userRef = firestore.doc(`users/${userAuth.uid}`);
 const snapShot = await userRef.get();

 if (!snapShot.exists) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
   await userRef.set({
    displayName,
    email,
    createdAt,
    ...additionalData
   })
  } catch (error) {
   console.log('error', error.message)
  }
 }
 return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase;