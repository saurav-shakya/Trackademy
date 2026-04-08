export type UserRole = "student" | "faculty" | "hod" | "admin";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "revision";

export interface ActivityRequest {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  eventName: string;
  organizer: string;
  eventDate: string;
  location: string;
  participationType: "individual" | "team";
  budgetRequested: number;
  description: string;
  status: ApprovalStatus;
  facultyStatus: ApprovalStatus;
  hodStatus: ApprovalStatus;
  adminStatus: ApprovalStatus;
  submittedAt: string;
  lastUpdated: string;
  remarks?: string;
  hasReimbursement: boolean;
  resultType?: "winner" | "runner-up" | "participant";
  certificateId?: string;
}

export interface StatsCard {
  label: string;
  value: number;
  change?: string;
  trend?: "up" | "down";
}

export const mockActivities: ActivityRequest[] = [
  {
    id: "ACT-001",
    studentName: "Aarav Sharma",
    studentId: "STU-2024-001",
    department: "Computer Science",
    eventName: "National Hackathon 2024",
    organizer: "TechFest India",
    eventDate: "2024-03-15",
    location: "Mumbai, Maharashtra",
    participationType: "team",
    budgetRequested: 15000,
    description: "48-hour national-level hackathon focused on sustainable tech solutions.",
    status: "approved",
    facultyStatus: "approved",
    hodStatus: "approved",
    adminStatus: "approved",
    submittedAt: "2024-02-20",
    lastUpdated: "2024-03-01",
    hasReimbursement: true,
    resultType: "winner",
    certificateId: "CERT-2024-001",
  },
  {
    id: "ACT-002",
    studentName: "Priya Patel",
    studentId: "STU-2024-002",
    department: "Electronics",
    eventName: "IEEE Conference on IoT",
    organizer: "IEEE India Chapter",
    eventDate: "2024-04-10",
    location: "Bangalore, Karnataka",
    participationType: "individual",
    budgetRequested: 8000,
    description: "Paper presentation on IoT-based smart agriculture systems.",
    status: "pending",
    facultyStatus: "approved",
    hodStatus: "pending",
    adminStatus: "pending",
    submittedAt: "2024-03-05",
    lastUpdated: "2024-03-10",
    hasReimbursement: false,
  },
  {
    id: "ACT-003",
    studentName: "Rahul Kumar",
    studentId: "STU-2024-003",
    department: "Mechanical",
    eventName: "SAE BAJA Competition",
    organizer: "SAE India",
    eventDate: "2024-05-20",
    location: "Pithampur, MP",
    participationType: "team",
    budgetRequested: 50000,
    description: "Design and build an off-road vehicle for the national BAJA competition.",
    status: "revision",
    facultyStatus: "approved",
    hodStatus: "revision",
    adminStatus: "pending",
    submittedAt: "2024-03-12",
    lastUpdated: "2024-03-18",
    remarks: "Please provide detailed budget breakdown for vehicle parts.",
    hasReimbursement: false,
  },
  {
    id: "ACT-004",
    studentName: "Sneha Reddy",
    studentId: "STU-2024-004",
    department: "Computer Science",
    eventName: "Google Summer of Code",
    organizer: "Google",
    eventDate: "2024-06-01",
    location: "Remote",
    participationType: "individual",
    budgetRequested: 0,
    description: "Open source contribution program under Google mentorship.",
    status: "approved",
    facultyStatus: "approved",
    hodStatus: "approved",
    adminStatus: "approved",
    submittedAt: "2024-02-15",
    lastUpdated: "2024-02-28",
    hasReimbursement: false,
    resultType: "participant",
    certificateId: "CERT-2024-002",
  },
  {
    id: "ACT-005",
    studentName: "Vikram Singh",
    studentId: "STU-2024-005",
    department: "Civil",
    eventName: "Smart India Hackathon",
    organizer: "Ministry of Education",
    eventDate: "2024-04-25",
    location: "New Delhi",
    participationType: "team",
    budgetRequested: 12000,
    description: "Government-backed hackathon for solving real-world problems.",
    status: "pending",
    facultyStatus: "pending",
    hodStatus: "pending",
    adminStatus: "pending",
    submittedAt: "2024-03-20",
    lastUpdated: "2024-03-20",
    hasReimbursement: false,
  },
  {
    id: "ACT-006",
    studentName: "Meera Joshi",
    studentId: "STU-2024-006",
    department: "Electronics",
    eventName: "Robotics Workshop",
    organizer: "IIT Bombay",
    eventDate: "2024-03-28",
    location: "Mumbai, Maharashtra",
    participationType: "individual",
    budgetRequested: 3000,
    description: "Hands-on workshop on embedded systems and robotics.",
    status: "rejected",
    facultyStatus: "rejected",
    hodStatus: "pending",
    adminStatus: "pending",
    submittedAt: "2024-03-10",
    lastUpdated: "2024-03-14",
    remarks: "Event dates conflict with mid-semester exams.",
    hasReimbursement: false,
  },
];

export const getStatusColor = (status: ApprovalStatus) => {
  switch (status) {
    case "approved": return "bg-success/10 text-success border-success/20";
    case "pending": return "bg-warning/10 text-warning border-warning/20";
    case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
    case "revision": return "bg-info/10 text-info border-info/20";
  }
};

export const getStatusLabel = (status: ApprovalStatus) => {
  switch (status) {
    case "approved": return "Approved";
    case "pending": return "Pending";
    case "rejected": return "Rejected";
    case "revision": return "Needs Revision";
  }
};
