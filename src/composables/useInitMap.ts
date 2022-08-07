/* this files purpose is to load the google map from JS API */
import { Loader } from "@googlemaps/js-api-loader";
import { API_SETTINGS, MAP_SETTINGS } from "@/constants/mapConfig";

export function useInitMap(): {
  initMap: () => Promise<google.maps.Map>;
} {
  async function initMap() {
    const mapDiv = document.getElementById("map-mount") as HTMLElement;
    const apiLoader = new Loader(API_SETTINGS);
    await apiLoader.load();
    return new google.maps.Map(mapDiv, MAP_SETTINGS);
  }

  return {
    initMap,
  };
}
