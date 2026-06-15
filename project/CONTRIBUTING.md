# Contributing Guidelines - Madamani Strikers FC

## Code of Conduct

We are committed to providing a welcoming and harassment-free experience for everyone.

## Getting Started

### Prerequisites
- Node.js v18+
- Git
- MongoDB
- Basic knowledge of Express.js and React

### Fork & Clone
```bash
git clone https://github.com/yourusername/madamani-fc.git
cd madamani-fc

# Create feature branch
git checkout -b feature/your-feature-name
```

### Local Setup
```bash
# Backend
cd backend
cp .env.example .env
npm install

# Frontend (new terminal)
cd frontend
cp .env.example .env.local
npm install
```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/descriptive-name
# Examples: feature/add-team-stats, fix/login-error, docs/api-readme
```

### 2. Make Changes Following Code Standards

#### Backend (Node.js)
```javascript
// ✅ DO: Use async/await
const getTeam = async (req, res) => {
  try {
    const teams = await TeamMember.find();
    res.json({ success: true, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ DON'T: Use callbacks
api.get('/team', (req, res, callback) => {
  // ...
});
```

#### Frontend (React)
```javascript
// ✅ DO: Use functional components with hooks
const TeamPage = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    loadTeam();
  }, []);
  // ...
};

// ❌ DON'T: Use class components
class TeamPage extends React.Component {
  // ...
}
```

### 3. Testing

#### Backend Tests
```bash
npm test

# Run specific test
npm test -- team.test.js

# With coverage
npm test -- --coverage
```

#### Frontend Tests
```bash
npm test

# Interactive watch mode
npm test -- --watch
```

### 4. Code Quality

#### Linting
```bash
# Install ESLint
npm install --save-dev eslint

# Run linter
npx eslint .

# Fix issues
npx eslint . --fix
```

#### Formatting with Prettier
```bash
# Install Prettier
npm install --save-dev prettier

# Format code
npx prettier --write .

# Check formatting
npx prettier --check .
```

### 5. Commit Messages

Use conventional commits format:
```
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, missing semicolons, etc)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests

**Examples:**
```bash
git commit -m "feat(admin): add password change functionality"
git commit -m "fix(team): resolve missing nationality field display"
git commit -m "docs(api): update fixture endpoints documentation"
git commit -m "refactor(auth): simplify JWT verification logic"
```

### 6. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with:
- Clear title describing the change
- Detailed description of what changed and why
- Screenshots for UI changes
- Reference to related issues

## Pull Request Checklist

Before submitting a PR, ensure:
- [ ] Code follows project style guide
- [ ] All tests pass locally (`npm test`)
- [ ] No console errors or warnings
- [ ] Documentation updated (if needed)
- [ ] Environment variables documented
- [ ] CHANGELOG updated
- [ ] Commit messages follow convention

## Code Style Guide

### Backend (JavaScript/Node.js)

```javascript
// Variables
const CONSTANT_NAME = 'value';
let variableName = 'value';

// Functions
const functionName = async (param1, param2) => {
  // Async operations
  try {
    // Code here
  } catch (err) {
    // Error handling
  }
};

// Objects
const config = {
  port: 5000,
  env: 'development'
};

// Comments
// Inline comment explaining complex logic

/**
 * Function description
 * @param {String} email - User email
 * @returns {Promise} Admin object
 */
const getAdminByEmail = (email) => {
  // Implementation
};
```

### Frontend (React/JavaScript)

```javascript
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/component.css';

/**
 * Component description
 * @param {Object} props - Component props
 * @returns {JSX.Element}
 */
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    // Component mount logic
    loadData();
  }, []); // Empty dependency array

  const handleAction = async () => {
    try {
      const response = await api.post('/endpoint', data);
      setState(response.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="component">
      {/* JSX here */}
    </div>
  );
};

export default ComponentName;
```

### CSS/Styling

```css
/* Use CSS custom properties for colors */
:root {
  --primary: #D72638;
  --dark: #111;
  --light: #FAFAFA;
}

/* Block structure */
.component {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
}

/* Mobile-first approach */
@media (max-width: 768px) {
  .component {
    flex-direction: column;
  }
}
```

## File Structure Standards

### Backend
```
backend/
├── src/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── TeamMember.js
│   │   ├── News.js
│   │   └── Fixture.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── team.js
│   │   ├── news.js
│   │   ├── fixtures.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/ (future)
│   │   ├── authController.js
│   │   └── teamController.js
│   └── server.js
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   └── LoadingSpinner.js (future)
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── HomePage.js
│   │   ├── TeamPage.js
│   │   ├── FixturesPage.js
│   │   ├── AdminDashboard.js
│   │   └── NotFoundPage.js (future)
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── styles.css
│   │   └── admin.css
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

## Common Issues & Solutions

### Issue: "Cannot find module X"
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: JWT Token Expired
- Users should login again
- Frontend should clear localStorage on 401 response

### Issue: MongoDB Connection Fails
- Verify MongoDB is running
- Check MONGODB_URI in .env
- Ensure credentials are correct

### Issue: CORS Errors
- Check frontend URL in backend CORS config
- Verify headers in API requests
- Check if backend is running

## Testing Guidelines

### Unit Tests
```javascript
// Example: team.test.js
describe('Team API', () => {
  test('should get all team members', async () => {
    const response = await teamAPI.getAll();
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
```

### Integration Tests
```javascript
// Test full flow: signup → login → create team member
describe('Admin Flow', () => {
  test('admin can create team members after login', async () => {
    // Test implementation
  });
});
```

## Documentation Requirements

### For New Features
1. Update README.md with overview
2. Update API.md if adding endpoints
3. Update ARCHITECTURE.md if structural changes
4. Add JSDoc comments to code
5. Include examples in commit message

### For Bug Fixes
1. Reference the issue number
2. Explain root cause
3. Document the fix approach

## Performance Guidelines

### Backend
- Use async/await for non-blocking operations
- Index frequently queried database fields
- Implement caching for repeated queries
- Validate input before database operations

### Frontend
- Lazy load images and components
- Minimize bundle size
- Use React.memo for expensive components
- Optimize CSS selectors

## Security Guidelines

### Do's
- ✅ Hash passwords with bcryptjs
- ✅ Use HTTPS in production
- ✅ Validate input on server side
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated

### Don'ts
- ❌ Never commit .env files
- ❌ Don't expose sensitive data in logs
- ❌ Don't use user input in queries directly
- ❌ Don't hardcode secrets in code

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag v1.2.3`
4. Push: `git push origin main --tags`
5. Create GitHub release with notes

## Getting Help

- Check existing issues and PRs
- Read documentation in repo
- Ask in GitHub Discussions
- Email: dev@madamanistrikersfc.com

## Recognition

Contributors will be:
1. Listed in CONTRIBUTORS.md
2. Credited in release notes
3. Acknowledged in project documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Last Updated**: 2024
**Maintained By**: Development Team
