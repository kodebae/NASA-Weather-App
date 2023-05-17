import React, {useContext, useState} from 'react'; 

const mainContext = React.createContext();

export function useMainContext(){
    return useContext(mainContext);
}
// this custom hook allows children of "Context" provider to access the Context provider - needs to be imported

export function ContextProvider({children}){
    const [eventData, setEventData] = useState([]);
    // NASA EONET data pulled in here
    const [selectedEvent, setSelectedEvent] = useState(null); 
    // null value to start, used to store even data that user wants to navigate to
    const [reRenderMarkers, setReRenderMarkers] = useState(null);
    // null value to start, used to reload the filters when user selects a new marker

    const value = {
        eventData,
        setEventData,
        selectedEvent,
        setSelectedEvent,
        reRenderMarkers,
        setReRenderMarkers

    } // declaring the object, stored on the Context provider

    return(
        <mainContext.Provider value={value}>
            {children}
        </mainContext.Provider>
    )
} 
// syntaxt to return the main functionality of Context API
// functional component used to wrap our app, that is why we are using this casing

/** Context API => a way to pass props through the component tree without having to pass props down manually at every level, 
sharing values like these between components without having to explicitly pass a prop through every level of the tree. It holds our store 
and is the new parent of all of our components. It provides the state, and also a Consumer. A component that consumes and uses the state. 
**/


