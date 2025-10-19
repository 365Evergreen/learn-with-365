# SharePoint Integration Setup Guide

This guide will help you set up the required SharePoint lists and structure to support the learning platform's data storage.

## SharePoint Site Setup

### 1. Create SharePoint Site
1. Go to your SharePoint admin center or create a new site
2. Create a new site called **"LearningPlatform"** (or update the site name in `SharePointService.ts`)
3. Note your tenant name (e.g., `365evergreen` from `365evergreen.sharepoint.com`)

### 2. Update Configuration
In `src/services/SharePointService.ts`, update these values:
```typescript
const SHAREPOINT_SITE = {
  TENANT: 'your-tenant-name', // Replace with your actual tenant name
  SITE_NAME: 'LearningPlatform' // Replace with your actual site name
};
```

## Required SharePoint Lists

### 1. Courses List
**List Name:** `Courses`

**Columns:**
- `Title` (Single line of text) - Course title
- `Description` (Multiple lines of text) - Course description
- `Category` (Single line of text) - Course category (e.g., "Microsoft 365", "SharePoint", "Power Platform")
- `Difficulty` (Choice) - Options: "Beginner", "Intermediate", "Advanced"
- `EstimatedHours` (Number) - Estimated completion time in hours
- `ImageUrl` (Hyperlink) - Optional course image URL
- `IsActive` (Yes/No) - Whether the course is active and available

### 2. UserProgress List
**List Name:** `UserProgress`

**Columns:**
- `Title` (Single line of text) - Auto-generated title
- `UserId` (Single line of text) - User's Azure AD object ID
- `UserEmail` (Single line of text) - User's email address
- `CourseId` (Number) - Reference to course ID
- `ModuleId` (Number) - Optional module ID within course
- `Status` (Choice) - Options: "Not Started", "In Progress", "Completed"
- `ProgressPercentage` (Number) - Progress percentage (0-100)
- `StartedDate` (Date and Time) - When user started the course/module
- `CompletedDate` (Date and Time) - When user completed the course/module
- `LastAccessedDate` (Date and Time) - Last time user accessed the course
- `TimeSpent` (Number) - Time spent in minutes

### 3. UserEnrollments List
**List Name:** `UserEnrollments`

**Columns:**
- `Title` (Single line of text) - Auto-generated title
- `UserId` (Single line of text) - User's Azure AD object ID
- `UserEmail` (Single line of text) - User's email address
- `CourseId` (Number) - Reference to course ID
- `EnrolledDate` (Date and Time) - When user enrolled
- `Status` (Choice) - Options: "Active", "Completed", "Dropped"
- `CompletionDate` (Date and Time) - When user completed the course
- `Grade` (Number) - Optional final grade percentage

### 4. CourseContent List (Optional - for future use)
**List Name:** `CourseContent`

**Columns:**
- `Title` (Single line of text) - Module/content title
- `CourseId` (Number) - Reference to course ID
- `ContentType` (Choice) - Options: "Video", "Document", "Quiz", "Assignment"
- `ContentUrl` (Hyperlink) - URL to content
- `Duration` (Number) - Content duration in minutes
- `OrderIndex` (Number) - Order within the course
- `Description` (Multiple lines of text) - Content description

### 5. Certificates List
**List Name:** `Certificates`

**Columns:**
- `Title` (Single line of text) - Certificate title
- `UserId` (Single line of text) - User's Azure AD object ID
- `UserEmail` (Single line of text) - User's email address
- `CourseId` (Number) - Reference to course ID
- `CertificateNumber` (Single line of text) - Unique certificate number
- `IssuedDate` (Date and Time) - When certificate was issued
- `ExpiryDate` (Date and Time) - Optional expiry date
- `CertificateUrl` (Hyperlink) - URL to certificate file

## Sample Data

### Sample Courses
Add these sample courses to test the integration:

**Course 1:**
- Title: "Microsoft 365 Fundamentals"
- Description: "Learn the basics of Microsoft 365 suite including Teams, SharePoint, and Office apps"
- Category: "Microsoft 365"
- Difficulty: "Beginner"
- EstimatedHours: 8
- IsActive: Yes

**Course 2:**
- Title: "SharePoint Advanced Features"
- Description: "Master advanced SharePoint capabilities including workflows, custom forms, and integrations"
- Category: "SharePoint"
- Difficulty: "Advanced"
- EstimatedHours: 12
- IsActive: Yes

**Course 3:**
- Title: "Power Platform Basics"
- Description: "Introduction to Power Apps, Power Automate, and Power BI"
- Category: "Power Platform"
- Difficulty: "Intermediate"
- EstimatedHours: 10
- IsActive: Yes

### Sample User Enrollments
After creating courses, you can add sample enrollments:

**Enrollment 1:**
- UserEmail: [your-email@domain.com]
- CourseId: 1 (Microsoft 365 Fundamentals)
- EnrolledDate: [current date]
- Status: "Active"

### Sample Progress Records
**Progress 1:**
- UserEmail: [your-email@domain.com]
- CourseId: 1
- Status: "In Progress"
- ProgressPercentage: 65
- StartedDate: [a week ago]
- LastAccessedDate: [current date]
- TimeSpent: 240 (4 hours)

## Permissions Setup

### Required Permissions
The app requires these Microsoft Graph permissions:
- `Sites.ReadWrite.All` - Read and write to SharePoint sites
- `Files.ReadWrite.All` - Read and write files (for certificates/content)

### Azure AD App Registration
1. In Azure Portal → Azure AD → App registrations
2. Find your app registration
3. Go to "API permissions"
4. Ensure these permissions are granted:
   - Microsoft Graph → Sites.ReadWrite.All (Application)
   - Microsoft Graph → Files.ReadWrite.All (Application)
5. Click "Grant admin consent"

## Testing the Integration

1. **Create the lists** as described above
2. **Add sample data** to test with
3. **Update the configuration** in `SharePointService.ts`
4. **Deploy your app** and test the My Profile page
5. **Check browser console** for any errors during data loading

## Troubleshooting

### Common Issues
1. **"Site not found" error**: Check tenant name and site name in configuration
2. **"List not found" error**: Ensure all lists are created with exact names
3. **Permission errors**: Verify API permissions are granted
4. **No data showing**: Check that sample data exists and user email matches

### Debug Tips
1. Open browser developer tools
2. Check Network tab for API calls to Graph
3. Look for error messages in Console tab
4. Verify access tokens include required scopes

## Future Enhancements

Consider adding these features:
- **Course modules/lessons** (using CourseContent list)
- **Quizzes and assessments**
- **Discussion forums** (using SharePoint lists or Teams integration)
- **File attachments** for course materials
- **Automated certificate generation**
- **Learning paths** (sequences of related courses)
- **Social features** (comments, ratings, sharing)

## Security Considerations

- **Data access**: Users can only see their own progress and enrollments
- **Admin access**: Consider separate admin permissions for course management
- **Audit logging**: SharePoint automatically logs all changes
- **Data retention**: Set up retention policies as needed
- **Compliance**: Ensure setup meets your organization's compliance requirements