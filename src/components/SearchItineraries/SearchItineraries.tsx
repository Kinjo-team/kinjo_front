import { useState, FormEvent, ChangeEvent} from 'react';
import './SearchItineraries.scss';
import DisplayItineraries from '../DisplayItineraries/DisplayItineraries';

const SearchItineraries = () => {
  const [searchOption, setSearchOption] = useState('Name');
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchOption = (option: string) => {
    setSearchOption(option);
  };

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

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

  function toggleShowResults() {
    setShowResults(!showResults);
  }

      return (
        <>
          <form className="search-itineraries" onSubmit={handleSubmit}>
              <div className='searchbar'>
                <select name='search-option' id='search-option' defaultValue="Itinerary" onChange={(event) => handleSearchOption(event.target.value)}>
                  <option value='Name'>Kinjo</option>
                  <option value='Tag'>Tag</option>
                  <option value='User'>User</option>
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchValue}
                    className='search-input'
                />
                <span className="material-symbols-outlined search-icon">
                  search
                </span>
              </div>
            {showResults && <DisplayItineraries itineraries={searchResults} toggleShowResults={toggleShowResults} searchValue={searchValue} />}
          </form>
        </>
      );
};
    
export default SearchItineraries;