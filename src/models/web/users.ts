export interface User {
  email: {
    value: string;
    email: boolean;
    error: boolean;
    msg: string;
    required: boolean;
  };
  password: {
    value: string;
    error: boolean;
    msg: string;
    required: boolean;
  };
}

export interface RegisterUser {
  email: {
    value: string;
    email: boolean;
    error: boolean;
    msg: string;
    required: boolean;
  };
  password: {
    value: string;
    error: boolean;
    msg: string;
    required: boolean;
  };
  fullname: {
    value: string;
    error: boolean;
    msg: string;
    required: boolean;
  };
  department: {
    value: string;
    error: boolean;
    msg: string;
    required: boolean;
  };
  id_number: {
    value: number;
    error: boolean;
    msg: string;
    required: boolean;
  };
}
