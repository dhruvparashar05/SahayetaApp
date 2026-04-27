import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.75rem'
};

// Center of SF as a default
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
};

const MapView = ({ alerts }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD0Q3VtI8OgXT-5It5mGPkK4iIY2NUWPp4"
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-[500px] rounded-xl border border-gray-800 bg-dark-lighter flex items-center justify-center">
        <p className="text-accent-red font-medium">Error loading maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] rounded-xl border border-gray-800 bg-dark-lighter flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-600 border-t-accent-red rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl border border-gray-800 overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={13}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {alerts.map(alert => {
          const id = alert.id;
          const { type, coordinates, status } = alert.data();
          
          let color = 'text-gray-500';
          
          if (status === 'Active') {
            color = type === 'Fire' ? 'text-orange-500' : type === 'Medical' ? 'text-accent-red' : 'text-blue-500';
          } else if (status === 'In Progress') {
            color = 'text-yellow-500';
          } else {
            color = 'text-green-500';
          }

          return (
            <OverlayView
              key={id}
              position={{ lat: coordinates.lat, lng: coordinates.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer">
                <div className={`relative ${status === 'Active' ? 'animate-bounce' : ''}`}>
                  <MapPin className={`w-8 h-8 ${color} drop-shadow-lg`} fill="currentColor" />
                  {status === 'Active' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-xs font-bold text-white mb-1">{type} Emergency</p>
                  <p className="text-xs text-gray-400">Status: {status}</p>
                </div>
              </div>
            </OverlayView>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default MapView;
