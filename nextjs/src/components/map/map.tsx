'use client';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { SearchBox } from "@mapbox/search-js-react";
import dynamic from "next/dynamic";
import '../../styles/globals.css';

const SearchBoxNoSSR = dynamic(
  () => import("@mapbox/search-js-react").then(mod => mod.SearchBox as any),
  { ssr: false }
);

const accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN || '';
mapboxgl.accessToken = accessToken;

interface PointFeature {
    type: 'Feature';
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
    properties: {
        title: string;
        description: string;
    };
}

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }
  ]
};

function createNewMarker(coordinates: [number, number], map: mapboxgl.Map, feature: PointFeature) {
    const el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
        .setLngLat(coordinates as [number, number])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                    `<h3>${feature.properties?.title}</h3><p>${feature.properties?.description}</p>`
                )
        )
        .addTo(map); // Just use 'map', not 'map.current!'
}


export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [lng, setLng] = useState(-84.5037); // Lexington, KY longitude
    const [lat, setLat] = useState(38.0406);  // Lexington, KY latitude
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return;
       
        if (!mapContainer.current) return; 
       
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.doubleClickZoom.disable();

        // Update state when map moves
        map.current.on('move', () => {
            if (map.current) {
                setLng(Number(map.current.getCenter().lng.toFixed(4)));
                setLat(Number(map.current.getCenter().lat.toFixed(4)));
                setZoom(Number(map.current.getZoom().toFixed(2)));
            }
        });

        // User double click to add a new point
        map.current.on('dblclick', (e) => {
            // get coordinates of the point where user double clicked
            const coordinates = [e.lngLat.lng, e.lngLat.lat] as [number, number];
            console.log('Double clicked at: ', coordinates);

            // Create a new feature and add to geojson
            const newFeature= {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: coordinates
                },
                properties: {
                    title: 'Mapbox',
                    description: 'New Point Added'
                }
            } as PointFeature;

            geojson.features.push(newFeature);

            createNewMarker(coordinates, map.current!, newFeature);
        });

        // add markers to map
        for (const feature of geojson.features) {
            createNewMarker(feature.geometry.coordinates as [number, number], map.current!, feature as PointFeature);
        }
      

        // Cleanup function
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}> 
            <SearchBoxNoSSR
                // @ts-ignore
                accessToken={accessToken}
                map={map.current}
                mapboxgl={mapboxgl}
                value={inputValue}
                onChange={(d) => {
                setInputValue(d);
                }}
                marker
            />
          
            <div
                ref={mapContainer}
                style={{
                    width: '100%',
                    height: '80vh'
                }}
            />
        </div>
    );
}