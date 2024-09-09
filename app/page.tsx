import { validateRequest } from "./db/connect";

export default async function Home() {

  const {user} = await validateRequest();
  console.log(user)
  // const [query, setQuery] = useState<string>("");
  // const [results, setResults] = useState<SearchResult[]>([]);

  // async function search() {
  //   if (query === "") {
  //     return;
  //   }

  //   const uri = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=${10}`;

  //   const response = await fetch(uri);
  //   const results = await response.json();
  //   setResults(results);
  // }

  return (
    <main>
      {user ? <div>Log in</div> : <div>nam </div>}
    </main>
  );
}
