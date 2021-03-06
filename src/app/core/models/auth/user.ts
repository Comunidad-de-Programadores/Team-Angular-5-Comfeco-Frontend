export interface User{
  userName:string;
  email:string;
}

export interface UserFirebase {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  nickName?: string;
  gender?: string;
  dateBirth?: Date;
  country?: string;
  biography?: string;
}