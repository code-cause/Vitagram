//delete post/ update(PUT) on PostModal.jsx
//like(POST) /unlike post on HomePage.jsx
How to manage posts from multiple users (database connectivity)?
Remove sample post


Do i need to use Context for anything so far?



userImage edit functionality on Edit Profile and then managing its reference throughout the app




Step 1: Project Setup and Basic Structure
Step 2: Add Basic Routing and Create Login/Signup Forms
Step 3: Create Navbar and Basic Home Layout
Step 4: Convert to Tailwind CSS 4

# DRAFT-1 (routing for login/signup form on profile icon click)

1. **Project Setup and Structure**
- Created a React project using Vite
- Implemented TailwindCSS for styling
- Set up React Router for navigation
- Organized project structure with components, pages, and services directories

2. **Authentication Pages**
- Created <mcfile name="Login.jsx" path="src/components/auth/Login.jsx"></mcfile> component with:
  - Email/password login form
  - Facebook login option
  - "Forgot password" link
  - Mobile app download links
- Implemented <mcfile name="Signup.jsx" path="src/components/auth/Signup.jsx"></mcfile> with:
  - Email/phone registration form
  - Facebook signup option
  - Terms and policies links

3. **Main Layout and Navigation**
- Developed <mcfile name="Navbar.jsx" path="src/components/layout/Navbar.jsx"></mcfile> featuring:
  - Instagram logo
  - Search bar (hidden on mobile)
  - Navigation icons (Home, Messages, Create, Explore, Notifications, Profile)
  - Responsive design

4. **Homepage Features**
- Built <mcfile name="HomePage.jsx" path="src/pages/HomePage.jsx"></mcfile> with:
  - Stories section with circular avatars
  - Post feed with mock data
  - Like, comment, share, and bookmark actions
  - Sidebar with:
    - User profile
    - Suggested accounts
    - Footer links

**Customizations:**
1. Navbar positioning and Instagram logo sizing
2. Sidebar positioning fix (added `top-[60px]` and `pt-4` to prevent navbar overlap)
3. Responsive layout implementation (mobile and desktop views)
4. Mock data integration for posts and suggestions

The project currently has a solid foundation with the main Instagram features implemented in the UI, though it's still using mock data and needs backend integration for full functionality.


# ###################################################################################################   

Step 5: Add State Management and Basic API Integration

# DRAFT-2 
Authentication Flow:
* Fixed signup form validation
  - Added validation for all required fields
  - Implemented email/phone format validation

Navigation Updates:
* Enhanced Navbar functionality
  - Added navigation links for all main features
  - **Implemented logout functionality**

**HomePage Improvements:**
* Added user profile display
  - Shows user's name and email from localStorage
  - Added proper error handling for localStorage data

Error Handling:
* Improved error management
  - Added try-catch blocks for data parsing
  - Added fallback values for missing data
  - Fixed JSON parsing issues in user data retrieval

API Integration:
* Enhanced API communication
  - Implemented token-based authentication

# ###################################################################################################   

Step 5: continued (Context creation and Upload functionality)

# DRAFT-3

Key suggestions for implementing post creation:

1. Add a "Create Post" button in the feed header
2. Create a modal component for post creation
3. Add state management for posts (useState/Redux)
4. Implement image upload functionality
5. Add form for caption input
6. Create API endpoint for post creation
7. Update UI after successful post creation
8. Add loading states and error handling

       
        
Features and logic implemented so far:

- Authentication pages: Login and Signup with basic routing
- Main layout: Responsive Navbar, Sidebar, and HomePage feed
- Mocked posts and suggestions: Displayed on HomePage
- Profile page: User profile rendering
- Create Post:
  - Dedicated /create route and page for post creation (image upload, caption input)
  - Navigation to /create via Navbar
- Routing: All main pages (home, profile, login, signup, create post) are routed using React Router
- UI/UX: Responsive design, fixed sidebar, and clean layout
Let me know if you want to add more features or need further cleanup!


