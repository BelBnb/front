import { useState } from "react";

function usePageLoad() {
  const [loadStyle, setLoadStyle] = useState({
    opacity: 0,
  });

  const onImageLoad = (): void => {
    setLoadStyle({ opacity: 1 });
  };

  return { loadStyle, onImageLoad };
}

export default usePageLoad;
