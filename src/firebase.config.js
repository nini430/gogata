import {initializeApp,getApp,getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyCbyjhbZ_XFQdJxTOYP84h3U3snKiX6rH0",
    authDomain: "restaurantapp-c6201.firebaseapp.com",
    databaseURL: "https://restaurantapp-c6201-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-c6201",
    storageBucket: "restaurantapp-c6201.appspot.com",
    messagingSenderId: "161006340937",
    appId: "1:161006340937:web:d0cd657e6142e1fd946898"
  };


const app=getApps.length>0? getApp():initializeApp(firebaseConfig);

const firestore=getFirestore(app);
const storage=getStorage(app);

export {app,firestore,storage};
