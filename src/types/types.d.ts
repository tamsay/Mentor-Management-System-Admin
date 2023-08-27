type MentorManager = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  designation: string | null;
  image: string | null;
  positionTags: string[];
};

type Mentor = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  designation: string | null;
  image: string | null;
  positionTags: string[];
};

type TaskReport = {
  id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  author: string;
  date: string;
  icon: string;
};
