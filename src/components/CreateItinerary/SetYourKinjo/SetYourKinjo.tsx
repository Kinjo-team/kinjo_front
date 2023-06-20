import React, { useEffect, useState, useRef } from "react";
import { useKinjo } from "../../../contexts/KinjoContext";
import { useAuth } from "../../../contexts/AuthContext";
import Map from "../../Map/Map";
import Modal from "./Modal";

import "./SetYourKinjo.scss";

interface LocationData {
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
  loc_image_url: any;
}

interface CreateItineraryData {
  firebase_uuid: string;
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string[];
  enteredTag: string;
  kinjo_coords: [number, number];
  locationData: LocationData[];
}

type KinjoProcessProps = {
  forwardTransitionPage: () => void;
  toggleCreateItinerary: () => void;
};

const SetYourKinjo = ({
  forwardTransitionPage,
  toggleCreateItinerary,
}: KinjoProcessProps) => {
  // STATES
  const { kinjo, changeKinjo } = useKinjo();
  const { currentUser } = useAuth();
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState<CreateItineraryData>({
    firebase_uuid: "",
    itinerary_name: "",
    itinerary_descr: "",
    itinerary_tags: [],
    enteredTag: "",
    kinjo_coords: [0, 0],
    locationData: [],
  });

  // MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirmHandler, setModalConfirmHandler] = useState(
    () => () => {}
  );

  // REFS/VARIABLES
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  const MAX_AREA = 3539860000; // Biggest area district in Japan in meters for Ishikari, Hokkaido


  // EFFECTS

  useEffect(() => {
    if (currentUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firebase_uuid: currentUser.uid,
      }));
    }
  }, [currentUser]);

  // HANDLERS

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

  const forwardTransition = () => {
    setStage((prevStage) => prevStage + 1);
  };

  const handleLocationData = (locationData: LocationData) => {
    console.log("handleLocationData called with:", locationData);
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationData: [...prevFormData.locationData, locationData],
    }));
  };

  // const handleCircleCreated = (
  //   latitude: number,
  //   longitude: number,
  //   radius: number,
  //   layer: any,
  //   featureGroup: any
  // ) => {
  //   const userCircleArea = Math.PI * radius * radius;

  //   if (userCircleArea > MAX_AREA) {
  //     window.alert(
  //       "Your circle exceeds the maximum allowed area. Please try again."
  //     );
  //     featureGroup.removeLayer(layer);
  //     return;
  //   }

  //   if (
  //     window.confirm("Do you want to use these coordinates for your Kinjo?")
  //   ) {
  //     forwardTransition();
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       kinjo_coords: [latitude, longitude],
  //     }));
  //   }
  // };
  const handleCircleCreated = (
    latitude: number,
    longitude: number,
    radius: number,
    layer: any,
    featureGroup: any
  ) => {
    const userCircleArea = Math.PI * radius * radius;

    if (userCircleArea > MAX_AREA) {
      setModalMessage(
        "Your circle exceeds the maximum allowed area. Please try again."
      );
      setIsModalOpen(true);
      setModalConfirmHandler(() => () => featureGroup.removeLayer(layer));
      return;
    }

    setModalMessage("Do you want to use these coordinates for your Kinjo?");
    setIsModalOpen(true);
    setModalConfirmHandler(() => () => {
      forwardTransition();
      setFormData((prevFormData) => ({
        ...prevFormData,
        kinjo_coords: [latitude, longitude],
      }));
    });
  };

  // const handleImageUrl = (url: string) => {
  //   console.log("handleImageUrl called with:", url);
  //   console.log("typeof url", typeof url);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     loc_image_url: url,
  //   }));
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!window.confirm("Are you sure you want to submit this kinjo?")) {
    //   return;
    // }

    setModalMessage("Are you sure you want to submit this kinjo?");
    setIsModalOpen(true);
    setModalConfirmHandler(() => async () => {
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
            kinjo_coords: [0, 0],
            locationData: [],
          });
          forwardTransitionPage();
        } else {
          throw new Error("Failed to create itinerary");
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="create-kinjo--container">
      <button
        className="create-kinjo-close-btn"
        onClick={toggleCreateItinerary}
      >
        <span className="material-symbols-outlined">cancel</span>
      </button>

      {stage === 1 ? (
        <>
          <div className="create-header">
            <h1>1. Set Your Kinjo</h1>
            <p>Click on the map, and drag to set the confines of your Kinjo!</p>
            <div className="setkinjo-map-pointer">↓</div>
          </div>
        </>
      ) : (
        <>
          <div className="create-header">
            <h1>2. Populate your Kinjo!</h1>
            <p>Find the areas you want to show and add the information.</p>
          </div>
        </>
      )}
      <div className="setkinjo-map-container">
        <Map
          handleLocationData={handleLocationData}
          handleCircleCreated={handleCircleCreated}
        />
      </div>

      {stage === 2 && (
        <>
          <div className={`create-header stage3`}>
            <h1>3. Add information</h1>
            <p>
              You're almost there! fill in the information below to describe
              your Kinjo!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className={`submitkinjo--form ${stage === 2 ? "show" : ""}`}
          >
            <section className="input-form">
              <label htmlFor="itinerary_name">NAME</label>
              <input
                type="text"
                name="itinerary_name"
                id="itinerary_name"
                placeholder="e.g. My First Itinerary"
                value={formData.itinerary_name}
                onChange={handleInputChange}
                onKeyDown={handleEnterKey}
                required
              />
            </section>
            <section className="input-form">
              <label htmlFor="itinerary_descr">DESCRIPTION</label>
              <textarea
                name="itinerary_descr"
                id="itinerary_descr"
                placeholder="Add description"
                value={formData.itinerary_descr}
                onChange={handleInputChange}
                onKeyDown={handleEnterKey}
                ref={descriptionRef}
                required
              />
            </section>
            <form>
              <div className="input-form">
                <label htmlFor="itinerary_tags">TAGS</label>
                <input
                  type="text"
                  name="itinerary_tags"
                  id="itinerary_tags"
                  placeholder="Add tags(max 5) e.g. coffee"
                  value={formData.enteredTag}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKey}
                  ref={tagsRef}
                  required
                />
              </div>
              <div className="tag-container">
                {formData.itinerary_tags.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
            </form>
            <div className="submitkinjo-btn-grp">
              <button
                type="submit"
                className="submitkinjo-submit-btn"
                disabled={false}
              >
                Submit
              </button>
              <button
                className="submitkinjo-cancel-btn"
                onClick={toggleCreateItinerary}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={() => {
          modalConfirmHandler();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SetYourKinjo;
