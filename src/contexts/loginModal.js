import React, { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalProvider({children}) {
    const [ LoginModal, setLoginModal ] = useState(false);

    return(
        <LoginModalContext.Provider value={{ LoginModal, setLoginModal }}>
            {children}
        </LoginModalContext.Provider>
    );
}

export function useLoginModal() {
    return useContext(LoginModalContext);
  }
  