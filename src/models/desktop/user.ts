export interface User {
  username: {
    value: string;
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
