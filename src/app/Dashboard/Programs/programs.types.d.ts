type ProgramDetails = {
  name: string | null;
  description: string | null;
  id: string;
  createdAt: string;
  image: string | null;
  archivedBy: string | null;
  createdBy: string | null;
  reports: TaskReport[];
  mentorManagers: MentorManager[];
  mentors: Mentor[];
  criteria: ProgramCriteria;
  // reports: string[];
  // mentorManagers: string[];
  // mentors: string[];
  // criteria: Record<string, any>;
};

type ProgramCriteria = {
  [propertyName: string]: string | number | boolean | string[] | null;
};
