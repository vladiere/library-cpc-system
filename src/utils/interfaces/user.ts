export interface IUser {
  user_id: number;
  id_number: number;
  total_amount : number | null;
  fullname: string;
  department: string;
  email_address: string;
  img_path: string | null;
  user_status: string;
  created_at: string;
  updated_at: string;
  edited_at: string;
}
