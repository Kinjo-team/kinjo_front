import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Map from "../Map/Map";

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
  firebase_uuid: string;
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string[];
  enteredTag: string;
  locationData: LocationData[];
}

const CreateItinerary = ({ toggleCreateItinerary }: CreateItineraryProps) => {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState<CreateItineraryData>({
    firebase_uuid: "",
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

  useEffect(() => {
    if (currentUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firebase_uuid: currentUser.uid,
      }));
    }
  }, [currentUser]);

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
          firebase_uuid: "",
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
        <form className="createItinerary--form" onSubmit={handleSubmit}>
          <section className="input-form">
            <label htmlFor="itinerary_name">Name</label>
            <input
              type="text"
              name="itinerary_name"
              id="itinerary_name"
              placeholder="e.g. My First Itinerary"
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
              placeholder="Add description"
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
                  placeholder="Add tags(max 5) e.g. coffee"
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
          <button className="itinerary-submit-btn">Submit & Review</button>
          <button className="itinerary-cancel-btn" onClick={toggleCreateItinerary}>Cancel</button>
        </form>
        <div className="map--container">
          <Map handleLocationData={handleLocationData} />
        </div>
      </div>
    </main>
  );
};

export default CreateItinerary;
