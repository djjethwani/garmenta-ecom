import { useCallback } from 'react';
import { mutate } from 'swr';

import AuthService from '@/services/AuthService';
import { autoLogin, autoLogout } from '@/utils/auth';

export const useGoogleLogin = () => {
  return useCallback(async (idToken: string) => {
    const { token } = await AuthService.verifyGoogleIdToken(idToken);
    autoLogin(token);
    mutate('/api/me');
  }, []);
};

export const useLogin = () => {
  return useCallback(async (phone: string, password: string) => {
    const { token } = await AuthService.login(phone, password);
    autoLogin(token);
    mutate('/api/me');
  }, []);
};

export const useSignup = () => {
  return useCallback(
    async ({ name, password, phone }: { name: string; password: string; phone: string }) => {
      const { token } = await AuthService.signUp({ name, password, phone });
      autoLogin(token);
      mutate('/api/me');
    },
    []
  );
};

export const useLogout = () => {
  return useCallback(async () => {
    autoLogout();
    mutate('/api/me');
  }, []);
};
