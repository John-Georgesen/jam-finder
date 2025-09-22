'use client';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN || '';

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-84.5037); // Lexington, KY longitude
    const [lat, setLat] = useState(38.0406);  // Lexington, KY latitude
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // Initialize map only once
       
        if (!mapContainer.current) return; // Make sure container exists
       
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Update state when map moves
        map.current.on('move', () => {
            if (map.current) {
                setLng(Number(map.current.getCenter().lng.toFixed(4)));
                setLat(Number(map.current.getCenter().lat.toFixed(4)));
                setZoom(Number(map.current.getZoom().toFixed(2)));
            }
        });

        // Cleanup function
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            {/* Optional: Display current coordinates */}
            <div style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 1,
                background: 'rgba(255,255,255,0.8)',
                padding: '5px 10px',
                borderRadius: '3px',
                fontSize: '12px'
            }}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
           
            <div
                ref={mapContainer}
                style={{
                    width: '100%',
                    height: '500px'
                }}
            />
        </div>
    );
}