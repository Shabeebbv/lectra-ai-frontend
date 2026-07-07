import {
  getToken
} from "firebase/messaging";

import {
  messaging
} from "../firebase";

import api from "../api/axios"

export async function getFCMToken() {

  const permission =
    await Notification.requestPermission();

  if (
    permission !== "granted"
  ) {
    return null;
  }

  return await getToken(
    messaging,
    {
      vapidKey:
        "BLsUk-NSdsInoh09oAdYtuUuY8hqLNvc3D-RtYTq4jRXFc74-eQ-6xrOSLMei8_jri5H0kGMno-tPWDkz5kfSx0"
    }
  );
}



export async function registerFCMToken() {
  const token = await getFCMToken()  // your existing function
  if (!token) return
  await api.post("/users/fcm-token/", { token })
}