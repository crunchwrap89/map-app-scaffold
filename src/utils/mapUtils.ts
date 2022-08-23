import { MathUtils, Vector3 } from "three";
import { Loader } from "@googlemaps/js-api-loader";
import {
  API_SETTINGS,
  MAP_SETTINGS,
} from "@/constants/mapConfig";

//init Map
export async function initMap(elementId: string) {
  const mapDiv = document.getElementById(elementId) as HTMLElement;
  const apiLoader = new Loader(API_SETTINGS);
  await apiLoader.load();
  return new google.maps.Map(mapDiv, MAP_SETTINGS);
}

//await all tiles on map to be loaded.
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

//Create random lat/long coordinates in a specified radius around a center point
export function randomGeo(center: any, radius: number) {
  const y0 = center.latitude;
  const x0 = center.longitude;
  const rd = radius / 111300; //about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  //Adjust the x-coordinate for the shrinking of the east-west distances
  const xp = x / Math.cos(y0);

  const newlat = y + y0;
  const newlon = x + x0;
  const newlon2 = xp + x0;

  return {
    latitude: newlat.toFixed(5),
    longitude: newlon.toFixed(5),
    longitude2: newlon2.toFixed(5),
    distance: distance(
      center.latitude,
      center.longitude,
      newlat,
      newlon
    ).toFixed(2),
    distance2: distance(
      center.latitude,
      center.longitude,
      newlat,
      newlon2
    ).toFixed(2),
  };
}

//Calc the distance between 2 coordinates as the crow flies
export function distance(lat1: any, lon1: any, lat2: any, lon2: any) {
  const R = 6371000;
  const a =
    0.5 -
    Math.cos(((lat2 - lat1) * Math.PI) / 180) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(((lon2 - lon1) * Math.PI) / 180))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

//Generate a number of mappoints
export function generateMapPoints(
  centerpoint: any,
  distance: number,
  amount: number
) {
  const mappoints = [];
  for (let i = 0; i < amount; i++) {
    mappoints.push(randomGeo(centerpoint, distance));
  }
  return mappoints;
}

export function toLatLngLiteral(latLng: any) {
  if (window.google && google.maps && latLng instanceof google.maps.LatLng) {
    return latLng.toJSON();
  }
  return latLng;
}

export function latLngToMeters(latLng: any) {
  const EARTH_RADIUS = 6371010;
  latLng = toLatLngLiteral(latLng);
  const x = EARTH_RADIUS * MathUtils.degToRad(latLng.lng);
  const y =
    0 -
    EARTH_RADIUS *
      Math.log(
        Math.tan(0.5 * (Math.PI * 0.5 - MathUtils.degToRad(latLng.lat)))
      );
  return { x, y };
}

export function latLngToVector3(point: any, target = new Vector3()) {
  const { x, y } = latLngToMeters(point);
  return target.set(x, 0, -y);
}

export function latLngToVector3Relative(
  point: any,
  reference: any,
  target = new Vector3()
) {
  const p = latLngToVector3(point);
  const r = latLngToVector3(reference);
  target.setX(Math.abs(r.x - p.x) * Math.sign(p.x - r.x));
  target.setY(Math.abs(r.y - p.y) * Math.sign(p.y - r.y));
  target.setZ(Math.abs(r.z - p.z) * Math.sign(p.z - r.z));
  return target;
}
