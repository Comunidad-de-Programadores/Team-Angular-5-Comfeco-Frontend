export interface InputItem{
  src:string;
  title?: string;
  body?: string;
  icon?: string;
  url?: string;
}

export interface InputPage{
  pageItems:InputItem[];
}

export enum CarouselMode{
  img = 'IMG',
  card = 'CARD',
  icon = 'ICON'
}
