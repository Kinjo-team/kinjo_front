import React, { useState, useRef } from "react";
import Map from "../Map/Map";
import Sidebar from "../Sidebar/Sidebar";

import "./CreateItinerary.scss";

interface CreateItineraryData {
  itineraryName: string;
  itineraryDescription: string;
  itineraryTags: string[];
  enteredTag: string;
  locationData: {
    loc_name: string;
    loc_descr_en: string;
    loc_tags: string[];
  };
}

const CreateItinerary = () => {
  const [formData, setFormData] = useState<CreateItineraryData>({
    itineraryName: "",
    itineraryDescription: "",
    itineraryTags: [],
    enteredTag: "",
    locationData: {
      loc_name: "",
      loc_descr_en: "",
      loc_tags: [],
    },
  });

  const [locationCards, setLocationCards] = useState<
    {
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

    if (name === "itineraryTags") {
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

      if (name === "itineraryName") {
        descriptionRef.current?.focus();
      } else if (name === "itineraryDescription") {
        tagsRef.current?.focus();
      } else if (name === "itineraryTags") {
        const tag = value.trim();
        if (tag !== "") {
          setFormData((prevFormData) => {
            const newTags = [...prevFormData.itineraryTags, tag];
            if (newTags.length > 5) {
              newTags.shift();
            }
            return {
              ...prevFormData,
              itineraryTags: newTags,
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
      const response = await fetch("/api/create-itinerary", {
        // need to update endpoints
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("formData:", formData);

      if (response.ok) {
        const data = await response.json();
      } else {
        throw new Error("Failed to create itinerary");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationData = (locationData: {
    loc_name: string;
    loc_descr_en: string;
    loc_tags: string[];
  }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationData: locationData,
    }));
    setLocationCards((prevLocationCards) => [
      ...prevLocationCards,
      locationData,
    ]);
  };

  return (
    <>
      <Sidebar locationCards={locationCards} />
      <div className="createItinerary--container">
        <header>
          <h2>Create an Itinerary</h2>
        </header>
        <form className="createItinerary-form" onSubmit={handleSubmit}>
          <section className="input-form">
            <label htmlFor="itineraryName">Itinerary Name</label>
            <input
              type="text"
              name="itineraryName"
              id="itineraryName"
              placeholder="Enter name"
              value={formData.itineraryName}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
            />
          </section>
          <section className="input-form">
            <label htmlFor="itineraryDescription">Description</label>
            <textarea
              name="itineraryDescription"
              id="itineraryDescription"
              placeholder="Enter Description"
              value={formData.itineraryDescription}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
              ref={descriptionRef}
            />
          </section>
          <form>
            <section className="label-container">
              <div className="input-form">
                <label htmlFor="itineraryTags">Tags</label>
                <input
                  type="text"
                  name="itineraryTags"
                  id="itineraryTags"
                  placeholder="Enter tags (max 5)"
                  value={formData.enteredTag}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKey}
                  ref={tagsRef}
                />
              </div>
              <div className="tag-container">
                {formData.itineraryTags.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
            </section>
          </form>
          <button>Add Location</button>
        </form>
      </div>
      <div>
        <Map handleLocationData={handleLocationData} />
      </div>
    </>
  );
};

export default CreateItinerary;
