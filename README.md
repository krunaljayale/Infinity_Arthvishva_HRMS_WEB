# 🏢 Infinity Arthvishva HRMS Portal

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

A comprehensive human resource management web application designed for Infinity Arthvishva to manage employee records, track daily attendance with strict validation logic, manage company holidays and leaves, and handle administrative HR profiles.

---

## 🚀 Key Features

### 👨‍💼 Employee Management
* **Onboarding & Registration:** Register new employees with comprehensive personal, professional, and emergency contact details.
* **Image Upload:** Integrated **Cloudinary** support for uploading and storing employee profile pictures seamlessly.
* **Profile Editing:** Full control to update employee details, including nested data like department assignments and contact information.
* **Search & Filter:** Advanced filtering by employment status and department, plus instant search by employee name or ID.

### 📅 Smart Attendance System
* **Role-Based Access Control (RBAC):**
    * **Employees/Managers:** Can only mark or approve attendance for **Today**. Past and future dates are strictly locked.
    * **HR Admins:** Have privileges to edit **Today** and **Past** records (for corrections or payroll adjustments). Future dates remain locked.
* **Timezone Precision:** Implements strict **Indian Standard Time (IST)** logic to prevent timezone discrepancies (e.g., preventing "tomorrow's" attendance from being marked late at night).
* **Status Tracking:** Mark employees as **Present**, **Absent**, **Half-Day**, or **On Leave**.

### 🗓️ Leave & Holiday Management
* **Dynamic Calendar:** Visual representation of company holidays and weekends directly on the attendance dashboard.
* **Holiday Manager:** HR interface to add, view, and delete corporate holidays.
* **Safety Checks:** Backend validation prevents the accidental deletion of holidays that have already passed in the financial year.

### 🛡️ Admin & Security
* **Profile Management:** Admins can update their personal details (Phone, City, Department).
* **Security:** Password change functionality protected by JWT authentication.
* **Dashboard:** Quick analytics overview of total headcount, department distribution, and daily attendance statistics.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Axios, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Auth** | JWT (JSON Web Tokens) |
| **Storage** | Cloudinary (Image Hosting) |

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` or `.env` files.

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset