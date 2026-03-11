# 🍳 AI Recipe Generator

A full-stack web application that leverages Google's Generative AI to create personalized recipes based on your available ingredients, dietary preferences, and cooking style.

## ✨ Features

### 🤖 AI-Powered Recipe Generation
- Generate unique recipes based on ingredients you have
- Customize by cuisine type, dietary restrictions, cooking time, and servings
- Auto-fill preferences from your user profile
- Save generated recipes to your collection

### 📦 Smart Pantry Management
- Track ingredients with quantities, units, and expiration dates
- Category-based organization
- Expiration alerts for items nearing their shelf life
- Quick search and filtering

### 📅 Meal Planning
- Weekly meal planner with calendar view
- Generate shopping lists from planned meals
- Drag-and-drop meal scheduling
- Track meals by date

### 🛒 Smart Shopping List
- Auto-generate shopping lists from meal plans
- Subtract pantry items from shopping needs
- Check off items as you shop
- Add checked items directly to pantry
- Category-based grouping

### 👤 User Preferences
- Dietary restrictions (Vegetarian, Vegan, Gluten-Free, etc.)
- Preferred cuisines
- Default serving sizes
- Measurement units (metric/imperial)

### 📊 Dashboard Analytics
- Total recipes saved
- Pantry items count
- Meals planned this week
- Recent recipes
- Upcoming meals

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **date-fns** - Date manipulation

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI recipe generation

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Google AI API key ([Get one here](https://ai.google.dev/))

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/KonstMiron/ai-recipe-generator.git
cd ai-recipe-generator
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb recipe_generator

# Run the schema
psql -d recipe_generator -f backend/config/schema.sql

# Or use the migration script
cd backend
node migrate.js
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=8000
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/recipe_generator
JWT_SECRET=your_super_secret_jwt_key_change_this
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
EOF

# Start backend server
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend/ai-recipe-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/recipe_generator
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-google-api-key
NODE_ENV=development
```

### Frontend

API base URL is configured in `frontend/ai-recipe-generator/src/services/api.js`. Default is `http://localhost:8000/api`.

## 📁 Project Structure

```
ai-recipe-generator/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── schema.sql         # Database schema
│   ├── controllers/           # Request handlers
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── utils/
│   │   └── gemini.js          # AI integration
│   ├── server.js              # Express app
│   └── package.json
├── frontend/
│   └── ai-recipe-generator/
│       ├── src/
│       │   ├── components/    # Reusable components
│       │   ├── context/       # Auth context
│       │   ├── pages/         # Page components
│       │   ├── services/      # API service
│       │   └── App.jsx
│       ├── index.html
│       └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Recipes
- `GET /api/recipes` - Get all user recipes
- `POST /api/recipes/generate` - Generate recipe with AI
- `POST /api/recipes` - Save recipe
- `GET /api/recipes/:id` - Get recipe details
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/recent` - Get recent recipes
- `GET /api/recipes/stats` - Get recipe statistics

### Pantry
- `GET /api/pantry` - Get pantry items
- `POST /api/pantry` - Add pantry item
- `PUT /api/pantry/:id` - Update pantry item
- `DELETE /api/pantry/:id` - Delete pantry item
- `GET /api/pantry/stats` - Get pantry statistics
- `GET /api/pantry/expiring` - Get expiring items

### Meal Plans
- `GET /api/meal-plans/weekly` - Get weekly meal plan
- `POST /api/meal-plans` - Add meal to plan
- `DELETE /api/meal-plans/:id` - Remove meal from plan
- `GET /api/meal-plans/upcoming` - Get upcoming meals
- `GET /api/meal-plans/stats` - Get meal plan statistics

### Shopping List
- `GET /api/shopping-list` - Get shopping list
- `POST /api/shopping-list` - Add item to shopping list
- `PUT /api/shopping-list/:id` - Update shopping list item
- `DELETE /api/shopping-list/:id` - Delete item
- `PUT /api/shopping-list/:id/toggle` - Toggle item checked
- `POST /api/shopping-list/generate` - Generate from meal plan
- `POST /api/shopping-list/add-to-pantry` - Add checked items to pantry
- `DELETE /api/shopping-list/checked` - Clear checked items
- `DELETE /api/shopping-list/all` - Clear all items

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/preferences` - Update preferences
- `PUT /api/users/change-password` - Change password
- `DELETE /api/users/account` - Delete account

## 🎨 Key Features Implementation

### AI Recipe Generation
Uses Google's Gemini 2.5 Flash model with custom prompts that include:
- User ingredients
- Dietary restrictions
- Cuisine preferences
- Cooking time constraints
- Serving size

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes with middleware
- Persistent login with localStorage

### Database Schema
- Users and user preferences
- Recipes with ingredients
- Pantry items with expiration tracking
- Meal plans with date scheduling
- Shopping lists with categorization

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- SQL injection prevention with parameterized queries
- Environment variable configuration
- CORS configuration

## 🚧 Future Enhancements

- [ ] Recipe sharing and social features
- [ ] Nutrition information calculation
- [ ] Recipe ratings and reviews
- [ ] Image upload for recipes
- [ ] Voice input for ingredients
- [ ] Mobile app version
- [ ] Recipe import from URLs
- [ ] Collaborative meal planning
- [ ] Grocery store integration
- [ ] Recipe recommendations based on pantry

## 📝 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 👤 Author

**Kostiantyn Myroshnychenko**
- GitHub: [@KonstMiron](https://github.com/KonstMiron)

## 🙏 Acknowledgments

- [Google Generative AI](https://ai.google.dev/) for the AI capabilities
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

---

⭐ If you found this project helpful, please give it a star!
