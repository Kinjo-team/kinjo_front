import React, { useState, useRef, useEffect } from 'react';
import './SearchItineraries.scss';
import DisplayItineraries from '../DisplayItineraries/DisplayItineraries';

const SearchItineraries = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchOption, setSearchOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleDropdownClick = () => {
    setShowOptions(!showOptions);
  };

  const handleChoiceClick = (event: MouseEvent) => {
    const isDropdownClick = dropdownButtonRef.current?.contains(event.target as Node);
    const isOptionClick = dropdownRef.current?.contains(event.target as Node);

    if (isDropdownClick || isOptionClick) {
      setShowOptions(!showOptions);
    } else {
      setShowOptions(false);
    }
  };

  const handleSearchOption = (option: string) => {
    setSearchOption(option);
    setShowOptions(false);
  };

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async () => {
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

    useEffect(() => {
        document.addEventListener('mousedown', handleChoiceClick);
        return () => {
          document.removeEventListener('mousedown', handleChoiceClick);
        };
      }, []);
    
      return (
        <>
          <form className="search-itineraries">
            <section 
              className="dropdown-section" 
              onMouseEnter={handleDropdownClick} 
              onMouseLeave={handleDropdownClick}>
              <button className="dropbtn">{searchOption ? searchOption : "Search Options"}</button>
              <div className={`dropdown-content${showOptions ? ' show' : ''}`} ref={dropdownRef}>
                <p className='search-option' onClick={() => handleSearchOption('Name')}>Name</p>
                <p className='search-option' onClick={() => handleSearchOption('Tag')}>Tag</p>
                <p className='search-option' onClick={() => handleSearchOption('User')}>User</p>
              </div>
            </section>
            <section>
              <input
                  type="text"
                  placeholder="Choose search option"
                  onChange={handleSearchValue}
              />
              <button type="button" onClick={handleSubmit}>
                  Search
              </button>
            </section>
            {showResults && <DisplayItineraries itineraries={searchResults} />}
          </form>
        </>
      );
};
    
export default SearchItineraries;