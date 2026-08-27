const fs = require('fs');
const path = require('path');

const premiumCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
  --accent-glow: rgba(59, 130, 246, 0.5);
  --card-bg: rgba(30, 41, 59, 0.7);
  --card-border: rgba(255, 255, 255, 0.1);
  --nav-bg: rgba(15, 23, 42, 0.85);
  --gradient-1: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --success: #10b981;
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
  line-height: 1.6;
  overflow-x: hidden;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
  background-attachment: fixed;
}

/* Header & Nav */
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--card-border);
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  transition: color 0.3s ease;
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
  margin-bottom: 1.5rem;
  font-weight: 700;
}

/* Form Sections as Glass Cards */
.form-section, .form-container, .summary-box, .login-box, .contact-box {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.form-section:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Inputs */
label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
}

input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Buttons */
button, .cta, #submit-btn, .btn-primary {
  background: var(--gradient-1);
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--accent-glow);
  font-family: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-top: 20px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--accent-glow);
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
  gap: 15px;
  margin-top: 10px;
}

.yes-no-box, .checkbox-box {
  flex: 1;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  color: var(--text-secondary);
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

/* Results Box */
.summary-box {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
  border: 1px solid var(--accent-color);
}

.tax-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid var(--card-border);
  font-size: 1.1rem;
}

.tax-item span {
  font-weight: 700;
  color: var(--success);
}

.statement {
  margin-top: 25px;
  padding: 20px;
  background: rgba(16, 185, 129, 0.1);
  border-left: 4px solid var(--success);
  border-radius: 4px;
  color: var(--text-primary);
  line-height: 1.6;
}

/* Loading Wrapper */
.loading-wrapper {
  background: var(--bg-primary) !important;
}
.loading-text {
  color: var(--text-primary) !important;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem 5%;
  border-top: 1px solid var(--card-border);
  background: var(--bg-secondary);
  margin-top: 4rem;
}
`;

const filesToUpdate = [
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
        fs.writeFileSync(fullPath, premiumCss);
        console.log("Updated", file);
    } else {
        console.log("Not found:", file);
    }
});
