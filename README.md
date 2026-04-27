# 🚨 SahayetaApp – Emergency Response System

## 📌 Overview

**SahayetaApp** is a real-time emergency response system designed to improve crisis communication, coordination, and response time in hospitality and urban environments.

The platform connects **mobile users (guests)** with a **centralized command dashboard** using a cloud-based backend, enabling instant alert generation, real-time tracking, and coordinated emergency response.

---

## 🎯 Problem Statement

In emergency situations:

* Communication is delayed
* Response coordination is inefficient
* No centralized system exists to track incidents

👉 SahayetaApp solves this by providing a **real-time unified crisis management platform**.

---

## ⚙️ Key Features

### 📱 Mobile Application (Guest Side)

* 🔴 SOS emergency button
* 📍 Automatic location capture
* ⚡ Instant alert generation
* 📞 Quick actions (contacts, helpline)
* 📚 Safety resources

---

### 🖥️ Web Dashboard (Command Center)

* 📊 Live alert monitoring
* 🔄 Real-time updates (Active / In Progress / Resolved)
* 🗺️ Live map with emergency markers
* 🧑‍🚒 First responders directory
* 🚑 Vehicle dispatch system
* 📈 Analytics dashboard

---

### ☁️ Backend (Cloud)

* Firebase Firestore (real-time database)
* Instant synchronization using onSnapshot listeners
* Stores alerts, locations, and status

---

### 🗺️ Map Integration

* Google Maps API
* Real-time location tracking
* Marker-based visualization of incidents

---

## 🔄 System Workflow

1. User presses **SOS button**
2. Location is captured (latitude & longitude)
3. Alert is stored in **Firebase Firestore**
4. Dashboard receives real-time update
5. Alert appears on:

   * Alert list
   * Live map
6. Staff assigns responders
7. Status updated:

   * Active → In Progress → Resolved

---

## 🧩 Architecture

```
📱 Mobile App (React Native - Expo)
        ↓
☁️ Firebase Firestore (Realtime DB)
        ↓
🖥️ Web Dashboard (React + Vite)
        ↓
🗺️ Google Maps API (Visualization)
```

---

## 🛠️ Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Mobile App    | React Native (Expo)         |
| Web Dashboard | React + Vite + Tailwind CSS |
| Backend       | Firebase Firestore          |
| Maps          | Google Maps API             |
| Hosting       | Vercel                      |
| Realtime Sync | Firestore onSnapshot        |

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/sahayeta-app.git
cd sahayeta-app
```

---

### 2️⃣ Setup Web Dashboard

```
cd web-dashboard
npm install
npm run dev
```

---

### 3️⃣ Setup Mobile App

```
cd mobile-app
npm install
npm start
```

Scan QR using **Expo Go**

---

## 🔑 Environment Variables

Create `.env` file in web-dashboard:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
```

---

## 🌐 Deployment

### Web Dashboard

* Hosted on **Vercel**

### Mobile App

* Run via **Expo**
* Share using QR code or APK build

---

## 🧪 Demo Flow

1. Open mobile app
2. Press SOS
3. Dashboard updates instantly
4. Map shows alert location
5. Assign responder
6. Mark as resolved

---

## 💡 Unique Highlights

* ⚡ Real-time alert system
* 🗺️ Live map visualization
* 📡 Cloud-based synchronization
* 🧑‍🚒 Emergency responder management
* 🚑 Vehicle dispatch tracking
* 📊 Interactive dashboard

---

## 🏆 Future Improvements

* 🤖 AI-based emergency classification
* 📡 Offline mesh communication
* 🔔 Push notifications
* 🧠 Predictive response optimization

---

## 👨‍💻 Author

**Dhruv**
Engineering Student | Developer

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
