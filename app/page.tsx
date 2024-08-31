"use client";

import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar";
import type { SearchResult } from "./utils/types";
import { initialize } from "./utils/helper";
import { useSessionStorage } from "./hooks/useSessionStorage";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  async function search() {
    if (query === "") {
      return;
    }

    const uri = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=${10}`;

    const response = await fetch(uri);
    const results = await response.json();
    setResults(results);
  }

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      const user = await initialize();
      if (user && user.email) {
        setUserName(user.email);
      }
    }

    const storedUserName = useSessionStorage("userName", null);

    if (!storedUserName || storedUserName === "") {
      checkUser();

      if (!userName) {
        return;
      }

      useSessionStorage("userName", userName);
    }
    
    setUserName(storedUserName);
    console.log(userName)
  });

  return (
    <main>
      <SearchBar
        setQuery={setQuery}
        query={query}
        search={search}
      />
    </main>
  );
}
