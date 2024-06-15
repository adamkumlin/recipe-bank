interface SearchBarProps {
  query: string;
  resultsAmount: number;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setResultsAmount: React.Dispatch<React.SetStateAction<number>>;
  search: () => void;
}

export default function SearchBar({query, resultsAmount, setQuery, setResultsAmount, search}: SearchBarProps) {
    
    return (
      <div className="SearchBar">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="What are you hungry for?"
        />
        <label>
          Amount of results
          <input
            type="range"
            min="10"
            max="100"
            value={resultsAmount}
            onChange={(e) => setResultsAmount(parseInt(e.target.value))}
          />
          <input
            type="number"
            value={resultsAmount}
            onChange={(e) => setResultsAmount(parseInt(e.target.value))}
          />
        </label>
        <button type="submit" onClick={search}>Search</button>
      </div>
    );
}