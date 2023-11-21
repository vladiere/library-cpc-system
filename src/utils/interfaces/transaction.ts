interface IPending {
  pending_transaction_id: number;
  user_id: number;
  title: string;
  fullname: string;
  transaction_type: string;
  status: string;
  request_date: string;
  approve_date: string | null;
  img_path: string;
}

interface IHistorybook {
  transaction_id: number;
  user_id: number;
  title: string;
  author_name: string;
  fullname: string;
  transaction_type: string;
  transaction_date: string;
  due_date: string;
  status: string;
  last_date: string;
  img_path: string;
}

export default {
  IPending,
  IHistorybook,
}
