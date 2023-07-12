// firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

/**
 * Convenience method to initialize firebase app
 * https://firebase.google.com/docs/reference/js/firebase?authuser=1#initializeapp
 * @param  {Object} config - FIREBASE_CONFIG during the build process
 * @returns {App} - Creates and initializes a Firebase app instance.
 */
const initialize = (config) => {
  const firebaseApp = initializeApp(config)
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  return {
    firebaseApp, auth, db
  }
}

export default initialize
