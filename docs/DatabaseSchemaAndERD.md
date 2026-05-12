# Learning Experience Platform - Database Schema and ERD

## Database Models

### 1. User
- _id: ObjectId
- name: String
- email: String
- role: Enum ['student', 'teacher', 'admin', 'hr', 'recruiter', 'recruitment_agency']
- organization: ObjectId (Organization)
- profile: { bio, skills[], interests[], socialLinks, profilePicture }
- timestamps

### 2. Organization
- _id: ObjectId
- name: String
- admin: ObjectId (User)
- users: [ObjectId] (Users in org)
- timestamps

### 3. Role
- name: Enum ['student','teacher','admin','hr','recruiter','recruitment_agency']
- description: String
- timestamps

### 4. Course
- _id: ObjectId
- title: String
- description: String
- modules: [ObjectId] (CourseModule or CourseModuleSkeleton)
- teacher: ObjectId (User)
- organization: ObjectId
- timestamps

### 5. CourseModule
- _id: ObjectId
- title: String
- lessons: [ObjectId] (Lesson)
- keyPoints: [String]
- course: ObjectId
- timestamps

### 6. Lesson
- _id: ObjectId
- title: String
- description: String
- resources: [{ title, url }]
- course: ObjectId
- timestamps

### 7. Assignment
- _id: ObjectId
- title: String
- course: ObjectId
- dueDate: Date
- status: Enum ['Pending','Submitted','Graded']
- assignedTo: ObjectId (User)
- timestamps

### 8. Badge
- _id: ObjectId
- title: String
- recipient: ObjectId (User)
- issuer: String
- criteriaUrl: String
- verified: Boolean
- dateAwarded: Date
- timestamps

### 9. SFIA
- _id: ObjectId
- course: ObjectId
- skills: [String]
- jobPositions: [String]
- timestamps

### 10. Session
- _id: ObjectId
- course: ObjectId
- requestedBy: ObjectId (User)
- requestedTo: ObjectId (User)
- preferredTime: Date
- status: Enum ['Pending','Accepted']
- timestamps

### 11. PeerLearning
- _id: ObjectId
- course: ObjectId
- requester: ObjectId (User)
- partner: ObjectId (User)
- preferredTime: Date
- status: Enum ['Pending','Accepted']
- timestamps

## ERD Relationships
```
User --< Assignment >-- Course
User --< Badge >-- Course
Course --< Module >-- Lesson
Course --< SFIA >-- JobPositions
User --< Session >-- User (mutual session)
User --< PeerLearning >-- User
Organization --< User
Course -- Organization
Module -- Course
Lesson -- Module
```
