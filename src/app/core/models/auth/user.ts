export interface User{
  userName?:string;
  email?:string;
}

export interface UserFirebase extends User {
  uid?: string;
  photoURL?: string;
  fullName?: string;
  gender?: string;
  dateBirth?: Date;
  country?: string;
  biography?: string;
  facebook?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  interests?: string;
}