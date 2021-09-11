import {Vector3} from "three";


export function latLonToCoords(latitude: number, longitude: number): Vector3 {
  const x = Math.cos(latitude) * Math.sin(longitude);
  const y = Math.sin(latitude);
  const z = Math.cos(latitude) * Math.cos(longitude);
  return new Vector3(x, y, z);
}
