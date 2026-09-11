# Life is Short

Originally created by [Twisha Patel](https://github.com/twi-exe).

A static progress tracker, goal manager, calendar, and notepad deployed on GitHub Pages.

Live site: https://you-are-amazing.github.io/life-is-short/

## Features

- **Progress Tracking**: Visual progress bars for year, month, and week completion
- **Goal Management**: Create, track, and manage daily, weekly, and yearly goals
- **User Authentication**: Firebase email/password authentication
- **Cloud Sync**: Firebase Firestore sync for signed-in users
- **Guest Mode**: Use the app locally without an account
- **Responsive Design**: Works on desktop and mobile devices
- **Color Modes**: Switch between light and dark mode, with your preference saved in the browser
- **Standalone Notepad**: Create and organize notes with a rich text editor
- **Text Highlighting**: Apply preset background colors, reuse the last selected color, and remove highlights
- **Gallery Note Management**: Edit note titles or delete notes directly from the notes gallery

## Project Modifications

The notepad features in this project were modified to improve the writing experience. These modifications include the inline text highlighter with persistent formatting, mixed-selection highlight removal, editor minimize/maximize controls, and note title editing and deletion from the gallery.

## Project Structure

```
├── index.html              # Main GitHub Pages app
├── calendar/               # Life calendar page
├── notepad/                # Rich text notes page
├── static/                  # Static assets
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── calendar.html           # Legacy standalone calendar URL
├── lifeisshort.png         # Site icon
├── robots.txt              # Search crawler rules
├── sitemap.xml             # Search engine sitemap
└── .nojekyll               # GitHub Pages static asset support
```

### Deploying to GitHub Pages

1. Go to **Settings > Pages**
2. Choose **Deploy from a branch**
3. Select `main` branch and `/ (root)` folder
4. Save and GitHub will publish to `https://[your-username].github.io/life-is-short/`

## Technologies

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Authentication**: Firebase Authentication
- **Cloud storage**: Firebase Firestore
- **Local storage**: Browser `localStorage` for guest mode