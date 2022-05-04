import React, {useEffect, useState} from "react";

const useDeviceCheck = () => {
    const [width, setWidth] = useState();
    const handleSizeChange = () => {
      setWidth(window.innerWidth);
    }

    useEffect(() => {
      if (typeof window === undefined) return;
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleSizeChange);
      return () => {
        window.removeEventListener('resize', handleSizeChange);
      }
    }, []);

    return (width <= 768);
}

export default useDeviceCheck;
