import React, {useState, useRef, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import "./SubmitKinjo.scss"

type SubmitKinjoProps = {
    forwardTransition: () => void
    backwardTransition: () => void
}

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

const SubmitKinjo = ({forwardTransition, backwardTransition} : SubmitKinjoProps) => {
    // STATES
    const [formData, setFormData] = useState<CreateItineraryData>({
        firebase_uuid: "",
        itinerary_name: "",
        itinerary_descr: "",
        itinerary_tags: [],
        enteredTag: "",
        locationData: [],
      });
    // REFS/VARIABLES
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const { currentUser } = useAuth();

    // EFFECT
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

  return (
    <div className='setkinjo--container'>
        <h1>3. Add information</h1>
        <p>You're almost there! fill in the information below to describe your Kinjo!</p>
        <form onSubmit={forwardTransition} className="submitkinjo--form">
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
                />
            </section>
            <form>
                <section className="label-container">
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
            <button className='submitkinjo-submit-btn' disabled={false}>Submit</button>
            <button className='submitkinjo-cancel-btn' onClick={backwardTransition}>Back</button>
        </form>
    </div>
  )
}

export default SubmitKinjo