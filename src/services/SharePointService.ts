import { AuthenticationResult } from '@azure/msal-browser';
import { graphConfig } from '../config/authConfig';

// SharePoint List Names - Update these to match your actual SharePoint lists
const SHAREPOINT_LISTS = {
  COURSES: 'Courses',
  USER_PROGRESS: 'UserProgress', 
  USER_ENROLLMENTS: 'UserEnrollments',
  COURSE_CONTENT: 'CourseContent',
  CERTIFICATES: 'Certificates'
};

import { AuthenticationResult } from '@azure/msal-browser';

// SharePoint site configuration
const SHAREPOINT_SITE = {
  // Update with your actual SharePoint site details
  TENANT: '365evergreen', // Your tenant name
  SITE_NAME: 'LearningPlatform' // Your SharePoint site name
};

export interface SharePointCourse {
  Id: number;
  Title: string;
  Description: string;
  Category: string;
  Difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  EstimatedHours: number;
  ImageUrl?: string;
  IsActive: boolean;
  CreatedDate: string;
  ModifiedDate: string;
  Modules?: CourseModule[];
}

export interface CourseModule {
  Id: number;
  Title: string;
  Description: string;
  ContentType: 'Video' | 'Document' | 'Quiz' | 'Assignment';
  ContentUrl?: string;
  Duration?: number;
  OrderIndex: number;
}

export interface UserProgress {
  Id: number;
  UserId: string;
  UserEmail: string;
  CourseId: number;
  ModuleId?: number;
  Status: 'Not Started' | 'In Progress' | 'Completed';
  ProgressPercentage: number;
  StartedDate?: string;
  CompletedDate?: string;
  LastAccessedDate: string;
  TimeSpent?: number; // in minutes
}

export interface UserEnrollment {
  Id: number;
  UserId: string;
  UserEmail: string;
  CourseId: number;
  EnrolledDate: string;
  Status: 'Active' | 'Completed' | 'Dropped';
  CompletionDate?: string;
  Grade?: number;
}

export interface Certificate {
  Id: number;
  UserId: string;
  UserEmail: string;
  CourseId: number;
  CertificateNumber: string;
  IssuedDate: string;
  ExpiryDate?: string;
  CertificateUrl?: string;
}

export class SharePointService {
  private accessToken: string | null = null;
  private siteId: string | null = null;

  constructor(authResult?: AuthenticationResult) {
    if (authResult?.accessToken) {
      this.accessToken = authResult.accessToken;
    }
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private async makeGraphRequest(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', body?: any) {
    if (!this.accessToken) {
      throw new Error('No access token available. User must be authenticated.');
    }

    const response = await fetch(`https://graph.microsoft.com/v1.0${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SharePoint API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  private async getSiteId(): Promise<string> {
    if (this.siteId) {
      return this.siteId;
    }

    try {
      // Try to get site by hostname and path
      const siteUrl = `${SHAREPOINT_SITE.TENANT}.sharepoint.com:/sites/${SHAREPOINT_SITE.SITE_NAME}`;
      const response = await this.makeGraphRequest(`/sites/${siteUrl}`);
      this.siteId = response.id;
      return this.siteId as string;
    } catch (error) {
      console.error('Error getting site ID:', error);
      throw new Error('Could not find SharePoint site. Please check site configuration.');
    }
  }

  // Course Management
  async getCourses(): Promise<SharePointCourse[]> {
    try {
      const siteId = await this.getSiteId();
      const response = await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.COURSES}/items?expand=fields&$filter=fields/IsActive eq true`
      );
      
      return response.value.map((item: any) => ({
        Id: item.fields.id || item.id,
        Title: item.fields.Title,
        Description: item.fields.Description,
        Category: item.fields.Category,
        Difficulty: item.fields.Difficulty,
        EstimatedHours: item.fields.EstimatedHours,
        ImageUrl: item.fields.ImageUrl,
        IsActive: item.fields.IsActive,
        CreatedDate: item.fields.Created,
        ModifiedDate: item.fields.Modified
      }));
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  async getCourse(courseId: number): Promise<SharePointCourse | null> {
    try {
      const siteId = await this.getSiteId();
      const response = await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.COURSES}/items/${courseId}?expand=fields`
      );
      
      return {
        Id: response.fields.id || response.id,
        Title: response.fields.Title,
        Description: response.fields.Description,
        Category: response.fields.Category,
        Difficulty: response.fields.Difficulty,
        EstimatedHours: response.fields.EstimatedHours,
        ImageUrl: response.fields.ImageUrl,
        IsActive: response.fields.IsActive,
        CreatedDate: response.fields.Created,
        ModifiedDate: response.fields.Modified
      };
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }

  // User Progress Management
  async getUserProgress(userEmail: string): Promise<UserProgress[]> {
    try {
      const siteId = await this.getSiteId();
      const response = await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.USER_PROGRESS}/items?expand=fields&$filter=fields/UserEmail eq '${userEmail}'`
      );
      
      return response.value.map((item: any) => ({
        Id: item.fields.id || item.id,
        UserId: item.fields.UserId,
        UserEmail: item.fields.UserEmail,
        CourseId: item.fields.CourseId,
        ModuleId: item.fields.ModuleId,
        Status: item.fields.Status,
        ProgressPercentage: item.fields.ProgressPercentage || 0,
        StartedDate: item.fields.StartedDate,
        CompletedDate: item.fields.CompletedDate,
        LastAccessedDate: item.fields.LastAccessedDate || item.fields.Modified,
        TimeSpent: item.fields.TimeSpent || 0
      }));
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return [];
    }
  }

  async getUserEnrollments(userEmail: string): Promise<UserEnrollment[]> {
    try {
      const siteId = await this.getSiteId();
      const response = await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.USER_ENROLLMENTS}/items?expand=fields&$filter=fields/UserEmail eq '${userEmail}'`
      );
      
      return response.value.map((item: any) => ({
        Id: item.fields.id || item.id,
        UserId: item.fields.UserId,
        UserEmail: item.fields.UserEmail,
        CourseId: item.fields.CourseId,
        EnrolledDate: item.fields.EnrolledDate,
        Status: item.fields.Status,
        CompletionDate: item.fields.CompletionDate,
        Grade: item.fields.Grade
      }));
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      return [];
    }
  }

  async getUserCertificates(userEmail: string): Promise<Certificate[]> {
    try {
      const siteId = await this.getSiteId();
      const response = await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.CERTIFICATES}/items?expand=fields&$filter=fields/UserEmail eq '${userEmail}'`
      );
      
      return response.value.map((item: any) => ({
        Id: item.fields.id || item.id,
        UserId: item.fields.UserId,
        UserEmail: item.fields.UserEmail,
        CourseId: item.fields.CourseId,
        CertificateNumber: item.fields.CertificateNumber,
        IssuedDate: item.fields.IssuedDate,
        ExpiryDate: item.fields.ExpiryDate,
        CertificateUrl: item.fields.CertificateUrl
      }));
    } catch (error) {
      console.error('Error fetching user certificates:', error);
      return [];
    }
  }

  // Progress Tracking
  async updateUserProgress(userEmail: string, courseId: number, moduleId: number | null, progressData: Partial<UserProgress>): Promise<boolean> {
    try {
      const siteId = await this.getSiteId();
      
      // First, check if progress record exists
      const filterQuery = moduleId 
        ? `fields/UserEmail eq '${userEmail}' and fields/CourseId eq ${courseId} and fields/ModuleId eq ${moduleId}`
        : `fields/UserEmail eq '${userEmail}' and fields/CourseId eq ${courseId} and fields/ModuleId eq null`;
        
      const existingResponse = await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.USER_PROGRESS}/items?expand=fields&$filter=${filterQuery}`
      );

      const updateData = {
        fields: {
          UserEmail: userEmail,
          CourseId: courseId,
          ModuleId: moduleId,
          Status: progressData.Status,
          ProgressPercentage: progressData.ProgressPercentage,
          LastAccessedDate: new Date().toISOString(),
          TimeSpent: progressData.TimeSpent,
          ...(progressData.StartedDate && { StartedDate: progressData.StartedDate }),
          ...(progressData.CompletedDate && { CompletedDate: progressData.CompletedDate })
        }
      };

      if (existingResponse.value.length > 0) {
        // Update existing record
        const itemId = existingResponse.value[0].id;
        await this.makeGraphRequest(
          `/sites/${siteId}/lists/${SHAREPOINT_LISTS.USER_PROGRESS}/items/${itemId}`,
          'PATCH',
          updateData
        );
      } else {
        // Create new record
        await this.makeGraphRequest(
          `/sites/${siteId}/lists/${SHAREPOINT_LISTS.USER_PROGRESS}/items`,
          'POST',
          updateData
        );
      }

      return true;
    } catch (error) {
      console.error('Error updating user progress:', error);
      return false;
    }
  }

  // Enrollment Management
  async enrollUser(userEmail: string, courseId: number): Promise<boolean> {
    try {
      const siteId = await this.getSiteId();
      
      const enrollmentData = {
        fields: {
          UserEmail: userEmail,
          CourseId: courseId,
          EnrolledDate: new Date().toISOString(),
          Status: 'Active'
        }
      };

      await this.makeGraphRequest(
        `/sites/${siteId}/lists/${SHAREPOINT_LISTS.USER_ENROLLMENTS}/items`,
        'POST',
        enrollmentData
      );

      return true;
    } catch (error) {
      console.error('Error enrolling user:', error);
      return false;
    }
  }

  // Analytics and Recommendations
  async getUserStats(userEmail: string): Promise<{
    coursesCompleted: number;
    coursesInProgress: number;
    totalHoursLearned: number;
    certificatesEarned: number;
    currentStreak: number;
  }> {
    try {
      const [progress, certificates] = await Promise.all([
        this.getUserProgress(userEmail),
        this.getUserCertificates(userEmail)
      ]);

      const completedCourses = progress.filter(p => p.Status === 'Completed').length;
      const inProgressCourses = progress.filter(p => p.Status === 'In Progress').length;
      const totalMinutes = progress.reduce((sum, p) => sum + (p.TimeSpent || 0), 0);
      const totalHours = Math.floor(totalMinutes / 60);

      // Calculate streak (simplified - days with activity in last 30 days)
      const recentActivity = progress.filter(p => {
        const lastAccess = new Date(p.LastAccessedDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastAccess > thirtyDaysAgo;
      });

      return {
        coursesCompleted: completedCourses,
        coursesInProgress: inProgressCourses,
        totalHoursLearned: totalHours,
        certificatesEarned: certificates.length,
        currentStreak: Math.min(recentActivity.length, 30) // Simplified streak calculation
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        coursesCompleted: 0,
        coursesInProgress: 0,
        totalHoursLearned: 0,
        certificatesEarned: 0,
        currentStreak: 0
      };
    }
  }

  async getRecommendedCourses(userEmail: string, limit: number = 5): Promise<SharePointCourse[]> {
    try {
      // Get user's completed courses to find similar ones
      const userProgress = await this.getUserProgress(userEmail);
      const completedCourseIds = userProgress
        .filter(p => p.Status === 'Completed')
        .map(p => p.CourseId);

      const allCourses = await this.getCourses();
      
      // Simple recommendation: courses in same categories as completed courses
      const completedCourses = allCourses.filter(c => completedCourseIds.includes(c.Id));
      const completedCategories = Array.from(new Set(completedCourses.map(c => c.Category)));
      
      const recommended = allCourses
        .filter(course => 
          !completedCourseIds.includes(course.Id) && // Not already completed
          (completedCategories.includes(course.Category) || completedCategories.length === 0) // Same category or no completed courses
        )
        .slice(0, limit);

      return recommended;
    } catch (error) {
      console.error('Error fetching recommended courses:', error);
      return [];
    }
  }
}

export default SharePointService;