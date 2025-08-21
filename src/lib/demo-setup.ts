import { extendedDbUtils } from './auth-browser';

// Simple hash function for demo setup
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'uniflow-super-secret-jwt-key-change-in-production');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const setupDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await extendedDbUtils.getUserByEmail('demo@uniflow.com');
    if (existingUser) {
      console.log('Demo user already exists');
      return existingUser;
    }

    // Create demo user
    const passwordHash = await hashPassword('demo123');

    const demoUser = await extendedDbUtils.createUser({
      email: 'demo@uniflow.com',
      passwordHash,
      firstName: 'Demo',
      lastName: 'User',
      isEmailVerified: true, // Demo user is pre-verified
      twoFactorEnabled: false,
      preferences: {
        theme: 'system',
        notifications: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });

    console.log('Demo user created successfully:', demoUser);
    return demoUser;
  } catch (error) {
    console.error('Error creating demo user:', error);
    throw error;
  }
};

export const createDemoData = async (userId: number) => {
  try {
    // Create some demo notes
    const demoNotes = [
      {
        userId,
        title: 'Welcome to UniFlow!',
        content: `# Welcome to UniFlow! 🎉

This is your first note in UniFlow. Here are some things you can do:

## Features Available
- **Notes**: Create, edit, and organize your thoughts
- **Calendar**: Schedule events and manage your time (Coming Soon)
- **Tasks**: Track your daily to-dos and priorities
- **Integrations**: Connect with external services

## Getting Started
1. Explore the sidebar navigation
2. Create your first note
3. Explore the authentication system
4. Set up your task list

*Happy organizing!*`,
        tags: ['welcome', 'getting-started'],
        isArchived: false,
        isPinned: true,
      },
      {
        userId,
        title: 'Project Ideas',
        content: `# Project Ideas 💡

## Web Development
- [ ] Build a portfolio website
- [ ] Create a React component library
- [ ] Develop a task management app

## Learning Goals
- [ ] Master TypeScript
- [ ] Learn Next.js 14
- [ ] Study system design

## Personal Projects
- [ ] Start a blog
- [ ] Learn photography
- [ ] Build a home automation system`,
        tags: ['projects', 'ideas', 'goals'],
        isArchived: false,
        isPinned: false,
      },
      {
        userId,
        title: 'Meeting Notes - Q1 Planning',
        content: `# Q1 Planning Meeting Notes 📊

**Date**: January 15, 2024
**Attendees**: Team Lead, Developers, Designers

## Key Points Discussed
1. **Project Timeline**: Q1 goals and milestones
2. **Resource Allocation**: Team assignments and responsibilities
3. **Risk Assessment**: Potential challenges and mitigation strategies

## Action Items
- [ ] Review current sprint progress
- [ ] Update project documentation
- [ ] Schedule follow-up meetings

## Next Steps
- Weekly progress reviews
- Monthly stakeholder updates
- Quarterly retrospective`,
        tags: ['meeting', 'planning', 'work'],
        isArchived: false,
        isPinned: false,
      }
    ];

    // Create demo events
    const demoEvents = [
      {
        userId,
        title: 'Team Standup',
        description: 'Daily team synchronization meeting',
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 minutes
        allDay: false,
        type: 'meeting' as const,
        isRecurring: true,
        reminderMinutes: 15,
      },
      {
        userId,
        title: 'Project Deadline',
        description: 'Submit final project deliverables',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // +1 hour
        allDay: false,
        type: 'assignment' as const,
        isRecurring: false,
        reminderMinutes: 60,
      },
      {
        userId,
        title: 'Gym Session',
        description: 'Weekly workout routine',
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000), // +1.5 hours
        allDay: false,
        type: 'personal' as const,
        isRecurring: true,
        reminderMinutes: 30,
      }
    ];

    // Create demo tasks
    const demoTasks = [
      {
        userId,
        title: 'Review project requirements',
        description: 'Go through the new project specifications and create a plan',
        completed: false,
        priority: 'high' as const,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        category: 'Work',
        tags: ['project', 'planning'],
        order: 1,
      },
      {
        userId,
        title: 'Update portfolio website',
        description: 'Add recent projects and improve the design',
        completed: false,
        priority: 'medium' as const,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        category: 'Personal',
        tags: ['portfolio', 'web-design'],
        order: 2,
      },
      {
        userId,
        title: 'Read TypeScript documentation',
        description: 'Study advanced TypeScript features and best practices',
        completed: false,
        priority: 'low' as const,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        category: 'Learning',
        tags: ['typescript', 'learning'],
        order: 3,
      },
      {
        userId,
        title: 'Complete daily standup',
        description: 'Attend the team standup meeting and provide updates',
        completed: true,
        priority: 'high' as const,
        dueDate: new Date(),
        category: 'Work',
        tags: ['meeting', 'standup'],
        order: 4,
      }
    ];

    // Import the database utilities
    const { dbUtils } = await import('./database');

    // Create notes
    for (const note of demoNotes) {
      await dbUtils.createNote(note);
    }

    // Create events
    for (const event of demoEvents) {
      await dbUtils.createEvent(event);
    }

    // Create tasks
    for (const task of demoTasks) {
      await dbUtils.createTask(task);
    }

    console.log('Demo data created successfully');
  } catch (error) {
    console.error('Error creating demo data:', error);
    throw error;
  }
};

export const initializeDemoEnvironment = async () => {
  try {
    const demoUser = await setupDemoUser();
    await createDemoData(demoUser.id!);
    console.log('Demo environment initialized successfully');
  } catch (error) {
    console.error('Error initializing demo environment:', error);
  }
};
