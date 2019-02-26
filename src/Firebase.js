import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

var config = {
apiKey: "AIzaSyBb3Fc76U-ALWri6BGCipOxmH66RsgJi3w",
authDomain: "baby-scorecard.firebaseapp.com",
databaseURL: "https://baby-scorecard.firebaseio.com",
projectId: "baby-scorecard",
storageBucket: "baby-scorecard.appspot.com",
messagingSenderId: "146839958959"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
