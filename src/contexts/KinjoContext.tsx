import React, { ProviderProps, ReactNode, useContext, createContext, useState} from 'react'

interface KinjoData {
    name: string;
    description: string;
    tags: string[];
    locationData: LocationData[];
    kinjoCoords: [number, number];
}

interface LocationData {
    loc_coords: [number, number];
    loc_name: string;
    loc_descr_en: string;
    loc_tags: string[];
}

interface KinjoContextProps {
    kinjo: KinjoData;
    changeKinjo: (newKinjo: KinjoData) => void;
  }
  
const KinjoContext = createContext<KinjoContextProps | undefined>(undefined);
  
export function useKinjo(): KinjoContextProps {
    const context = useContext(KinjoContext);
    if (!context) {
      throw new Error('useKinjo must be used within a KinjoProvider');
    }
    return context;
  }

export function KinjoProvider({children} : ProviderProps<ReactNode>) {
    const [kinjo, setKinjo] = useState<KinjoData>({
        name: "",
        description: "",
        tags: [],
        locationData: [],
        kinjoCoords: [0,0]
    })

    function changeKinjo(newKinjo: KinjoData) {
        setKinjo(newKinjo)
    }

    const value : KinjoContextProps = {
        kinjo,
        changeKinjo
    }

    return (
        <>
            <KinjoContext.Provider value={value}>
                {children}
            </KinjoContext.Provider>
        </>
    )
}