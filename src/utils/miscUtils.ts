export function tilesLoaded(
    map: google.maps.Map,
    timeout = 1500
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      const listener = map.addListener("tilesloaded", () => {
        listener.remove();
        resolve();
      });
  
      setTimeout(() => {
        listener.remove();
        resolve();
      }, timeout);
    });
  }
  
  export function toggleFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
  
    const requestFullScreen = docEl.requestFullscreen;
    const cancelFullScreen = doc.exitFullscreen;
  
    if (!doc.fullscreenElement) {
      try {
        requestFullScreen.call(docEl);
      } catch (e) {
        console.log(e);
      }
    } else {
      cancelFullScreen.call(doc);
    }
  }
  