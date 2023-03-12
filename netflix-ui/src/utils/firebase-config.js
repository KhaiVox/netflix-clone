import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBSC1ohaeLtW7f2--0J-ncNEy2tQ0pABhg',
    authDomain: 'react-netflix-clone-32d86.firebaseapp.com',
    projectId: 'react-netflix-clone-32d86',
    storageBucket: 'react-netflix-clone-32d86.appspot.com',
    messagingSenderId: '278833527595',
    appId: '1:278833527595:web:f66475ddfc50bfb551e36e',
    measurementId: 'G-P6DE7QB964',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
