# Question-Answer Management System

This project is a simple Question-Answer Management System with two types of users: **Admin** and **General User**. Admins can manage questions, while general users can answer those questions.

---

## Features

### Admin
- **Add Questions**: Admins can create questions for users to answer.
- **View Answers**: Admins can view all submitted answers for each question.
- **Edit Questions**: Admins can edit existing questions.
- **Delete Questions**: Admins can delete any question.

### General User
- **Answer Questions**: Users can answer any available question.
- **Edit Answers**: Users can update their answers. The system keeps a list of all previous answers for reference.

### Default Users
| Email                 | Password  | Role     |
|-----------------------|-----------|----------|
| john.doe@gmail.com    | 123456    | General  |
| admin@gmail.com       | password  | Admin    |
| user@gmail.com        | 123456    | General  |
| bangladesh@gmail.com  | password  | Admin    |

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   pnpm install
