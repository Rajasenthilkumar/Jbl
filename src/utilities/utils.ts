// utils for remove characters that are not digits
export const removeNonDigits = (value: string) => {
  return value.replace(/[^\d]/g, '');
};

// 5mb
export const maxSize = 1024 * 1024 * 5;

// utils for extract file name from url eg: https://jbl-dev.s3.us-east-1.amazonaws.com/1727237811842-jbl%20logo.png return logo.png
//  handle error if url is not valid
export const extractFileName = (url: string) => {
  try {
    const urlSplit = url.split('/');
    return urlSplit[urlSplit.length - 1];
  } catch {
    return 'unknown';
  }
};
