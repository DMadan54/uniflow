import Dexie, { Table } from 'dexie';

// User interface
export interface User {
  id?: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    timezone: string;
  };
}

// Note interface
export interface Note {
  id?: number;
  userId: number;
  title: string;
  content: string;
  tags: string[];
  folderId?: number;
  isArchived: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

// Folder interface for note organization
export interface Folder {
  id?: number;
  userId: number;
  name: string;
  parentId?: number;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Event interface
export interface Event {
  id?: number;
  userId: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  type: 'class' | 'assignment' | 'personal' | 'meeting' | 'study' | 'exam' | 'project' | 'other';
  location?: string;
  color?: string;
  isRecurring: boolean;
  recurrenceRule?: string;
  reminderMinutes?: number;
  priority: 'low' | 'medium' | 'high';
  attendees?: string[];
  estimatedDuration?: number; // in minutes
  actualDuration?: number; // in minutes
  isCompleted: boolean;
  parentEventId?: number; // for recurring event instances
  createdAt: Date;
  updatedAt: Date;
}

// Task interface
export interface Task {
  id?: number;
  userId: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  category?: string;
  tags: string[];
  parentTaskId?: number;
  order: number;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  complexity: 'easy' | 'medium' | 'hard';
  progress: number; // 0-100 percentage
  startTime?: Date;
  endTime?: Date;
  isTimeTracked: boolean;
  dependencies?: number[]; // array of task IDs this task depends on
  createdAt: Date;
  updatedAt: Date;
}

// Integration interface
export interface Integration {
  id?: number;
  userId: number;
  type: 'spotify' | 'myfitnesspal' | 'strava' | 'other';
  name: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  isActive: boolean;
  settings: Record<string, any>;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Sync data interface
export interface SyncData {
  id?: number;
  userId: number;
  integrationId: number;
  data: Record<string, any>;
  timestamp: Date;
}



export class UniFlowDatabase extends Dexie {
  users!: Table<User>;
  notes!: Table<Note>;
  folders!: Table<Folder>;
  events!: Table<Event>;
  tasks!: Table<Task>;
  integrations!: Table<Integration>;
  syncData!: Table<SyncData>;

  constructor() {
    super('UniFlowDatabase');
    
    this.version(1).stores({
      users: '++id, email, emailVerificationToken, resetPasswordToken',
      notes: '++id, userId, folderId, tags, isArchived, isPinned, createdAt',
      folders: '++id, userId, parentId, name',
      events: '++id, userId, startDate, endDate, type, isRecurring',
      tasks: '++id, userId, completed, priority, dueDate, parentTaskId, order',
      integrations: '++id, userId, type, isActive',
      syncData: '++id, userId, integrationId, timestamp'
    });

    // Add indexes for better performance
    this.version(2).stores({
      notes: '++id, userId, folderId, tags, isArchived, isPinned, createdAt, updatedAt',
      events: '++id, userId, startDate, endDate, type, isRecurring, createdAt',
      tasks: '++id, userId, completed, priority, dueDate, parentTaskId, order, createdAt'
    });


  }
}

export const db = new UniFlowDatabase();

// Database utilities
export const dbUtils = {
  // User utilities
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const user: User = {
      ...userData,
      createdAt: now,
      updatedAt: now,
    };
    const id = await db.users.add(user);
    return { ...user, id: id as number };
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await db.users.where('email').equals(email).first();
  },

  async getUserById(id: number): Promise<User | undefined> {
    return await db.users.get(id);
  },

  async updateUser(id: number, updates: Partial<User>): Promise<void> {
    await db.users.update(id, { ...updates, updatedAt: new Date() });
  },

  // Note utilities
  async createNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<Note> {
    const now = new Date();
    const note: Note = {
      ...noteData,
      createdAt: now,
      updatedAt: now,
      version: 1,
    };
    const id = await db.notes.add(note);
    return { ...note, id: id as number };
  },

  async getNotesByUserId(userId: number): Promise<Note[]> {
    return await db.notes.where('userId').equals(userId).toArray();
  },

  async updateNote(id: number, updates: Partial<Note>): Promise<void> {
    const note = await db.notes.get(id);
    if (note) {
      await db.notes.update(id, { 
        ...updates, 
        updatedAt: new Date(),
        version: note.version + 1
      });
    }
  },

  // Event utilities
  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const now = new Date();
    const event: Event = {
      ...eventData,
      createdAt: now,
      updatedAt: now,
    };
    const id = await db.events.add(event);
    return { ...event, id: id as number };
  },

  async getEventsByUserId(userId: number, startDate?: Date, endDate?: Date): Promise<Event[]> {
    let query = db.events.where('userId').equals(userId);
    
    if (startDate && endDate) {
      query = query.filter(event => 
        event.startDate >= startDate && event.endDate <= endDate
      );
    }
    
    return await query.toArray();
  },

  // Task utilities
  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const now = new Date();
    const task: Task = {
      ...taskData,
      createdAt: now,
      updatedAt: now,
    };
    const id = await db.tasks.add(task);
    return { ...task, id: id as number };
  },

  async getTasksByUserId(userId: number, completed?: boolean): Promise<Task[]> {
    let query = db.tasks.where('userId').equals(userId);
    
    if (completed !== undefined) {
      query = query.filter(task => task.completed === completed);
    }
    
    return await query.toArray();
  },

  async updateTask(id: number, updates: Partial<Task>): Promise<void> {
    await db.tasks.update(id, { ...updates, updatedAt: new Date() });
  },

  // Integration utilities
  async createIntegration(integrationData: Omit<Integration, 'id' | 'createdAt' | 'updatedAt'>): Promise<Integration> {
    const now = new Date();
    const integration: Integration = {
      ...integrationData,
      createdAt: now,
      updatedAt: now,
    };
    const id = await db.integrations.add(integration);
    return { ...integration, id: id as number };
  },

  async getIntegrationsByUserId(userId: number): Promise<Integration[]> {
    return await db.integrations.where('userId').equals(userId).toArray();
  },

  async updateIntegration(id: number, updates: Partial<Integration>): Promise<void> {
    await db.integrations.update(id, { ...updates, updatedAt: new Date() });
  },


};

export default db;
