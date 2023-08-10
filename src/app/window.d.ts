declare global {
  interface Window {
    google: {
      core: google.maps.CoreLibrary;
      maps: google.maps.MapsLibrary;
      marker: google.maps.MarkerLibrary;
    };
  }
}
