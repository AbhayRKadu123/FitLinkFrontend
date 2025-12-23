const PUBLIC_VAPID_KEY = "BG2Ec75sVaASZ4kVtEB3h-v4TIh-65TfjsL0ym3ScVQvJGWFPvPZm2kITk2lKMpxuY5r8m1Dl_wsJR2-DNzEYfU";
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}


export async function enablePush() {
  // 1️⃣ Check browser support
  if (!("serviceWorker" in navigator)) {
    alert("Service Worker not supported");
    return;
  }

  // 2️⃣ Ask permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Permission denied");
    return;
  }

  // 3️⃣ Register service worker
  const registration = await navigator.serviceWorker.register("/sw.js");

  // 4️⃣ Subscribe to push
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  // 5️⃣ Send subscription to backend
  await fetch("http://localhost:8080/pushnotification/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  });

  alert("Push notifications enabled 💪");
}

export async function disableNotifications() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();
    alert("Notifications disabled ❌");
  } else {
    alert("No active subscription found");
  }
}