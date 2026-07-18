moreganesh327_db_user
pdCjHRtBVJ8bqtBZ
mongodb+srv://moreganesh327_db_user:<db_password>@cluster0.qbvvxuv.mongodb.net/?appName=Cluster0


dbuser
db@123
mongodb+srv://<db_username>:<db_password>@cluster0.qbvvxuv.mongodb.net/?appName=Cluster0

===================================================
API Calling
===============================================================
http://localhost:3000/api/tasks/getTask -GET
Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViNTIzODhlLTMzZjgtNDA4Yy04ZWY3LTExZGRmMDhjMzM5NSIsImVtYWlsIjoibW9yZUBnbWFpbC5jb20iLCJpYXQiOjE3ODM2NjAwMTMsImV4cCI6MTc4MzY2MzYxM30.Qe3JnlVvPfcg0QYfjSjFdHRAPJ6o7L2pMR2iqDbn9ns

====================================================
http://localhost:3000/api/tasks/createTask - POST

{
  "title": "Implement User Authentication",
  "description": "Create login and registration functionality using JWT.",
  "status": "In Progress",
  "Priority": "High",
  "assignedTo": "6a507cbe891cf770bfd4e68c"
}

=======================================================

http://localhost:3000/api/tasks/updateTask/6a507f398f7ed64ef962cbe7 - UPDATE
{
    "_id": "6a507f398f7ed64ef962cbe7",
    "title": "Implement User Authentication",
    "description": "Create login and registration functionality using JWT.",
    "status": "In Progress",
    "Priority": "LOW",
    "assignedTo": "6a507cbe891cf770bfd4e68c",
    "createdAt": "2026-07-10T05:12:25.463Z",
    "updatedAt": "2026-07-10T05:12:25.463Z",
    "__v": 0
}

===================================================
http://localhost:3000/api/tasks/deleteTask/6a507f398f7ed64ef962cbe7 -Delete

Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViNTIzODhlLTMzZjgtNDA4Yy04ZWY3LTExZGRmMDhjMzM5NSIsImVtYWlsIjoibW9yZUBnbWFpbC5jb20iLCJpYXQiOjE3ODM2NjAwMTMsImV4cCI6MTc4MzY2MzYxM30.Qe3JnlVvPfcg0QYfjSjFdHRAPJ6o7L2pMR2iqDbn9ns

======================================================