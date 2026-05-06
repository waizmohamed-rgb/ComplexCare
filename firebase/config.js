import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBEe_oQk2oKSjn4iNheEekq8L-xfWZnbwA",
  authDomain: "complexcare-facff.firebaseapp.com",
  projectId: "complexcare-facff",
  storageBucket: "complexcare-facff.firebasestorage.app",
  messagingSenderId: "777712230859",
  appId: "1:777712230859:web:b88904ada020821ef0964e"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);