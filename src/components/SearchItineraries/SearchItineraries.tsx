import { useState, FormEvent, ChangeEvent} from 'react';
import './SearchItineraries.scss';
import DisplayItineraries from '../DisplayItineraries/DisplayItineraries';
import debounce from 'lodash/debounce';

const SearchItineraries = () => {
  const [searchOption, setSearchOption] = useState('Name');
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);

  const handleSearchOption = (option: string) => {
    setSearchOption(option);
  };

  const autocomplete = async (searchValue: string) => {
    const response = await fetch(`http://localhost:8000/autocomplete?option=${searchOption}&value=${searchValue}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
      if (response.ok) {
        const searchData = await response.json();
        const uniqueSearchData = Array.from(new Set(searchData));

        setAutocompleteResults(uniqueSearchData);
      } else {
        console.error('Autocomplete request failed');
      }
  };

  const debouncedAutocomplete = debounce(autocomplete, 300);

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value.length > 0) {
      debouncedAutocomplete(event.target.value);
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleAutocompleteClick = (term: string) => {
    setSearchValue(term);
    setAutocompleteResults([]);
  }

  // encodeURIComponent
  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchOption === 'Name' || searchOption === 'Tag' || searchOption === 'User') {
      try {
        const response = await fetch(`http://localhost:8000/search?option=${searchOption}&value=${searchValue}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const searchData = await response.json();
          setSearchResults(searchData);
          setShowResults(true);
        } else {
          console.error('Search request failed');
        }
      } catch (error) {
        console.error('An error occurred during the search:', error);
      }
    }
  };

  function toggleShowResults() {
    setShowResults(!showResults);
  }

      return (
        <>
          <form className="search-itineraries" onSubmit={handleSubmit}>
              <div className='searchbar'>
                <select name='search-option'
                        id='search-option' 
                        defaultValue="Itinerary" 
                        onChange={(event) => handleSearchOption(event.target.value)}>
                  <option value='Name'>Kinjo</option>
                  <option value='Tag'>Tag</option>
                  <option value='User'>User</option>
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchValue}
                    value={searchValue}
                    className='search-input'
                />
                <span className="material-symbols-outlined search-icon">
                  search
                </span>
                {autocompleteResults.length > 0 && (
                      <div className="autocomplete-results--container">
                        {autocompleteResults.map((result, index) => (
                          <div key={index}
                              className="autocomplete-result" 
                              onClick={() => handleAutocompleteClick(result)}>
                              {result}
                          </div>
                        ))}
                      </div>
                    )}
              </div>
            {showResults && <DisplayItineraries itineraries={searchResults} toggleShowResults={toggleShowResults} searchValue={searchValue} />}
          </form>
        </>
      );
};
    
export default SearchItineraries;