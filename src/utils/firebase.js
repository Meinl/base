import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAzYfcnznCX4dxzBipVF1FIMxJX9zZNS9M",
  authDomain: "taxi-app-10a1a.firebaseapp.com",
  databaseURL: "https://taxi-app-10a1a.firebaseio.com",
  projectId: "taxi-app-10a1a",
  storageBucket: "taxi-app-10a1a.appspot.com",
  messagingSenderId: "607834333167"
}

firebase.initializeApp(config)

export const database = firebase.database()