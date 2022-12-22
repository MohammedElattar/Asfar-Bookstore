import { useState } from "react";
import { BsCheck } from "react-icons/bs";

export default function useAlerts() {
  const [alerts, setAlerts] = useState([]);

  const insertAlert = {
    success: (text, { overwrite = false }) => {
      const newAlert = {
        text: text,
        icon: (
          <BsCheck
            style={{
              color: "#fff",
              fontSize: "25px",
              backgroundColor: "#8fae1b",
              borderRadius: "50%",
            }}
          />
        ),
        color: "#8fae1b",
      };
      if (alerts.find((e) => e.text === text)) {
        if (overwrite) {
          setAlerts((prev) => [
            ...prev.filter((e) => e.text !== text),
            newAlert,
          ]);
        }
      } else {
        setAlerts([...alerts, newAlert]);
      }
    },
  };

  return { alerts, insertAlert };
}
