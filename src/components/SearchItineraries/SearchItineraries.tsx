import { useState, FormEvent, ChangeEvent} from 'react';
import './SearchItineraries.scss';
import DisplayItineraries from '../DisplayItineraries/DisplayItineraries';

const SearchItineraries = () => {
  const [searchOption, setSearchOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchOption = (option: string) => {
    setSearchOption(option);
  };

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchOption === 'Name' || searchOption === 'Tag' || searchOption === 'User') {
      try {
        const response = await fetch(`http://localhost:8000/search?option=${encodeURIComponent(searchOption)}&value=${encodeURIComponent(searchValue)}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const searchData = await response.json();
          setSearchResults(searchData);
          console.log("This is the data from handle search:", searchData);
          setShowResults(true);
        } else {
          console.error('Search request failed');
        }
      } catch (error) {
        console.error('An error occurred during the search:', error);
      }
    }
  };

    
      return (
        <>
          <form className="search-itineraries" onSubmit={handleSubmit}>
              <select name='search-option' id='search-option' onChange={(event) => handleSearchOption(event.target.value)}>
                <option value='Name'>Itinerary</option>
                <option value='Tag'>Tag</option>
                <option value='User'>User</option>
              </select>
              <input
                  type="text"
                  placeholder="Choose search option"
                  onChange={handleSearchValue}
              />
              <button type="submit">
                  Search
              </button>
            {showResults && <DisplayItineraries itineraries={searchResults} />}
          </form>
        </>
      );
};
    
export default SearchItineraries;