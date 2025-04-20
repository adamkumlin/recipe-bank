export default async function fetchApi(endpoint: string) {
  const url = new URL(endpoint, 'http://localhost:3001');
  const req = await fetch(url.toString());
  const data = await req.json();
  return data;
}
