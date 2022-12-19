import { useState } from "react";

export default function useAlerts() {
  const [alerts, serAlerts] = useState([]);

  const insertAlert = (alert) => {};

  return { alerts };
}
