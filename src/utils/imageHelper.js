export function getImageUrl(filename) {
  const baseUrl = process.env.VUE_APP_DOMAIN_NAME || 'http://localhost:4000/'; 
  console.log('baseUrl', baseUrl);
  return `${baseUrl}uploads/${filename}`;
}