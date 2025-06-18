import { NextResponse } from 'next/server';
import axios from 'axios';

interface Attorney {
  id: string;
  name: string;
  specialization: string;
  location: string;
  detailedLocation: string;
  rating: number;
  cases: number;
  image: string;
  languages: string[];
  featured: boolean;
  phone?: string;
  website?: string;
  address?: string;
  email?: string;
  barNumber?: string;
  education?: string[];
  experience?: string;
  lat?: number;
  lng?: number;
}

interface OverpassElement {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    office?: string;
    phone?: string;
    website?: string;
    email?: string;
    address?: string;
    "addr:full"?: string;
    "addr:street"?: string;
    "addr:housenumber"?: string;
    "addr:city"?: string;
    "addr:state"?: string;
    "addr:postcode"?: string;
    [key: string]: string | undefined;
  };
}

interface OverpassResponse {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: string;
    copyright: string;
  };
  elements: OverpassElement[];
}

// Function to search for attorneys using Overpass API
async function searchAttorneys(lat: number, lng: number, radius: number) {
  console.log('\n=== STARTING ATTORNEY SEARCH ===');
  console.log('Search parameters:', { lat, lng, radius });
  
  try {
    // Create Overpass QL query
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="lawyer"](around:${radius * 1000},${lat},${lng});
        node["office"="lawyer"](around:${radius * 1000},${lat},${lng});
        node["office"="attorney"](around:${radius * 1000},${lat},${lng});
      );
      out body;
      >;
      out skel qt;
    `;

    console.log('Making request to Overpass API with query:', query);
    
    const response = await axios.post<OverpassResponse>('https://overpass-api.de/api/interpreter', query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Overpass API response received:', {
      status: response.status,
      elements: response.data.elements?.length || 0
    });

    if (!response.data.elements || response.data.elements.length === 0) {
      console.log('No attorneys found in Overpass API');
      return [];
    }

    // Transform Overpass data to attorney format
    const attorneys: Attorney[] = response.data.elements.map((element, index) => ({
      id: element.id.toString(),
      name: element.tags.name || `Attorney ${index + 1}`,
      specialization: element.tags.office || "General Practice",
      location: element.tags["addr:city"] || "Location not available",
      detailedLocation: [
        element.tags["addr:street"],
        element.tags["addr:housenumber"],
        element.tags["addr:city"],
        element.tags["addr:state"],
        element.tags["addr:postcode"]
      ].filter(Boolean).join(", ") || "Address not available",
      rating: Math.random() * 2 + 3, // Random rating between 3 and 5
      cases: Math.floor(Math.random() * 200) + 50,
      image: `/images/attorneys/attorney${Math.floor(Math.random() * 3) + 1}.jpg`,
      languages: ["English"],
      featured: index < 2,
      phone: element.tags.phone,
      website: element.tags.website,
      address: element.tags["addr:full"] || element.tags.address,
      email: element.tags.email,
      lat: element.lat,
      lng: element.lon
    }));

    return attorneys;
  } catch (error) {
    console.error('Error searching attorneys:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '50'; // Default 50km radius

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const attorneys = await searchAttorneys(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(radius)
    );

    return NextResponse.json(
      { attorneys },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching attorneys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attorneys' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 