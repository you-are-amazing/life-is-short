# Life is Short - Progress Tracker & Goal Manager

Originally created by [Twisha Patel](https://github.com/twi-exe).

A web application that tracks your progress through life (year, month, week) and helps you manage your goals with a robust database backend and secure user authentication.

Link : https://you-are-amazing.github.io/life-is-short/ 

## Features

- **Progress Tracking**: Visual progress bars for year, month, and week completion
- **Goal Management**: Create, track, and manage daily, weekly, and yearly goals
- **User Authentication**: Secure registration and login with password hashing
- **Guest Mode**: Start using immediately, convert to full account later
- **Multi-Tenant**: Complete isolation between users' data
- **Database Storage**: Persistent storage using SQLite database
- **RESTful API**: Backend API for goal and user management
- **Responsive Design**: Works on desktop and mobile devices
- **Color Modes**: Switch between light and dark mode, with your preference saved in the browser
- **Standalone Notepad**: Create and organize notes with a rich text editor
- **Text Highlighting**: Apply preset background colors, reuse the last selected color, and remove highlights
- **Gallery Note Management**: Edit note titles or delete notes directly from the notes gallery

## Project Modifications

The notepad features in this project were modified to improve the writing experience. These modifications include the inline text highlighter with persistent formatting, mixed-selection highlight removal, editor minimize/maximize controls, and note title editing and deletion from the gallery.

## Authentication System

### User Types
1. **Anonymous Users**: Can view the app without any data persistence
2. **Guest Users**: Automatically created with session-based storage, can be converted to full accounts
3. **Registered Users**: Full accounts with username/password authentication

### Security Features
- Password hashing using bcrypt
- Session management with Flask-Login
- CSRF protection
- Secure guest token generation
- Data isolation between users

## Setup

### Local Development

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   ./run.sh
   # or
   python app.py
   ```

3. Open your browser to `http://localhost:5000`

## Project Structure

```
├── app.py                    # Main Flask application
├── test_auth.py             # Authentication tests
├── test_db.py               # Database tests
├── run.sh                   # Script to start the app locally
│
├── requirements.txt         # Python dependencies (local development)
├── requirements-web.txt     # Python dependencies (production deployment)
│
├── render.yaml              # Render deployment configuration
├── railway.toml             # Railway deployment configuration
│
├── templates/               # Flask HTML templates (server-rendered)
│   ├── index.html          # Main app (with login/database)
│   ├── calendar.html       # Calendar view
│   └── auth.html           # Login and registration pages
│
├── static/                  # Static assets
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
│
├── index.html              # Standalone version (GitHub Pages)
├── calendar.html           # Standalone calendar (GitHub Pages)
├── notepad/                # Standalone notes tracker and rich text editor
│   └── index.html
│
└── docs/                   # Documentation folder
```

## Two Deployment Options

This project supports two different ways to use it:

### 1. **Full-Featured Web App** (Flask + Database)
- Uses `templates/` folder for server-rendered pages
- Features user authentication, database persistence, and API
- Deploy to: Render or Railway
- Configuration: `render.yaml` or `railway.toml`
- Local development: Run `python app.py`

### 2. **Standalone Static Version** (GitHub Pages)
- Uses root-level `index.html` and `calendar.html` 
- No backend, no database, no authentication needed
- Data stored only in browser localStorage
- Deploy to: GitHub Pages (static hosting)
- Configuration: GitHub Settings > Pages > Deploy from branch
- No server required

### Deploying the Flask Web App

**Render Deployment**:
1. Connect your GitHub repository to Render
2. Choose **Blueprint** deployment (Render reads `render.yaml`)
3. Render will auto-deploy on push

**Railway Deployment**:
1. Create a new Railway project
2. Choose **Deploy from GitHub repo** and select this repository
3. Add a `SECRET_KEY` environment variable with a random secure value
4. Railway uses `railway.toml` for configuration

### Deploying to GitHub Pages

For the standalone static version:
1. Go to **Settings > Pages**
2. Choose **Deploy from a branch**
3. Select `main` branch and `/ (root)` folder
4. Save and GitHub will publish to `https://[your-username].github.io/life-is-short/`

## Database Schema

The application uses SQLite with the following schema:

### Users Table
```sql
CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE,
    password_hash VARCHAR(128) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_guest BOOLEAN DEFAULT FALSE,
    guest_token VARCHAR(36) UNIQUE,
    display_name VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC'
);
```

### Goals Table
```sql
CREATE TABLE goal (
    id INTEGER PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    goal_type VARCHAR(20) NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed DATETIME,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
```

## Testing

Run the database tests:
```bash
python test_db.py
```

Run the authentication tests:
```bash
python test_auth.py
```

## API Endpoints

### Authentication
- `POST /register` - Create new user account
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /api/user/current` - Get current user info
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/convert-guest` - Convert guest to registered user

### Goals (User-Isolated)
- `GET /api/goals` - Get current user's goals
- `POST /api/goals` - Create goal for current user
- `PUT /api/goals/<id>` - Update user's goal
- `DELETE /api/goals/<id>` - Delete user's goal
- `POST /api/goals/cleanup` - Clean up user's old goals

## API Usage Examples

### Authentication Examples
```bash
# Register a new user
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "secret123", "email": "john@example.com"}'

# Login
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "secret123"}'

# Get current user (requires session)
curl -b cookies.txt http://localhost:5000/api/user/current

# Convert guest to registered user
curl -X POST http://localhost:5000/api/user/convert-guest \
  -H "Content-Type: application/json" \
  -d '{"username": "new_user", "password": "password123"}'
```

### Goal Management Examples
```bash
# Get all goals (automatically filtered to current user)
curl -b cookies.txt http://localhost:5000/api/goals

# Get goals by type
curl -b cookies.txt "http://localhost:5000/api/goals?type=daily"

# Create a new goal (associated with current user)
curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"text": "My new goal", "goal_type": "daily"}'

# Update a goal (only if owned by current user)
curl -X PUT http://localhost:5000/api/goals/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"done": true}'

# Delete a goal (only if owned by current user)
curl -X DELETE http://localhost:5000/api/goals/1 -b cookies.txt
```

## Technologies

- **Backend**: Flask, SQLAlchemy, SQLite, Flask-Login, bcrypt
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Authentication**: Session-based with secure password hashing
- **Database**: SQLite with foreign key relationships
- **Visualization**: Matplotlib for progress charts

## User Workflow

1. **First Visit**: Automatically creates a guest session
2. **Add Goals**: Goals are saved to guest account
3. **Convert Account**: Optionally convert guest to full account (preserves goals)
4. **Multi-Device**: Login from any device to access your data
5. **Privacy**: Complete data isolation between users