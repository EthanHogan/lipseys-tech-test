import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const ToggleLightMode = () => {
  const [lightMode, setLightMode] = useState<boolean>(true);

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  useEffect(() => {
    lightMode
      ? document.documentElement.setAttribute("data-bs-theme", "light")
      : document.documentElement.setAttribute("data-bs-theme", "dark");
  }, [lightMode]);

  return (
    <Button title="toggleLightMode" onClick={toggleLightMode}>
      <i
        className={
          (lightMode ? "text-secondary" : "text-light") +
          " bi bi-sun-fill fs-3 me-3"
        }
      ></i>
      <i
        className={
          (!lightMode ? "text-primary" : "text-dark") + " bi bi-moon-fill fs-3"
        }
      ></i>
    </Button>
  );
};
