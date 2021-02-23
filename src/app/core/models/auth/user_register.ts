import { User } from "./user";


export interface RegisterUser extends User{
  password: string;
  confirmPasword: string;
}
