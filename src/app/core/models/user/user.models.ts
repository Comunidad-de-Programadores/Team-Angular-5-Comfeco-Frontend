export interface UserDetail {
  user_id: string;
  group_member?:string;
  team_rol?:string;
  badges?:Badge[];
  active_events?:Event[];
  ban_events?:Event[];
  activities:Activity[]
}


export interface Badge{
  id:string;
  name:string;
  description:string;
  how_to:string;
  id_badge:string;
  img_url:string;
}

export interface Event{
  id:string;
  name:string;
  description:string;
  img_url:string;
  date:Date;
}

export interface Group{
  id:string;
  name:string;
  description:string;
  img_url:string;
  group_members:GroupMembers[];
}

export interface GroupMembers{
  group:string;
  members:UserDetail[];
}

export interface Activity{
  id?:string;
  description:string;
}
