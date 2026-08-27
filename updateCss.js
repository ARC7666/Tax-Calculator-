const fs = require('fs');
const path = require('path');

const cleanCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --accent-color: #2563eb;
  --accent-hover: #1d4ed8;
  --border-color: #e5e7eb;
  --success: #10b981;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Header & Nav */
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
  letter-spacing: -0.5px;
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
}

nav ul li a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

nav ul li a:hover {
  color: var(--text-primary);
}

/* Main Container */
main, .container, .hero {
  margin: 40px auto;
  max-width: 800px;
  padding: 20px;
}

h1, h2, h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

/* Form Sections as Clean Cards */
.form-section, .form-container, .summary-box, .login-box, .contact-box {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.form-section:hover {
  box-shadow: var(--shadow-md);
}

/* Inputs */
label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Buttons */
button, .cta, #submit-btn, .btn-primary {
  background-color: var(--accent-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}

button:hover {
  background-color: var(--accent-hover);
}

.google-btn {
  background-color: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.google-btn:hover {
  background-color: #f3f4f6;
}

/* Special Layouts */
.center-button-container, .center-button {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Checkboxes / Yes-No */
.yes-no-options, .checkbox-group {
  display: flex;
  gap: 12px;
  margin-top: 0.5rem;
}

.yes-no-box, .checkbox-box {
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.15s ease;
  color: var(--text-secondary);
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

/* Results Box */
.summary-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.tax-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 1.05rem;
}

.tax-item span {
  font-weight: 600;
  color: var(--text-primary);
}

.statement {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #ecfdf5;
  border-left: 4px solid var(--success);
  border-radius: 4px;
  color: #065f46;
  line-height: 1.5;
  font-size: 0.95rem;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem 5%;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  margin-top: 4rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
`;

const filesToUpdate = [
    'public/home/styles.css',
    'public/income/income.css',
    'public/property/property.css',
    'public/login/login.css',
    'public/signup/signup.css',
    'public/contacts/styles.css',
    'public/started/land2.css'
];

filesToUpdate.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, cleanCss);
        console.log("Updated", file);
    }
});
