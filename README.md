# 🕒 Attendance App (NestJS + Prisma)

An attendance management backend built with **NestJS** and **Prisma**.  
This app allows users to check in/out of specific **buildings** based on their location (latitude & longitude).  
It supports authentication, city/building management, and attendance tracking.

---

## 🚀 Features
- **User Authentication** (JWT-based login/signup)
- **City & Building Management** (with latitude & longitude per building)
- **Attendance Tracking** (users can check-in only within allowed buildings)
- **Role-Based Access Control** (e.g., Admin vs User)
- **RESTful API** with validation & error handling
- **Prisma ORM** with PostgreSQL support

---

## 🏗️ Tech Stack
| Technology | Purpose |
|------------|---------|
| [NestJS](https://nestjs.com/) | Backend framework |
| [Prisma](https://www.prisma.io/) | ORM for database |
| [PostgreSQL](https://www.postgresql.org/) | Primary database (configurable) |
| [JWT](https://jwt.io/) | Authentication |
| [Class-Validator](https://github.com/typestack/class-validator) | Request validation |

---

## 📂 Project Structure
