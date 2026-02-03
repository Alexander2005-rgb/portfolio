# Project Management Guide - Add, Edit, Delete Projects

## **Overview**

After login, the owner can:

- ✅ **Add Projects** - Create new portfolio projects
- ✅ **Edit Projects** - Modify existing project details
- ✅ **Delete Projects** - Remove projects from portfolio
- ✅ **View All Projects** - Browse all projects with filters

---

## **User Experience Flow**

### **Step 1: Login to Portfolio**

1. Click **"Login"** button (top right of header)
2. Enter your email and password
3. Click **"Login"**
4. You'll see your email displayed in the navbar with a logout button

### **Step 2: Add New Project**

After logging in:

1. Navigate to **"Featured Projects"** section
2. Click **"+ Add Project"** button (appears after login)
3. A form appears with these fields:
   - **Project Title** - Name of your project
   - **Project Description** - Details about the project
   - **Image URL** - Link to project screenshot/image
   - **Category** - Select from: React, Node.js, Full Stack, Mobile
   - **Project URL** - Link to live project or GitHub repo
4. Click **"Add Project"**
5. Project appears immediately in the projects grid
6. You'll see the project with **Edit** and **Delete** buttons

### **Step 3: View Projects with Actions**

On each project card, you'll see:

- **Project Image** with hover effect
- **Project Title & Description**
- **Date Created**
- **"✎ Edit" button** (blue)
- **"🗑 Delete" button** (red)

These buttons only appear when you're logged in as the owner.

### **Step 4: Edit a Project**

1. Click the **"✎ Edit"** button on any project card
2. The form reopens with the project's current details
3. Form title changes to **"Edit Project"**
4. Modify any field you want to update
5. Click **"Update Project"** to save changes
6. Project updates immediately in the grid
7. Click **"Cancel Edit"** to discard changes

### **Step 5: Delete a Project**

1. Click the **"🗑 Delete"** button on any project card
2. A confirmation dialog appears: _"Are you sure you want to delete this project?"_
3. Click **"OK"** to confirm deletion
4. Project is removed from portfolio immediately
5. Click **"Cancel"** to keep the project

---

## **Features**

### **Add Project Form**

```
┌─────────────────────────────────┐
│      Add New Project            │
├─────────────────────────────────┤
│ [Project Title Input]           │
│ [Description Textarea]          │
│ [Image URL] [Category Dropdown] │
│ [Project URL Input]             │
│ [Add Project Button]            │
└─────────────────────────────────┘
```

### **Edit Mode**

- Form displays **"Edit Project"** as the title
- **"Update Project"** button instead of **"Add Project"**
- **"Cancel Edit"** button appears to discard changes
- All fields pre-populated with current project data

### **Project Card Actions**

```
┌──────────────────────────────┐
│   [Project Image]            │
├──────────────────────────────┤
│ Project Title                │
│ Project Description          │
│ Date: Feb 3, 2024           │
│ [✎ Edit] [🗑 Delete]       │
└──────────────────────────────┘
```

---

## **Technical Details**

### **Frontend to Backend Communication**

**Add Project:**

```
POST /projects/add
Headers: Authorization: Bearer <token>
Body: { title, description, imageUrl, projectUrl, category }
Response: { message, project }
```

**Update Project:**

```
POST /projects/update/{projectId}
Headers: Authorization: Bearer <token>
Body: { title, description, imageUrl, projectUrl, category }
Response: { message, project }
```

**Delete Project:**

```
DELETE /projects/{projectId}
Headers: Authorization: Bearer <token>
Response: { message }
```

### **Security Features**

✅ **JWT Token Required** - All operations require valid login
✅ **Role-Based Access** - Only owner can add/edit/delete
✅ **Authorization Checks** - Backend verifies token and role
✅ **Confirmation Dialog** - Prevents accidental deletion
✅ **Error Handling** - Clear error messages for failed operations

---

## **State Management**

### **Component State**

```javascript
-isAuthenticated - // Boolean: user logged in?
  projects - // Array: all projects from database
  filteredProjects - // Array: filtered by category
  showAddProject - // Boolean: form visible?
  editingId - // String: ID of project being edited (null if adding)
  newProject - // Object: form data
  selectedCategory; // String: active filter category
```

### **Form Behavior**

1. **Add Mode** (editingId === null)
   - Form title: "Add New Project"
   - Submit button: "Add Project"
   - Cancel button: Not shown

2. **Edit Mode** (editingId !== null)
   - Form title: "Edit Project"
   - Submit button: "Update Project"
   - Cancel button: "Cancel Edit"
   - Fields pre-filled with project data

---

## **Responsive Design**

### **Desktop (> 768px)**

- Form displayed inline with projects
- Action buttons side-by-side on project cards
- Add Project button positioned on right

### **Mobile (≤ 768px)**

- Form takes full width
- Action buttons stack vertically
- Touch-friendly button sizes
- Responsive input fields

---

## **Error Handling**

| Error                          | Cause                    | Solution                                   |
| ------------------------------ | ------------------------ | ------------------------------------------ |
| "Please fill in all fields"    | Missing required field   | Complete all form fields                   |
| "Please login first"           | Not authenticated        | Click Login button and enter credentials   |
| "Only owner can add projects"  | Wrong user role          | Login with owner account                   |
| "Error adding project"         | Server error             | Check backend logs, retry                  |
| "Project deleted successfully" | Deletion failed silently | Refresh page to see current state          |
| Image won't load               | Invalid image URL        | Verify image URL is correct and accessible |

---

## **Best Practices**

### **Adding Projects**

1. ✅ Use clear, descriptive titles
2. ✅ Write concise but informative descriptions
3. ✅ Use high-quality project images
4. ✅ Ensure project URLs are valid and working
5. ✅ Select appropriate category for filtering

### **Managing Projects**

1. ✅ Review projects regularly
2. ✅ Keep descriptions up-to-date
3. ✅ Fix broken links promptly
4. ✅ Remove outdated projects
5. ✅ Organize by category for better UX

### **Image URLs**

- Use HTTPS URLs for security
- Recommended size: 400x300px or larger
- Formats: JPG, PNG, WebP
- Examples:
  ```
  https://example.com/project-screenshot.jpg
  https://imgur.com/xyz123.png
  https://cloudinary.com/image.webp
  ```

---

## **Keyboard Shortcuts** (Coming Soon)

| Key      | Action                             |
| -------- | ---------------------------------- |
| `Esc`    | Close add/edit form                |
| `Ctrl+S` | Save project (when form focused)   |
| `Delete` | Delete project (with confirmation) |

---

## **API Integration**

### **All Endpoints**

| Method | URL                    | Auth | Role  | Description        |
| ------ | ---------------------- | ---- | ----- | ------------------ |
| GET    | `/projects`            | No   | -     | Get all projects   |
| POST   | `/projects/add`        | Yes  | Owner | Add new project    |
| GET    | `/projects/:id`        | No   | -     | Get single project |
| POST   | `/projects/update/:id` | Yes  | Owner | Update project     |
| DELETE | `/projects/:id`        | Yes  | Owner | Delete project     |

### **Example Request (Add Project)**

```bash
curl -X POST http://localhost:5000/projects/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My React App",
    "description": "A modern portfolio website",
    "imageUrl": "https://example.com/image.jpg",
    "projectUrl": "https://myapp.com",
    "category": "React"
  }'
```

---

## **Troubleshooting**

### **Edit/Delete buttons not showing**

- ❌ Problem: Not logged in
- ✅ Solution: Click Login and enter credentials

### **Form won't submit**

- ❌ Problem: Missing required fields
- ✅ Solution: Fill all fields and try again

### **Changes don't appear**

- ❌ Problem: Page not refreshed
- ✅ Solution: Refresh page or navigate away and back

### **Token expired**

- ❌ Problem: Session older than 7 days
- ✅ Solution: Login again to get new token

### **Image doesn't display**

- ❌ Problem: Invalid URL or broken link
- ✅ Solution: Verify image URL and replace if needed

---

## **Future Enhancements**

🔄 **Planned Features:**

- Drag-and-drop image upload (instead of URL)
- Project preview before publishing
- Bulk operations (delete multiple projects)
- Project scheduling (publish/hide dates)
- Project analytics and view counts
- Duplicate project functionality
- Project templates for quick creation
- Version history and rollback

---

## **Summary**

After login, you have full control over your portfolio projects:

| Action          | Access | Visibility                 |
| --------------- | ------ | -------------------------- |
| View Projects   | Public | Everyone                   |
| Add Projects    | Owner  | Form shown after login     |
| Edit Projects   | Owner  | Edit button on each card   |
| Delete Projects | Owner  | Delete button on each card |
| Filter Projects | Public | Everyone                   |

**Your portfolio is now fully manageable!** 🚀
