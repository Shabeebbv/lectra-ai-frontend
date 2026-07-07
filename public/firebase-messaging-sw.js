importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCPC7IAUljbwa87HS95wgZ2BpNQ3_NJGSM",
  authDomain: "lectraai-eedf6.firebaseapp.com",
  projectId: "lectraai-eedf6",
  storageBucket: "lectraai-eedf6.firebasestorage.app",
  messagingSenderId: "639743526027",
  appId: "1:639743526027:web:ac3e00f710c7f36011008e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(
  function(payload) {

    self.registration.showNotification(
      payload.notification.title,
      {
        body:
          payload.notification.body,
      }
    );
  }
);