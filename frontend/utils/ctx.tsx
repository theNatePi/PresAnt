import React from 'react';
import { useStorageState, setStorageItemAsync } from './useStorageState';

const AuthContext = React.createContext<{
  signIn: (username: string) => void;
  signOut: () => void;
  session?: string | null;
  id?: number | null;
  isLoading: boolean;
}>({
  signIn: (username) => null,
  signOut: () => null,
  session: null,
  id: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  let [[isLoading, session], setSession] = useStorageState('session');
  const [s, s2  , logOut] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (username) => {
            console.log("HI IM HERE");
            console.log(username);
            setSession(username);
            console.log(session);
        },
        signOut: async () => {
          setSession(null);
          await setStorageItemAsync('session', null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
