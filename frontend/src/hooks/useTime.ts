export async function useTime(): Promise<string> {
  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=UTC'
  );

  const data = await res.json();
  const formattedDate = new Date(data.dateTime).toISOString();

  return formattedDate;
}
