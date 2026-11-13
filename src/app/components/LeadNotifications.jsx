"use client";

import { ToastContainer } from "react-toastify";

export default function LeadNotifications() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      limit={3}
      icon={false}
      hideProgressBar
      closeOnClick
      pauseOnHover
      theme="light"
      className="lead-notifications"
      toastClassName="lead-notification"
    />
  );
}
