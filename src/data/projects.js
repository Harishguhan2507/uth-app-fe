export const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'Real-time ML Pipeline',
    team: 4,
    status: 'Active',
    due: 'Aug 2026',
    skillsNeeded: ['Python', 'Kafka', 'ML', 'AWS'],
    members: ['MK', 'AR', 'KV', 'PL']
  },
  {
    id: 2,
    name: 'Project Beta',
    description: 'Customer Dashboard',
    team: 3,
    status: 'Planning',
    due: 'Oct 2026',
    skillsNeeded: ['React', 'UX', 'Power BI'],
    members: ['JS', 'SM', 'RS']
  },
  {
    id: 3,
    name: 'Project Gamma',
    description: 'Internal Chatbot',
    team: 2,
    status: 'Completed',
    due: 'Mar 2026',
    skillsNeeded: ['NLP', 'Node.js', 'Python'],
    members: ['DN', 'KV']
  }
];

export const recentRequests = [
  { requester: 'Demo PM', talent: 'Meenakshi K.', project: 'Project Alpha', status: 'Approved' },
  { requester: 'Ops Lead', talent: 'Priya L.', project: 'Demand Monitor', status: 'Pending' },
  { requester: 'Data Manager', talent: 'Aneesh R.', project: 'Fraud Model', status: 'In review' },
  { requester: 'UX Lead', talent: 'Santhia M.', project: 'Portal Redesign', status: 'Approved' },
  { requester: 'Engineering Head', talent: 'Karthik V.', project: 'Infra Upgrade', status: 'Pending' }
];

export const skillDemand = [
  { skill: 'Python', demand: 92 },
  { skill: 'React', demand: 86 },
  { skill: 'ML', demand: 78 },
  { skill: 'SQL', demand: 73 },
  { skill: 'Node.js', demand: 67 }
];
