export interface CreateItineraryData {
    firebase_uuid: string;
    itinerary_name: string;
    itinerary_descr: string;
    itinerary_tags: string[];
    enteredTag: string;
    locationData: LocationData[];
}

export interface KinjoData {
    name: string;
    description: string;
    tags: string[];
    locationData: LocationData[];
    kinjoCoords: [number, number];
}

// export interface LocationData {
//     loc_coords: [number, number];
//     location?: {
//         loc_coords: [number, number]
//     };
//     loc_name: string;
//     loc_descr_en: string;
//     loc_tags: string[];
// }

export interface Location {
    id: number;
    loc_coords: [number, number];
    location: {
        loc_coords: [number, number];
    }
    loc_name: string;
    loc_descr_en: string;
    loc_tags: string[];
    image_urls: string[];
}

export interface UserData {
    user_id: number;
    username: string;
    user_email: string;
}

//Prototype Itinerary definition aiming for front-back cross-compatibility 
export interface Itinerary {
    itinerary_id: number;
    firebase_uuid: string;
    itinerary_name: string           
    itinerary_descr_en: string
    itinerary_tags: string[];
    kinjo_coords: number[]
    user: {};
    likes: {}
    bookmarks: {}
    comments: {}
    itinerary_image_url: String?
}

// Interface Definitions from the backend;

// export interface ItineraryData {
//     id? : number;
//     firebase_uuid: string;
//     itinerary_name: string;
//     itinerary_descr: string;
//     itinerary_tags: string;
//     kinjo_coords: [number, number];
//     locationData: any; //type: Location[]
//   }
  
// export interface VisitedMap {
//     firebase_uuid: string;
//     visited_coords: [number, number];
//     visited_name: string;
//     visited_descr: string;
//   }
  