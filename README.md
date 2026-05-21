# Registration Wizard

A multi-step registration wizard built with React. This project demonstrates form segmentation, centralized form state management, real-time validation, conditional navigation, and a final review/submit flow.

## Project Overview

Modern applications usually avoid showing long forms on a single screen. This project breaks the registration process into smaller steps so users can complete the form in a cleaner and more organized way.

The wizard contains three main steps:

1. Personal Info
2. Account Details
3. Review & Submit

## Features

- Multi-step form using conditional rendering
- Form data persists when moving forward and backward
- Real-time validation while the user types
- Disabled Next button until the current step is valid
- Email validation
- Password minimum length validation
- Confirm password matching validation
- Show/Hide password toggle
- Dynamic progress indicator
- Review page before final submission
- Final payload logged to the console
- Success UI after submit
- Responsive and polished UI design

## Tech Stack

- React
- Vite
- React Hook Form
- Zod
- @hookform/resolvers
- Lucide React
- CSS

## Installation

Clone the repository:

```bash
git clone <your-repository-url>

# HOW tO Run 

Go into the project folder:

cd registration-wizard

Install dependencies:

npm install

Start the development server:

npm run dev
Required Dependencies

If dependencies are not already installed, run:

npm install react-hook-form zod @hookform/resolvers lucide-react


##Project Structure

registration-wizard/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Prompts.md
├── README.md
├── package.json
└── vite.config.js


Form Steps
Step 1: Personal Info

The first step collects basic user information:

First Name
Last Name
Date of Birth

The user cannot continue until all fields are completed.

Step 2: Account Details

The second step collects account information:

Email
Password
Confirm Password

Validation rules:

Email must contain @
Password must be at least 8 characters
Confirm Password must match Password

This step also includes show/hide password toggles.

Step 3: Review & Submit

The final step displays a summary of the information entered by the user. When the user clicks Submit, the final form data is logged in the browser console and a success message is displayed.

State Management

The project uses react-hook-form to manage the form data. This keeps all form values centralized and prevents data loss when moving between steps.

The component also uses simple React state for UI-only behavior such as:

Current step
Success screen
Password visibility toggle
Validation

Validation is handled using zod.

The schema validates:

Required fields
Email format requirement
Password length
Confirm password matching

The form is configured with mode: "onChange" so errors appear while the user types.

AI Usage Documentation

This project includes a Prompts.md file. It documents how AI was used for learning, debugging, architecture review, and validation guidance.

AI was used as a learning assistant to understand form architecture and debugging strategies. The code was reviewed and understood before being included in the project.

How to Test

Start the project using:
npm run dev
Open the local development URL in your browser.
Try submitting Step 1 without filling all fields.
Enter valid personal information and click Next.
Enter an invalid email and check that an error appears.
Enter a password shorter than 8 characters and check the validation message.
Enter a different confirm password and check the matching error.
Correct all fields and continue to the Review step.
Click Submit.
Open the browser console and verify that the final registration payload is logged.
Example Final Payload
{
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "2000-01-01",
  email: "john@example.com",
  password: "password123",
  confirmPassword: "password123"
}
Future Improvements
Add stronger password validation
Add loading state during submission
Add API integration
Add unit tests
Add field-level icons
Add better accessibility support
Store successful submissions in a backend database
Author

Developed as part of the Registration Wizard sprint project.