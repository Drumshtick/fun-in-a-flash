import React, { useState } from 'react';

const useFullScreenAPI = () => {
  const [ isFullScreen, setIsFullScreen ] = useState<boolean>(false);
  const [ fullScreenError, setFullScreenError ] = useState('');
  const [ openError, setOpenError ] = useState(false);

  const toggleFullScreen = (): void => {
    const browserFScreenProp: string = getBrowserFullscreenElementProp();
  
    if (!browserFScreenProp) {
      setFullScreenError('Unable to start fullscreen, please try another browser');
      setOpenError(true);
      return;
    }
  
    if (!document[browserFScreenProp]) {
        document.documentElement.requestFullscreen();
        setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }
  

  const handleErrorSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  return {
    isFullScreen,
    setIsFullScreen,
    handleErrorSnackClose,
    toggleFullScreen,
    openError,
    fullScreenError
  };
}

export default useFullScreenAPI;

function getBrowserFullscreenElementProp(): string {
  if (typeof document['fullscreenElement'] !== "undefined") {
    return "fullscreenElement";
  } else if (typeof document['mozFullScreenElement'] !== "undefined") {
    return "mozFullScreenElement";
  } else if (typeof document['msFullscreenElement'] !== "undefined") {
    return "msFullscreenElement";
  } else if (typeof document['webkitFullscreenElement'] !== "undefined") {
    return "webkitFullscreenElement";
  } else {
    return ''
  }
}
