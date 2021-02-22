export interface User{
  userName:string;
  email:string;
}

export interface UserFirebase {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}