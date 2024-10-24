import { createContext, useState, useContext } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => useContext(RefreshContext);

export function RefreshProvider({ children }) {
    const [refresh, setRefresh] = useState(false);

    return (
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
}
