export type RequestStatus = 'Pending' | 'Under Review' | 'Approved' | 'Completed' | 'Rejected';

export interface ReliefRequest {
  id: string;
  requester: string;
  category: 'Typhoon Relief' | 'Earthquake Aid' | 'Medical Emergency' | 'Flood Recovery' | 'Food & Shelter';
  dateSubmitted: string;
  status: RequestStatus;
  assignedTo: string;
  amountRequested: number;
  location: string;
  description: string;
  attachments?: string[];
  timeline: {
    title: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface ActivityLog {
  id: string;
  user: string;
  avatar: string;
  description: string;
  timestamp: string;
  status: 'Approved' | 'Pending' | 'Completed' | 'Updated';
}

export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: 'Admin' | 'Field Manager' | 'Auditor' | 'Coordinator';
  status: 'Active' | 'Inactive';
  dateJoined: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export type ActiveTab = 
  | 'dashboard'
  | 'requests'
  | 'request-detail'
  | 'organizations'
  | 'reports'
  | 'notifications'
  | 'settings';
