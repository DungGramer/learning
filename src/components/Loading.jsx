import { useEffect, useState } from "react";

function Delayed({ children, wait = 500 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), wait);

    return () => clearTimeout(timeout);
  }, [wait]);

  return show === true ? children : null;
}

export default function Loading() {
  return (
    <Delayed>
      <div className="loading center" />
    </Delayed>
  );
}
