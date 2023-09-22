import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";
import * as parkData from "../data/parkData.json";


const Map = withScriptjs(
  withGoogleMap(({ zoom, center }: any) => (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{
        lat: center.lat,
        lng: center.lng
      }}
    >
      {parkData.features.map(park => {
        return <Marker
        key={park.properties.PARK_ID}
        position={{
          lat: park.geometry.coordinates[1],
          lng: park.geometry.coordinates[0]
        }}
        onClick={() => {
          alert(park.properties.PARK_ID);
        }}
        icon={{
          url:  "https://img.icons8.com/color/48/000000/map-pin.png",
          scaledSize: new window.google.maps.Size(50, 50)
        }}
      />
      })}
    </GoogleMap>
  ))
);

export default Map;
