import Button from './Button';

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
}

export default function SearchBar({ query, setQuery, search }: Props) {
  return (
    <form className="flex w-1/2 flex-row justify-center m-auto *:mx-1 drop-shadow-md">
      <input
        className="border-2 focus:outline-none"
        type="text"
        onChange={e => setQuery(e.target.value)}
        value={query}
        placeholder="Tell me about..."
        style={
          query !== ''
            ? {
                borderColor: 'lime',
                borderRadius: '5px',
                transition: '300ms ease-out',
              }
            : { borderColor: 'rgb(55 65 81 / 1)' }
        }
      />
      <Button type="submit" onClick={search}>
        Search
      </Button>
    </form>
  );
}
