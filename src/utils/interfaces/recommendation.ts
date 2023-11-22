interface IRecommendedInstructor {
  recommendation_id: number;
  user_id: number;
  book_id: number;
  fullname: string;
  department: string;
  img_path: string | null;
  title: string;
  author_name: string;
  total_checkedout: string;
  recommendation_status: string;
  visibility: string;
}

interface IRecommendPersonal {
  recommendation_id: number;
  user_id: number;
  book_id: number;
  fullname: string;
  department: string;
  img_path: string | null;
  title: string;
  author_name: string;
  total_checkedout: string;
  recommendation_status: string;
}

export default {
  IRecommendedInstructor,
  IRecommendPersonal,
}
