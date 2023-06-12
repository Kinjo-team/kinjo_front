import React, { useState, useRef } from "react";
import Map from "../Map/Map";
import Sidebar from "../Sidebar/Sidebar";

import "./CreateItinerary.scss";

type CreateItineraryProps = {
  toggleCreateItinerary: () => void;
};

interface LocationData {
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
}

interface CreateItineraryData {
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string[];
  enteredTag: string;
  locationData: LocationData[];
}

const CreateItinerary = ({ toggleCreateItinerary }: CreateItineraryProps) => {
  const [formData, setFormData] = useState<CreateItineraryData>({
    itinerary_name: "",
    itinerary_descr: "",
    itinerary_tags: [],
    enteredTag: "",
    locationData: [],
  });

  const [locationCards, setLocationCards] = useState<
    {
      loc_coords: [number, number];
      loc_name: string;
      loc_descr_en: string;
      loc_tags: string[];
    }[]
  >([]);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "itinerary_tags") {
      // const tags = event.target.value.split(' ');

      setFormData((prevFormData) => ({
        ...prevFormData,
        enteredTag: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { name, value } = event.currentTarget;

      if (name === "itinerary_name") {
        descriptionRef.current?.focus();
      } else if (name === "itinerary_descr") {
        tagsRef.current?.focus();
      } else if (name === "itinerary_tags") {
        const tag = value.trim();
        if (tag !== "") {
          setFormData((prevFormData) => {
            const newTags = [...prevFormData.itinerary_tags, tag];
            if (newTags.length > 5) {
              newTags.shift();
            }
            return {
              ...prevFormData,
              itinerary_tags: newTags,
              enteredTag: "",
            };
          });
          // event.currentTarget.value = "";
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/itineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Successfully created itinerary:", data);
        // Reset the form data
        setFormData({
          itinerary_name: "",
          itinerary_descr: "",
          itinerary_tags: [],
          enteredTag: "",
          locationData: [],
        });
        // Clear the location cards
        setLocationCards([]);
      } else {
        throw new Error("Failed to create itinerary");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationData = (locationData: LocationData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationData: [...prevFormData.locationData, locationData],
    }));
    setLocationCards((prevLocationCards) => [
      ...prevLocationCards,
      locationData,
    ]);
  };

  // This function is the form from closing when user clicks on elements
  function stopBubblingUp(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation();
  }

  return (
    <main onClick={toggleCreateItinerary} className="overlay--container">
      <div onClick={stopBubblingUp} className="createItinerary--container">
        <div>
          <Sidebar locationCards={locationCards} />
        </div>
        <header>
          <h2>Create an Itinerary</h2>
        </header>
        <form className="createItinerary-form" onSubmit={handleSubmit}>
          <section className="input-form">
            <label htmlFor="itinerary_name">Itinerary Name</label>
            <input
              type="text"
              name="itinerary_name"
              id="itinerary_name"
              placeholder="Enter name"
              value={formData.itinerary_name}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
            />
          </section>
          <section className="input-form">
            <label htmlFor="itinerary_descr">Description</label>
            <textarea
              name="itinerary_descr"
              id="itinerary_descr"
              placeholder="Enter Description"
              value={formData.itinerary_descr}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
              ref={descriptionRef}
            />
          </section>
          <form>
            <section className="label-container">
              <div className="input-form">
                <label htmlFor="itinerary_tags">Tags</label>
                <input
                  type="text"
                  name="itinerary_tags"
                  id="itinerary_tags"
                  placeholder="Enter tags (max 5)"
                  value={formData.enteredTag}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKey}
                  ref={tagsRef}
                />
              </div>
              <div className="tag-container">
                {formData.itinerary_tags.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
            </section>
          </form>
          <button>Add Location</button>
        </form>
        <div className="map--container">
          <Map handleLocationData={handleLocationData} />
        </div>
      </div>
    </main>
  );
};

export default CreateItinerary;
