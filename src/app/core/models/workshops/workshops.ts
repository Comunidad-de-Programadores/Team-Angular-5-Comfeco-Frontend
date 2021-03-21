export interface Workshop{
  name:string;
  date: Date;
  author_name:string;
  social_url:string;
  knowledge_area:KnowledgeArea;
  id:string;
}

export interface KnowledgeArea{
  name:string;
  id:string;
}
