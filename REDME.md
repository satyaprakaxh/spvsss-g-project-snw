Guardian Assurance | Premium Claims Form
Overview

The Guardian Assurance Claims Portal is a modern, responsive web interface designed to allow customers to submit insurance claims quickly and securely. The portal simulates a real-world premium insurance claim workflow, providing a smooth and intuitive user experience without requiring any backend setup.

This project demonstrates front-end web development best practices using HTML, CSS, and vanilla JavaScript, including responsive layouts, dynamic form interactions, drag-and-drop file uploads, local storage, modals, and toast notifications.

KEY FEATURES

1.Responsive Design
2.Fully responsive across desktop, tablet, and mobile devices.
3.Grid and Flexbox layout ensures proper alignment of sidebar, form, and file previews.
4.Step-by-Step Sidebar Guidance
5.A visual “How it Works” sidebar provides users with a clear, three-step process:

Submit details

Verification

Resolution

Claim Form with Validation

Fields include policy number, incident date, claim type, contact information, and detailed incident description.

Client-side validation ensures required fields are completed correctly before submission.

Drag & Drop File Uploads

Users can drag and drop images or PDFs directly onto the upload area.

Provides file previews for images and truncated names for PDFs or large file names.

Limits uploads to a maximum of 6 files per claim.

Progress Bar Simulation

Simulates file upload progress dynamically, providing visual feedback.

After completion, triggers a modal showing the claim ID.

Local Draft Saving

Users can save their partially completed claim locally using localStorage.

Drafts persist between sessions, allowing users to return and continue their submission.

Policy Status Check

Basic check on policy number when the input loses focus (blur).

Displays statuses such as Checking…, Invalid, or Active.

Modal Confirmation & Toast Notifications

Submitting a claim triggers a modal with a unique claim ID.

Toast notifications provide brief feedback for actions like saving drafts or submitting claims.

Accessibility and UX Enhancements

Hamburger menu placeholder for small screens.

Modal can be closed with the Escape key.

Focus animations on form elements improve user experience.

Technologies Used

HTML5 – semantic and accessible markup

CSS3 – custom properties, flexbox, grid, gradients, shadows, animations

Vanilla JavaScript (ES6+) – file handling, DOM manipulation, event listeners, local storage, UI updates

No external libraries or frameworks – fully self-contained front-end solution