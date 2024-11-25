import toast from 'react-hot-toast';
import type { ApiError } from './api';

export const toastErrorDisplay = (error: unknown) => {
  const apiError: ApiError = error as ApiError;

  if (apiError.data?.error?.msg) {
    const msg = apiError.data.error.msg;

    // Check if msg is an object
    if (typeof msg === 'object' && msg !== null) {
      // Iterate over each key in the msg object and show a toast for each
      Object.entries(msg).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
    } else {
      // If it's a string or any other type, display it directly
      toast.error(msg.toString());
    }
  } else {
    if (apiError.status === 404) {
      toast.error('404 Error - Method not found...');
    } else {
      toast.error(apiError.errorMessage.toString());
    }
  }
};
