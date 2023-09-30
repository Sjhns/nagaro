import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAr4lvMPZRQO8ygX_UDmeGhR_NptyjRoRA',
  authDomain: 'nagaro-471ee.firebaseapp.com',
  projectId: 'nagaro-471ee',
  storageBucket: 'nagaro-471ee.appspot.com',
  messagingSenderId: '408705754959',
  appId: '1:408705754959:web:a8b7b59eb5ea9857fa473a',
}

const app = initializeApp(firebaseConfig)
export const firebaseStore = getStorage(app)
