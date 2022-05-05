import React, {useEffect, useState} from "react";

const useDeviceCheck = () => {
    const [width, setWidth] = useState<null | number>(null);
    const [isMobile, setIsMobile] = useState(false);
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

    useEffect(() => {
      console.log(width)
      if (width && width <= 768) {
        setIsMobile(true);
        return;
      }
      setIsMobile(false);
    }, [width])

    return {isMobile};
}

export default useDeviceCheck;
