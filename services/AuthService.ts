import apiClient from '@/lib/apiClient';
import { User } from '@/types';
import { catchError } from '@/utils/catchError';

interface UserData {
  user: User;
  token: string;
}

interface UserPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UserFields {
  name: string;
  email: string;
  image: string | ArrayBuffer | null;
}

const getMe = async (): Promise<UserData> => {
  try {
    const { data } = await apiClient.get(`/auth/me`);

    const userData: UserData = {
      token: data.data.token,
      user: data.data.user,
    };

    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const verifyGoogleIdToken = async (idToken: string): Promise<UserData> => {
  try {
    const url = `/auth/google`;
    const { data } = await apiClient.post(url, { idToken });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const login = async (phone: string, password: string): Promise<UserData> => {
  try {
    const url = `/auth/login`;
    const { data } = await apiClient.post(url, { phone, password });
    const userData: UserData = {
      user: data.user,
      token: data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const signUp = async ({
  password,
  name,
  phone
}: {
  password: string;
  name: string;
  phone: string
}): Promise<UserData> => {
  try {
    const url = `/auth/signUp`;
    const { data } = await apiClient.post(url, { password, name, phone });
    const userData: UserData = {
      user: data.user,
      token: data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const changePassword = async (passwordFields: UserPasswordData): Promise<UserData> => {
  try {
    const url = `/auth/change-password`;
    const { data } = await apiClient.patch(url, passwordFields);
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateProfile = async (userId: string, userFields: UserFields): Promise<User> => {
  try {
    const url = `/users/${userId}`;
    const { data } = await apiClient.patch(url, userFields);

    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const AuthService = {
  getMe,
  login,
  signUp,
  verifyGoogleIdToken,
  changePassword,
  updateProfile,
};

export default AuthService;
