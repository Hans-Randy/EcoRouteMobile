export interface PlatformMapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title: string;
    description: string;
    color: string;
  }[];
  polyline: {
    latitude: number;
    longitude: number;
  }[];
  style: any;
}
