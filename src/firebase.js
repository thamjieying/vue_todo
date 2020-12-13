import firebase from 'firebase';

const projectId = process.env.VUE_APP_PROJECT_ID
console.log('process.env', process.env)

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

export default firebase.initializeApp(config)