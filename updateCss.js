const fs = require('fs');
const path = require('path');

const premiumDarkCss = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg-base: #050505;
  --bg-surface: #111111;
  --bg-surface-hover: #1a1a1a;
  
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  
  --accent-primary: #00f2fe;
  --accent-secondary: #4facfe;
  --accent-glow: rgba(0, 242, 254, 0.3);
  
  --border-subtle: #27272a;
  --border-focus: #00f2fe;
  
  --success: #10b981;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Outfit', sans-serif;
  background-color: var(--bg-base);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* 
  High-performance background: 
  Instead of fixed blur, we use a fixed pseudo-element with a simple gradient 
  that requires virtually 0 GPU processing overhead compared to backdrop-filter.
*/
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: 
    radial-gradient(circle at 0% 0%, rgba(79, 172, 254, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(0, 242, 254, 0.08) 0%, transparent 50%);
  z-index: -1;
  pointer-events: none;
}

/* Header & Nav */
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(5, 5, 5, 0.85);
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.2rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(8px); /* Minimal blur just for the header */
}

.logo {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
}

nav ul {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  align-items: center;
}

nav ul li a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
}

nav ul li a:hover {
  color: var(--text-primary);
}

nav ul li a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -6px;
  left: 0;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

nav ul li a:hover::after {
  width: 100%;
}

/* Main Container */
main, .container, .hero {
  margin: 60px auto;
  max-width: 800px;
  padding: 0 20px;
}

h1, h2, h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Core Container Style - Extremely premium look */
.form-section, .form-container, .summary-box, .login-box, .contact-box {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 2.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}

/* Subtle glow accent line at the top of cards */
.form-section::before, .form-container::before, .summary-box::before, .login-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  opacity: 0.5;
}

/* Inputs */
label {
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
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
  padding: 14px 18px;
  background-color: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 4px var(--accent-glow);
}

/* Buttons */
button, .cta, #submit-btn, .btn-primary {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: #000;
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 8px 20px -5px var(--accent-glow);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px -5px var(--accent-glow);
  filter: brightness(1.1);
}

.google-btn {
  background-color: var(--bg-surface-hover);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}
.google-btn:hover {
  background-color: #27272a;
  border-color: #3f3f46;
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
  gap: 1rem;
  margin-top: 0.8rem;
}

.yes-no-box, .checkbox-box {
  flex: 1;
  padding: 12px;
  background-color: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  color: var(--text-secondary);
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  background-color: rgba(0, 242, 254, 0.1);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  box-shadow: inset 0 0 0 1px var(--accent-primary);
}

/* Results Box */
.summary-box {
  background: var(--bg-surface);
}

.tax-item {
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 1.1rem;
}

.tax-item span {
  font-weight: 700;
  color: var(--accent-primary);
}

.statement {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: rgba(16, 185, 129, 0.05);
  border-left: 4px solid var(--success);
  border-radius: 0 10px 10px 0;
  color: var(--text-primary);
  line-height: 1.6;
  font-size: 1rem;
}

/* Footer */
footer {
  text-align: center;
  padding: 3rem 5%;
  border-top: 1px solid var(--border-subtle);
  background-color: var(--bg-base);
  margin-top: 5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
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
        fs.writeFileSync(fullPath, premiumDarkCss);
        console.log("Updated", file);
    }
});
