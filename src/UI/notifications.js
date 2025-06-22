export const notificationTypes = {
  info: "info",
  warning: "warning",
  error: "error",
};

Object.freeze(notificationTypes);

export function sendNotification(
  message,
  type = notificationTypes.info,
  duration = 3000
) {
  const container = document.getElementById("notifications");

  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.textContent = message;
  container.appendChild(notif);

  // Force the browser to register the initial state
  void notif.offsetWidth; // ← this is important

  // Then add the class that transitions it in
  notif.classList.add("show");

  // Schedule the fade+slide out
  setTimeout(() => {
    notif.classList.remove("show");
    notif.classList.add("hide");

    notif.addEventListener(
      "transitionend",
      () => {
        notif.remove();
      },
      { once: true }
    );
  }, duration);
}
