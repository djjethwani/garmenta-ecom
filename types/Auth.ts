export interface LoginFields {
  phone: string;
  password: string;
}

export interface SignupFields extends LoginFields {
  name: string;
}
