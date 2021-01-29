import React, { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken('login', { email, password }, 'POST');
    console.log(resp);

    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { usuario } = resp;
      console.log(usuario);

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      console.log('Autenticado!');
    }

    return resp.ok;
  };

  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken(
      'login/new',
      { nombre, password, email },
      'POST'
    );
    // console.log(resp);

    return resp;
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth({
        checking: false,
        logged: false,
      });

      return false;
    }

    const resp = await fetchConToken('login/renew');
    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { usuario } = resp;
      console.log(usuario);

      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });

      console.log('Autenticado!');
      return true;
    } else {
      setAuth({
        checking: false,
        logged: false,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      checking: false,
      logged: false,
    });
    dispatch({
      type: types.cerrarSesion,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        verificaToken,
        logout,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
