import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SharePointService, { SharePointCourse, UserProgress, UserEnrollment, Certificate } from '../services/SharePointService';

export interface UserCourseData {
  course: SharePointCourse;
  progress: UserProgress | null;
  enrollment: UserEnrollment | null;
}

export const useSharePointData = () => {
  const { user, isAuthenticated } = useAuth();
  const [sharePointService, setSharePointService] = useState<SharePointService | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize SharePoint service when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // The service will be initialized with the access token when needed
      const service = new SharePointService();
      setSharePointService(service);
    } else {
      setSharePointService(null);
    }
  }, [isAuthenticated, user]);

  // Get access token and set it on the service
  const initializeService = useCallback(async () => {
    if (!sharePointService || !isAuthenticated) {
      return false;
    }

    try {
      // Get current MSAL instance and acquire token silently
      const msalInstance = (window as any).__msalInstance;
      if (msalInstance) {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          const tokenRequest = {
            scopes: ['Sites.ReadWrite.All', 'Files.ReadWrite.All'],
            account: accounts[0],
            forceRefresh: false
          };
          
          const response = await msalInstance.acquireTokenSilent(tokenRequest);
          sharePointService.setAccessToken(response.accessToken);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error initializing SharePoint service:', error);
      setError('Failed to initialize SharePoint connection');
      return false;
    }
  }, [sharePointService, isAuthenticated]);

  // Get all courses
  const getCourses = useCallback(async (): Promise<SharePointCourse[]> => {
    if (!sharePointService) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const courses = await sharePointService.getCourses();
      return courses;
    } catch (err: any) {
      setError(err.message || 'Error fetching courses');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, initializeService]);

  // Get user's courses with progress
  const getUserCourses = useCallback(async (): Promise<UserCourseData[]> => {
    if (!sharePointService || !user?.email) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const [courses, progressList, enrollments] = await Promise.all([
        sharePointService.getCourses(),
        sharePointService.getUserProgress(user.email),
        sharePointService.getUserEnrollments(user.email)
      ]);

      // Combine courses with user progress and enrollment data
      const enrolledCourseIds = enrollments.map(e => e.CourseId);
      const enrolledCourses = courses.filter(course => enrolledCourseIds.includes(course.Id));

      const userCoursesData: UserCourseData[] = enrolledCourses.map(course => {
        const progress = progressList.find(p => p.CourseId === course.Id) || null;
        const enrollment = enrollments.find(e => e.CourseId === course.Id) || null;
        
        return {
          course,
          progress,
          enrollment
        };
      });

      return userCoursesData;
    } catch (err: any) {
      setError(err.message || 'Error fetching user courses');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, user?.email, initializeService]);

  // Get user statistics
  const getUserStats = useCallback(async () => {
    if (!sharePointService || !user?.email) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const stats = await sharePointService.getUserStats(user.email);
      return stats;
    } catch (err: any) {
      setError(err.message || 'Error fetching user statistics');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, user?.email, initializeService]);

  // Get recommended courses
  const getRecommendedCourses = useCallback(async (limit: number = 5): Promise<SharePointCourse[]> => {
    if (!sharePointService || !user?.email) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const recommended = await sharePointService.getRecommendedCourses(user.email, limit);
      return recommended;
    } catch (err: any) {
      setError(err.message || 'Error fetching recommended courses');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, user?.email, initializeService]);

  // Get user certificates
  const getUserCertificates = useCallback(async (): Promise<Certificate[]> => {
    if (!sharePointService || !user?.email) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const certificates = await sharePointService.getUserCertificates(user.email);
      return certificates;
    } catch (err: any) {
      setError(err.message || 'Error fetching user certificates');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, user?.email, initializeService]);

  // Enroll user in course
  const enrollInCourse = useCallback(async (courseId: number): Promise<boolean> => {
    if (!sharePointService || !user?.email) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const success = await sharePointService.enrollUser(user.email, courseId);
      return success;
    } catch (err: any) {
      setError(err.message || 'Error enrolling in course');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, user?.email, initializeService]);

  // Update progress
  const updateProgress = useCallback(async (
    courseId: number, 
    moduleId: number | null, 
    progressData: Partial<UserProgress>
  ): Promise<boolean> => {
    if (!sharePointService || !user?.email) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const initialized = await initializeService();
      if (!initialized) {
        throw new Error('Could not initialize SharePoint service');
      }
      
      const success = await sharePointService.updateUserProgress(
        user.email, 
        courseId, 
        moduleId, 
        progressData
      );
      return success;
    } catch (err: any) {
      setError(err.message || 'Error updating progress');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [sharePointService, user?.email, initializeService]);

  return {
    // State
    isLoading,
    error,
    isReady: !!sharePointService,
    
    // Methods
    getCourses,
    getUserCourses,
    getUserStats,
    getRecommendedCourses,
    getUserCertificates,
    enrollInCourse,
    updateProgress,
    
    // Utility
    clearError: () => setError(null)
  };
};

export default useSharePointData;