import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (onStatusUpdate, onNewApplication) => {
  useEffect(() => {
    const socket = io('http://localhost:5000'); // Adjust the URL as needed

    // Listen for application status updates (for job seekers)
    if (onStatusUpdate) {
      socket.on('status-update', (status) => {
        onStatusUpdate(status);
      });
    }

    // Listen for new applications (for employers)
    if (onNewApplication) {
      socket.on('new-application', (notification) => {
        onNewApplication(notification);
      });
    }

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [onStatusUpdate, onNewApplication]);
};

export default useSocket;
