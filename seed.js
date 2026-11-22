
import { ObjectId } from "mongodb";
import { connectDB, getDB } from "./config/db.js";

const SEED_BATCH = "mentorlagbe-demo-v1";

const ids = {
  tutors: [
    "650000000000000000000001",
    "650000000000000000000002",
    "650000000000000000000003",
  ],
  students: [
    "650000000000000000000004",
    "650000000000000000000005",
    "650000000000000000000006",
    "650000000000000000000007",
  ],
  tuitions: [
    "660000000000000000000001",
    "660000000000000000000002",
    "660000000000000000000003",
    "660000000000000000000004",
    "660000000000000000000005",
    "660000000000000000000006",
  ],
  applications: [
    "670000000000000000000001",
    "670000000000000000000002",
    "670000000000000000000003",
    "670000000000000000000004",
    "670000000000000000000005",
    "670000000000000000000006",
    "670000000000000000000007",
    "670000000000000000000008",
  ],
  payments: [
    "680000000000000000000001",
    "680000000000000000000002",
  ],
};

const now = new Date();

const daysAgo = (days) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

const tutors = [
  {
    _id: new ObjectId(ids.tutors[0]),
    name: "Amina Rahman",
    email: "amina.tutor@example.com",
    role: "tutor",
    plan: "pro",
    phone: "01710000001",
    bio: "Experienced mathematics tutor focused on building strong fundamentals.",
    image: "",
  },
  {
    _id: new ObjectId(ids.tutors[1]),
    name: "Tanvir Ahmed",
    email: "tanvir.tutor@example.com",
    role: "tutor",
    plan: "free",
    phone: "01710000002",
    bio: "English and literature tutor helping students improve communication.",
    image: "",
  },
  {
    _id: new ObjectId(ids.tutors[2]),
    name: "Nusrat Jahan",
    email: "nusrat.tutor@example.com",
    role: "tutor",
    plan: "pro",
    phone: "01710000003",
    bio: "Science tutor with a passion for interactive learning.",
    image: "",
  },
];

const students = [
  {
    _id: new ObjectId(ids.students[0]),
    name: "Sadia Islam",
    email: "sadia.student@example.com",
    role: "student",
    plan: "free",
    phone: "01810000001",
    bio: "Interested in mathematics and science.",
    image: "",
  },
  {
    _id: new ObjectId(ids.students[1]),
    name: "Fahim Hasan",
    email: "fahim.student@example.com",
    role: "student",
    plan: "pro",
    phone: "01810000002",
    bio: "Looking for experienced English tutors.",
    image: "",
  },
  {
    _id: new ObjectId(ids.students[2]),
    name: "Maliha Chowdhury",
    email: "maliha.student@example.com",
    role: "student",
    plan: "free",
    phone: "01810000003",
    bio: "Interested in science and mathematics.",
    image: "",
  },
  {
    _id: new ObjectId(ids.students[3]),
    name: "Rafiul Karim",
    email: "rafiul.student@example.com",
    role: "student",
    plan: "free",
    phone: "01810000004",
    bio: "Looking for online learning opportunities.",
    image: "",
  },
];

const allUsers = [...tutors, ...students].map((user) => ({
  ...user,
  emailVerified: true,
  createdAt: daysAgo(30),
  updatedAt: now,
  isSeedData: true,
  seedBatch: SEED_BATCH,
}));

const tuitions = [
  {
    _id: new ObjectId(ids.tuitions[0]),
    title: "Mathematics Tutor for Class 9",
    subject: "Mathematics",
    classLevel: "Class 9",
    mode: "Offline",
    location: "Dhanmondi, Dhaka",
    monthlyFee: 5000,
    daysPerWeek: 4,
    bannerImage: "",
    description: "Looking for a dedicated mathematics tutor for regular lessons and exam preparation.",
    tutorName: tutors[0].name,
    tutorEmail: tutors[0].email,
    approvalStatus: "approved",
    isActive: true,
    createdAt: daysAgo(10),
  },
  {
    _id: new ObjectId(ids.tuitions[1]),
    title: "English Language Tutor",
    subject: "English",
    classLevel: "Class 8",
    mode: "Online",
    location: "Uttara, Dhaka",
    monthlyFee: 4000,
    daysPerWeek: 3,
    bannerImage: "",
    description: "English grammar, writing, and speaking practice with personalized guidance.",
    tutorName: tutors[1].name,
    tutorEmail: tutors[1].email,
    approvalStatus: "approved",
    isActive: true,
    createdAt: daysAgo(8),
  },
  {
    _id: new ObjectId(ids.tuitions[2]),
    title: "Physics and Chemistry Tutor",
    subject: "Science",
    classLevel: "Class 10",
    mode: "Online",
    location: "Mirpur, Dhaka",
    monthlyFee: 6000,
    daysPerWeek: 4,
    bannerImage: "",
    description: "Concept-focused physics and chemistry lessons for board examination preparation.",
    tutorName: tutors[2].name,
    tutorEmail: tutors[2].email,
    approvalStatus: "approved",
    isActive: true,
    createdAt: daysAgo(6),
  },
  {
    _id: new ObjectId(ids.tuitions[3]),
    title: "Mathematics and Science Tutor",
    subject: "Mathematics",
    classLevel: "Class 7",
    mode: "Offline",
    location: "Uttara, Dhaka",
    monthlyFee: 4500,
    daysPerWeek: 3,
    bannerImage: "",
    description: "Friendly tutor for mathematics and science fundamentals.",
    tutorName: tutors[0].name,
    tutorEmail: tutors[0].email,
    approvalStatus: "pending",
    isActive: true,
    createdAt: daysAgo(2),
  },
  {
    _id: new ObjectId(ids.tuitions[4]),
    title: "Primary School English Tutor",
    subject: "English",
    classLevel: "Class 5",
    mode: "Online",
    location: "Mohammadpur, Dhaka",
    monthlyFee: 3000,
    daysPerWeek: 3,
    bannerImage: "",
    description: "English reading, writing, and grammar lessons for primary students.",
    tutorName: tutors[1].name,
    tutorEmail: tutors[1].email,
    approvalStatus: "rejected",
    isActive: false,
    createdAt: daysAgo(4),
  },
  {
    _id: new ObjectId(ids.tuitions[5]),
    title: "Advanced Biology Tutor",
    subject: "Biology",
    classLevel: "Class 11",
    mode: "Offline",
    location: "Banani, Dhaka",
    monthlyFee: 7000,
    daysPerWeek: 4,
    bannerImage: "",
    description: "Detailed biology lessons with exam preparation and concept revision.",
    tutorName: tutors[2].name,
    tutorEmail: tutors[2].email,
    approvalStatus: "approved",
    isActive: false,
    createdAt: daysAgo(3),
  },
].map((tuition) => ({
  ...tuition,
  isSeedData: true,
  seedBatch: SEED_BATCH,
}));

const applications = [
  {
    _id: new ObjectId(ids.applications[0]),
    tuitionIndex: 0,
    studentIndex: 0,
    status: "pending",
    days: 2,
    preferredSchedule: "Evening, 5 PM - 7 PM",
    studentNote: "I need help preparing for my upcoming examinations.",
  },
  {
    _id: new ObjectId(ids.applications[1]),
    tuitionIndex: 0,
    studentIndex: 2,
    status: "accepted",
    days: 5,
    preferredSchedule: "Morning, 9 AM - 11 AM",
    studentNote: "I would prefer regular weekly lessons.",
  },
  {
    _id: new ObjectId(ids.applications[2]),
    tuitionIndex: 1,
    studentIndex: 1,
    status: "accepted",
    days: 4,
    preferredSchedule: "Afternoon, 3 PM - 5 PM",
    studentNote: "I want to improve my English writing.",
  },
  {
    _id: new ObjectId(ids.applications[3]),
    tuitionIndex: 1,
    studentIndex: 3,
    status: "rejected",
    days: 3,
    preferredSchedule: "Evening, 7 PM - 9 PM",
    studentNote: "Online classes would be convenient for me.",
  },
  {
    _id: new ObjectId(ids.applications[4]),
    tuitionIndex: 2,
    studentIndex: 0,
    status: "pending",
    days: 1,
    preferredSchedule: "Weekend, 10 AM - 12 PM",
    studentNote: "I need additional science lessons.",
  },
  {
    _id: new ObjectId(ids.applications[5]),
    tuitionIndex: 2,
    studentIndex: 2,
    status: "accepted",
    days: 6,
    preferredSchedule: "Afternoon, 4 PM - 6 PM",
    studentNote: "I am preparing for my board examinations.",
  },
  {
    _id: new ObjectId(ids.applications[6]),
    tuitionIndex: 0,
    studentIndex: 3,
    status: "pending",
    days: 2,
    preferredSchedule: "Evening, 6 PM - 8 PM",
    studentNote: "I would like to strengthen my mathematics skills.",
  },
  {
    _id: new ObjectId(ids.applications[7]),
    tuitionIndex: 2,
    studentIndex: 1,
    status: "rejected",
    days: 7,
    preferredSchedule: "Morning, 8 AM - 10 AM",
    studentNote: "I am interested in science lessons.",
  },
].map((application) => {
  const tuition = tuitions[application.tuitionIndex];
  const student = students[application.studentIndex];

  return {
    _id: application._id,
    tuitionId: tuition._id.toString(),
    tuitionTitle: tuition.title,
    monthlyFee: tuition.monthlyFee,
    tutorEmail: tuition.tutorEmail,
    studentName: student.name,
    studentEmail: student.email,
    studentPhone: student.phone,
    preferredSchedule: application.preferredSchedule,
    studentNote: application.studentNote,
    status: application.status,
    appliedAt: daysAgo(application.days),
    isSeedData: true,
    seedBatch: SEED_BATCH,
  };
});

const payments = [
  {
    _id: new ObjectId(ids.payments[0]),
    userEmail: students[1].email,
    userName: students[1].name,
    userRole: "student",
    planName: "Student Pro",
    amount: 10,
    currency: "usd",
    transactionId: "SEED-STUDENT-TRANSACTION-001",
    stripeSessionId: "seed_student_session_001",
    paymentStatus: "paid",
    paidAt: daysAgo(12),
  },
  {
    _id: new ObjectId(ids.payments[1]),
    userEmail: tutors[2].email,
    userName: tutors[2].name,
    userRole: "tutor",
    planName: "Tutor Pro",
    amount: 15,
    currency: "usd",
    transactionId: "SEED-TUTOR-TRANSACTION-001",
    stripeSessionId: "seed_tutor_session_001",
    paymentStatus: "paid",
    paidAt: daysAgo(7),
  },
].map((payment) => ({
  ...payment,
  isSeedData: true,
  seedBatch: SEED_BATCH,
}));

async function insertSeedRecords(collectionName, records) {
  const collection = getDB().collection(collectionName);

  let inserted = 0;
  let skipped = 0;

  for (const record of records) {
    const existing = await collection.findOne({
      _id: record._id,
    });

    if (existing) {
      if (existing.seedBatch !== SEED_BATCH) {
        throw new Error(
          `ID conflict in ${collectionName}. No existing data was changed.`
        );
      }

      skipped++;
      continue;
    }

    if (collectionName === "users") {
      const emailExists = await collection.findOne({
        email: record.email,
      });

      if (emailExists) {
        throw new Error(
          `Email ${record.email} already exists. No existing user was changed.`
        );
      }
    }

    if (collectionName === "payments") {
      const sessionExists = await collection.findOne({
        stripeSessionId: record.stripeSessionId,
      });

      if (sessionExists) {
        throw new Error(
          "A payment session ID already exists. No existing payment was changed."
        );
      }
    }

    await collection.insertOne(record);
    inserted++;
  }

  console.log(
    `${collectionName}: ${inserted} inserted, ${skipped} already seeded.`
  );
}

async function seedDatabase() {
  try {
    console.log("Connecting to MentorLagbe database...");

    await connectDB();

    console.log("Starting fictional demo data seeding...");

    await insertSeedRecords("users", allUsers);
    await insertSeedRecords("tuitions", tuitions);
    await insertSeedRecords("applications", applications);
    await insertSeedRecords("payments", payments);

    console.log("\nDemo data seeding completed successfully!");
    console.log("Users: 7");
    console.log("Tuitions: 6");
    console.log("Applications: 8");
    console.log("Payments: 2");
    console.log("\nThese are fictional demonstration records.");
    console.log("No real Stripe transactions were created.");
  } catch (error) {
    console.error("\nSeed operation failed:", error.message);
    process.exitCode = 1;
  } finally {
    // This is a standalone script, so exit after the database work.
    setTimeout(() => process.exit(process.exitCode || 0), 500);
  }
}

seedDatabase();
