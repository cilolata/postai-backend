export interface IPost {
  id?: number;
  title: string;
  description: string;
  subject?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date | string;
  user_id: number;
}

export interface IPostUpdate {
  id?: number;
  title?: string;
  description?: string;
  subject?: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date | string;
  user_id?: number;
}
