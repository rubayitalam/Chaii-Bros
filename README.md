# Chaii Bros - Premium Mobile Chai Bar

A production-ready Next.js website with Firebase-powered CMS for Chaii Bros, the UK's first mobile chai bar.

## Features

- 🎨 Pixel-perfect design matching brand guidelines
- 🔥 Real-time content updates via Firebase Firestore
- 🔐 Secure admin dashboard with Firebase Authentication
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Built with Next.js 15 (App Router) and TypeScript
- 🎭 Custom Tailwind CSS design system
- 🖼️ External image URL management
- 📧 Enquiry form with Firestore storage

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Authentication + Firestore)
- **Icons:** React Icons
- **Animation:** Framer Motion
- **Fonts:** Dancing Script, Playfair Display, Inter

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file with your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Firebase Setup

### 1. Create Firestore Collections

The app uses the following Firestore structure:

- `siteSettings/heroSection` - Homepage hero content
- `siteSettings/contactInfo` - Contact details and social links
- `menuItems/` - Menu item documents
- `packages/` - Package documents
- `testimonials/` - Testimonial documents
- `gallery/` - Gallery image documents
- `brandPartners/` - Brand partner logo documents
- `enquiries/` - Contact form submissions
- `pages/aboutUs` - About page content

### 2. Security Rules

Apply these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for all content
    match /{document=**} {
      allow read: if true;
    }
    
    // Admin-only write access
    match /{document=**} {
      allow write: if request.auth != null;
    }
    
    // Public can create enquiries
    match /enquiries/{enquiryId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 3. Create Admin User

Use Firebase Console to create an admin user with email/password authentication.

## Admin Dashboard

Access the admin dashboard at `/admin/login`.

### Admin Features:

- **Dashboard:** View enquiry stats and recent submissions
- **Homepage:** Edit hero section, brand partners, testimonials, gallery
- **Menu Items:** Add, edit, delete menu items with images and flavors
- **Packages:** Manage the three packages with pricing and inclusions
- **Gallery:** Manage gallery images
- **Enquiries:** View and manage contact form submissions
- **Settings:** Update contact info and social media links

## Pages

### Public Pages:
- `/` - Homepage
- `/menu` - Menu showcase
- `/menu/[slug]` - Individual menu item details
- `/about` - Our story
- `/packages` - Service packages
- `/contact` - Enquiry form
- `/legal/terms` - Terms & Conditions
- `/legal/privacy` - Privacy Policy
- `/legal/nutrition` - Allergen & Nutritional Information

### Admin Pages:
- `/admin/login` - Admin authentication
- `/admin` - Dashboard
- `/admin/homepage` - Homepage content editor
- `/admin/menu` - Menu items manager
- `/admin/packages` - Packages manager
- `/admin/gallery` - Gallery manager
- `/admin/enquiries` - Enquiries inbox
- `/admin/settings` - Site settings

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Color Palette

- Cream: `#F5F1ED`
- Brown: `#3B2A26`
- Copper/Tan: `#C9A882`
- Coral: `#D4978C`
- Sage Green: `#C8D4CC`

## License

All rights reserved © 2025 Chaii Bros Ltd
