import { render } from "react-dom";
import Map from "./components/Map";
import { Header } from './components/Header'
import { AddDisaster } from './components/AddDisaster'


const App = () => {
  return (
    <>
      <Header />
      <AddDisaster />
      <Map
      center={{ lat: 43.6532, lng: -79.3832 }}
      zoom={3}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZulZuS9VscELy0D0-5KmxQ8r2UR0-smk"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `420px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    </>

  );
};

render(<App />, document.getElementById("root"));
