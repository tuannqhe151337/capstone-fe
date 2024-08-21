// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBZAlpXM05RSSy20plVeikHrCIU_u8yEDI",
  authDomain: "fin-planning-firebase.firebaseapp.com",
  projectId: "fin-planning-firebase",
  storageBucket: "fin-planning-firebase.appspot.com",
  messagingSenderId: "354912525296",
  appId: "1:354912525296:web:e69c66ad9ae1e1b19b9b35",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
