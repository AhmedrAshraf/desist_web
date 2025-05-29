import { useState, useEffect } from 'react';

interface LocationPermissionHandlerProps {
  onLocationGranted: (position: GeolocationPosition) => void;
  onLocationDenied: () => void;
  onLocationError: (error: GeolocationPositionError) => void;
  children: React.ReactNode;
}

export default function LocationPermissionHandler({
  onLocationGranted,
  onLocationDenied,
  onLocationError,
  children
}: LocationPermissionHandlerProps) {
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      if (!navigator.permissions || !navigator.permissions.query) {
        // If permissions API is not available, we'll handle it through the geolocation API
        return;
      }

      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionStatus(result.state);

        result.addEventListener('change', () => {
          setPermissionStatus(result.state);
        });
      } catch (error) {
        console.error('Error checking location permission:', error);
      }
    };

    checkPermission();
  }, []);

  const requestLocation = () => {
    setErrorMessage(null);
    
    if (!navigator.geolocation) {
      const error: GeolocationPositionError = {
        code: 2,
        message: 'Geolocation is not supported by your browser',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError;
      setErrorMessage(error.message);
      onLocationError(error);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissionStatus('granted');
        onLocationGranted(position);
      },
      (error) => {
        let message = 'Unable to access your location. ';
        
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Location access was denied. Please enable location access in your browser settings to use this feature.';
          setPermissionStatus('denied');
          onLocationDenied();
        } else {
          switch (error.code) {
            case error.POSITION_UNAVAILABLE:
              message += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              message += 'The request to get your location timed out.';
              break;
            default:
              message += 'An unknown error occurred.';
          }
          onLocationError(error);
        }
        
        setErrorMessage(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  if (permissionStatus === 'denied' || errorMessage) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Location Access Required
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>
                {errorMessage || 'Please enable location access in your browser settings to use this feature.'}
                <br />
                <button
                  onClick={requestLocation}
                  className="mt-2 text-red-800 dark:text-red-200 underline hover:text-red-900 dark:hover:text-red-100"
                >
                  Try Again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 