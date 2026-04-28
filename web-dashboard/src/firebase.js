import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc,
  query,
  orderBy
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MOCK_STAFF = ['Security Guard A', 'Nurse Betty', 'Officer Chen', 'Dr. Smith'];

// Subscribe to real-time alerts
export const subscribeToAlerts = (callback) => {
  const alertsRef = collection(db, 'alerts');
  const q = query(alertsRef, orderBy('timestamp', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const alertsData = snapshot.docs.map(doc => ({
      id: doc.id,
      data: () => doc.data()
    }));
    callback(alertsData);
  });
};

// Update alert status
export const updateAlertStatus = async (alertId, newStatus) => {
  const alertRef = doc(db, 'alerts', alertId);
  await updateDoc(alertRef, { status: newStatus });
};

// Simulated assignment function (in a real app, this might be a Cloud Function)
export const assignStaffToAlert = async (alertId) => {
  const staff = MOCK_STAFF[Math.floor(Math.random() * MOCK_STAFF.length)];
  const alertRef = doc(db, 'alerts', alertId);
  await updateDoc(alertRef, { assignedStaff: staff });
};

// Keep this for testing from the dashboard if needed
export const createMockAlert = async () => {
  const types = ['Fire', 'Medical', 'Security'];
  const rooms = ['Lobby', 'Room 105', 'Hallway B', 'Cafeteria', 'Parking Garage'];
  
  const newAlert = {
    type: types[Math.floor(Math.random() * types.length)],
    coordinates: { 
      lat: 37.7749 + (Math.random() - 0.5) * 0.01, 
      lng: -122.4194 + (Math.random() - 0.5) * 0.01 
    },
    room: rooms[Math.floor(Math.random() * rooms.length)],
    status: 'Active',
    priority: 'High',
    timestamp: Date.now(),
    assignedStaff: MOCK_STAFF[Math.floor(Math.random() * MOCK_STAFF.length)]
  };
  
  await addDoc(collection(db, 'alerts'), newAlert);
};
