import { Spot } from '../types';

/**
 * Generates an official Google Maps URL that drops a pin directly on the exact coordinates.
 * Using https://www.google.com/maps/search/?api=1&query=lat,lng guarantees Google Maps places the marker
 * on the exact GPS coordinate across web, iOS, and Android without snapping to other places.
 */
export function getGoogleMapsUrl(spot: Spot): string {
  const [lat, lng] = spot.coordinates;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/**
 * Generates a Google Maps navigation/directions link directly to the exact spot coordinates.
 */
export function getGoogleMapsDirectionsUrl(spot: Spot): string {
  const [lat, lng] = spot.coordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
