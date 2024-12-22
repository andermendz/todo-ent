interface TaskFactoryOptions {
  minTasks?: number;
  maxTasks?: number;
}

const subjects = [
  "User interface",
  "Database",
  "API",
  "Documentation",
  "Authentication system",
  "Search functionality",
  "Payment integration",
  "Email service",
  "Analytics dashboard",
  "Mobile app",
  "Security features",
  "Performance",
  "Testing suite",
  "Deployment pipeline",
  "Backup system",
  "User settings",
  "Notifications",
  "File upload",
  "Chat system",
  "Reports generator"
];

const actions = [
  "Implement",
  "Update",
  "Optimize",
  "Debug",
  "Refactor",
  "Test",
  "Review",
  "Deploy",
  "Monitor",
  "Configure",
  "Migrate",
  "Secure",
  "Document",
  "Analyze",
  "Validate"
];

const contexts = [
  "for the new release",
  "in production environment",
  "for better performance",
  "to fix reported issues",
  "for compliance requirements",
  "to improve user experience",
  "before the deadline",
  "with the new framework",
  "using best practices",
  "for scalability",
  "with proper testing",
  "following the roadmap",
  "based on user feedback",
  "with the team",
  "as per requirements"
];

const statuses: Array<'To Do' | 'In Progress' | 'Done'> = ['To Do', 'In Progress', 'Done'];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateUniqueTitle = (existingTitles: Set<string>): string => {
  let attempts = 0;
  let title: string;
  
  do {
    title = `${getRandomElement(actions)} ${getRandomElement(subjects)} ${getRandomElement(contexts)}`;
    attempts++;
  } while (existingTitles.has(title) && attempts < 50);

  return title;
};

export const generateTasks = ({ minTasks = 1, maxTasks = 3 }: TaskFactoryOptions = {}) => {
  const count = Math.floor(Math.random() * (maxTasks - minTasks + 1)) + minTasks;
  const tasks = [];
  const usedTitles = new Set<string>();

  const statusWeights = {
    'To Do': 0.5,
    'In Progress': 0.3,
    'Done': 0.2
  };

  for (let i = 0; i < count; i++) {
    const title = generateUniqueTitle(usedTitles);
    usedTitles.add(title);

    const rand = Math.random();
    let status: typeof statuses[number];
    if (rand < statusWeights['To Do']) {
      status = 'To Do';
    } else if (rand < statusWeights['To Do'] + statusWeights['In Progress']) {
      status = 'In Progress';
    } else {
      status = 'Done';
    }

    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);

    tasks.push({
      id: `factory-${Date.now()}-${i}`,
      title,
      status,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }

  return tasks;
}; 