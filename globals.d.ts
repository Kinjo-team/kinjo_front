export interface LocationData {
    loc_coords: [number, number];
    creator_id?: string | undefined;
    itinerary_id?: number | undefined;
    loc_name: string;
    loc_descr_en: string;
    loc_tags: string[];
}
  
export interface CreateItineraryData {
    itinerary_name: string;
    creator_id: string | undefined;
    itinerary_id: number;
    itinerary_descr_en: string;
    itinerary_descr_jp?: string;
    itinerary_tags: string[];
    enteredTag: string;
    locationData: LocationData[];
  }

export interface Location {
    loc_id: number;
    creator_id?: string,
    loc_coords: [number, number];
    loc_name: string;
    loc_descr_en: string;
    loc_descr_ja?: string;
    loc_tags: string[];
  }
  
export interface MapProps {
    handleLocationData: (locationData: Location) => void;
  }