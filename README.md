# PlayCafe 🚀

A modern cafe website built with React, Node.js, Express, and Supabase.

## Features

- 🍽️ **Menu Management** - Browse and filter menu items by category
- 🛒 **Shopping Cart** - Add items to cart and place orders
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Beautiful and intuitive user interface
- ⚡ **Fast Performance** - Optimized for speed and efficiency
- ☁️ **Cloud Database** - Powered by Supabase (PostgreSQL)
- 🚀 **Vercel Ready** - Optimized for Vercel deployment

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Styling**: CSS3 with modern design patterns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (free tier available)
- Vercel account (free tier available)

### Local Development Setup

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd playcafe
```

2. **Install dependencies:**
```bash
npm run install-all
```

Or install separately:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Set up Supabase:**

   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to SQL Editor and run the schema from `supabase/schema.sql`
   
   c. (Optional) Run the seed data from `supabase/seed.sql` or use the seed script

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=development
   ```
   
   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Seed the database (optional):**
```bash
cd backend
npm run seed
```

6. **Run the application:**

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
# Backend
npm run server

# Frontend (in another terminal)
npm run client
```

7. **Open your browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Vercel Deployment

### Step 1: Deploy Backend to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy backend:**
```bash
cd backend
vercel
```

3. **Set environment variables in Vercel Dashboard:**
   - Go to your project settings in Vercel
   - Add these environment variables:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - `NODE_ENV=production`

### Step 2: Deploy Frontend to Vercel

1. **Update frontend environment variable:**
   - Update `frontend/.env` or Vercel environment variables:
     - `REACT_APP_API_URL` = Your backend Vercel URL (e.g., `https://your-backend.vercel.app/api`)

2. **Deploy frontend:**
```bash
cd frontend
vercel
```

### Alternative: Deploy via GitHub

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `frontend` (for frontend deployment)
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Install Command**: `npm install`
   - Add environment variables

3. **Deploy backend separately:**
   - Create another Vercel project
   - Root Directory: `backend`
   - Framework Preset: Other
   - Build Command: (leave empty or `echo "No build needed"`)
   - Output Directory: (leave empty)
   - Add environment variables

### Step 3: Configure Supabase CORS

In your Supabase dashboard:
1. Go to Settings → API
2. Add your Vercel frontend URL to allowed origins
3. Save changes

## Project Structure

```
playcafe/
├── backend/
│   ├── config/
│   │   └── supabase.js
│   ├── routes/
│   │   ├── menu.js
│   │   ├── orders.js
│   │   └── auth.js
│   ├── api/
│   │   └── index.js (Vercel serverless entry)
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Menu.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   └── Cart.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── vercel.json
├── package.json
└── README.md
```

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `GET /api/menu?category=Coffee` - Filter by category
- `GET /api/menu?featured=true` - Get featured items
- `POST /api/menu` - Create menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status

## Database Schema

The database uses PostgreSQL via Supabase with the following tables:

- **menu_items** - Stores menu items (coffee, tea, snacks, etc.)
- **orders** - Stores customer orders
- **order_items** - Junction table linking orders to menu items

See `supabase/schema.sql` for the complete schema.

## Environment Variables

### Backend (.env)
```
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update `REACT_APP_API_URL` to your deployed backend URL.

## Troubleshooting

### Supabase Connection Issues
- Verify your `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check Supabase project status in dashboard
- Ensure RLS policies allow your operations

### Vercel Deployment Issues
- Make sure all environment variables are set in Vercel dashboard
- Check build logs for errors
- Verify API routes are accessible
- Ensure CORS is configured correctly in Supabase

### Local Development Issues
- Ensure Supabase project is active
- Check that database tables are created (run schema.sql)
- Verify environment variables are loaded correctly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ using React, Express, and Supabase
