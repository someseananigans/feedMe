import firebase from 'firebase/app'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBXI-o-8l_D_avAYE8SP7WuW9HO_BS4pZQ",
  authDomain: "reinsta-884d1.firebaseapp.com",
  projectId: "reinsta-884d1",
  storageBucket: "reinsta-884d1.appspot.com",
  messagingSenderId: "658502896839",
  appId: "1:658502896839:web:1e24885a2f11f3f7aec2e2",
  databaseURL: "https://reinsta-884d1.firebaseio.com"
};


firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }






