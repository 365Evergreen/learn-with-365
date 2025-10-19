import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useSharePointData, { UserCourseData } from '../hooks/useSharePointData';
import { SharePointCourse } from '../services/SharePointService';
import { 
  Card, 
  CardHeader, 
  CardPreview, 
  CardFooter,
  Text,
  Badge,
  Button,
  Spinner,
  Avatar,
  ProgressBar,
  Divider,
  MessageBar,
  MessageBarType
} from '@fluentui/react-components';
import { 
  PersonRegular, 
  BookRegular, 
  CertificateRegular,
  ClockRegular,
  StarRegular,
  TrophyRegular,
  ErrorCircleRegular,
  RefreshRegular
} from '@fluentui/react-icons';
import './MyProfile.css';

const MyProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    getUserCourses,
    getUserStats,
    getRecommendedCourses,
    enrollInCourse,
    isLoading: sharepointLoading,
    error: sharepointError,
    clearError,
    isReady
  } = useSharePointData();

  const [userCourses, setUserCourses] = useState<UserCourseData[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<SharePointCourse[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = async () => {
    if (!isReady || !isAuthenticated || !user) return;
    
    setIsLoading(true);
    clearError();
    
    try {
      const [courses, stats, recommended] = await Promise.all([
        getUserCourses(),
        getUserStats(),
        getRecommendedCourses(5)
      ]);
      
      setUserCourses(courses);
      setUserStats(stats);
      setRecommendedCourses(recommended);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [isAuthenticated, user, isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEnrollInCourse = async (courseId: number) => {
    const success = await enrollInCourse(courseId);
    if (success) {
      // Reload data to show new enrollment
      loadUserData();
    }
  };

  const getCourseStatusBadge = (progress: any) => {
    if (!progress) {
      return <Badge color="subtle" icon={<BookRegular />}>Not Started</Badge>;
    }
    
    switch (progress.Status) {
      case 'Completed':
        return <Badge color="success" icon={<CertificateRegular />}>Completed</Badge>;
      case 'In Progress':
        return <Badge color="warning" icon={<ClockRegular />}>In Progress</Badge>;
      case 'Not Started':
      default:
        return <Badge color="subtle" icon={<BookRegular />}>Not Started</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'subtle';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <Text size={500}>Please sign in to view your profile.</Text>
      </div>
    );
  }

  if (isLoading || sharepointLoading) {
    return (
      <div className="profile-container loading">
        <Spinner size="large" label="Loading your profile..." />
      </div>
    );
  }

  if (sharepointError) {
    return (
      <div className="profile-container">
        <MessageBar intent="error" shape="square">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ErrorCircleRegular />
            <Text>Error loading profile data: {sharepointError}</Text>
            <Button 
              size="small" 
              icon={<RefreshRegular />}
              onClick={() => {
                clearError();
                loadUserData();
              }}
            >
              Retry
            </Button>
          </div>
        </MessageBar>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* User Header */}
      <Card className="profile-header">
        <CardHeader
          image={
            <Avatar
              name={user?.name}
              size={72}
              color="colorful"
            />
          }
          header={
            <div>
              <Text size={600} weight="bold">{user?.name}</Text>
              <Text size={300} className="user-email">{user?.email}</Text>
              <Text size={200} className="user-type">
                {user?.userType === 'host' ? 'Organization Member' : 'External User'}
              </Text>
            </div>
          }
        />
      </Card>

      {/* Stats Overview */}
      {userStats && (
        <div className="stats-grid">
          <Card className="stat-card">
            <CardHeader
              image={<TrophyRegular className="stat-icon completed" />}
              header={<Text size={400} weight="bold">{userStats.coursesCompleted}</Text>}
              description={<Text size={200}>Courses Completed</Text>}
            />
          </Card>
          <Card className="stat-card">
            <CardHeader
              image={<ClockRegular className="stat-icon progress" />}
              header={<Text size={400} weight="bold">{userStats.coursesInProgress}</Text>}
              description={<Text size={200}>In Progress</Text>}
            />
          </Card>
          <Card className="stat-card">
            <CardHeader
              image={<BookRegular className="stat-icon hours" />}
              header={<Text size={400} weight="bold">{userStats.totalHoursLearned}</Text>}
              description={<Text size={200}>Hours Learned</Text>}
            />
          </Card>
          <Card className="stat-card">
            <CardHeader
              image={<CertificateRegular className="stat-icon certificates" />}
              header={<Text size={400} weight="bold">{userStats.certificatesEarned}</Text>}
              description={<Text size={200}>Certificates</Text>}
            />
          </Card>
        </div>
      )}

      {/* My Courses */}
      <div className="section">
        <Text size={500} weight="bold" className="section-title">My Courses</Text>
        <div className="courses-grid">
          {userCourses.map((userCourse) => (
            <Card key={userCourse.course.Id} className="course-card">
              <CardHeader
                header={<Text weight="bold">{userCourse.course.Title}</Text>}
                description={userCourse.course.Description}
                action={getCourseStatusBadge(userCourse.progress)}
              />
              <CardPreview className="course-details">
                <div className="course-meta">
                  <Badge color={getDifficultyColor(userCourse.course.Difficulty)} size="small">
                    {userCourse.course.Difficulty}
                  </Badge>
                  <Text size={200}>{userCourse.course.EstimatedHours}h</Text>
                  <Text size={200}>{userCourse.course.Category}</Text>
                </div>
                {userCourse.progress && userCourse.progress.ProgressPercentage > 0 && (
                  <div className="progress-section">
                    <Text size={200}>Progress: {userCourse.progress.ProgressPercentage}%</Text>
                    <ProgressBar value={userCourse.progress.ProgressPercentage / 100} />
                  </div>
                )}
                {userCourse.progress?.TimeSpent && (
                  <Text size={200}>Time spent: {Math.floor(userCourse.progress.TimeSpent / 60)}h {userCourse.progress.TimeSpent % 60}m</Text>
                )}
              </CardPreview>
              <CardFooter>
                <Button appearance="primary" size="small">
                  {userCourse.progress?.Status === 'Completed' ? 'Review' : 'Continue'}
                </Button>
                {userCourse.progress?.CompletedDate && (
                  <Text size={200}>Completed: {formatDate(userCourse.progress.CompletedDate)}</Text>
                )}
              </CardFooter>
            </Card>
          ))}
          {userCourses.length === 0 && (
            <div className="no-courses">
              <Text size={400}>No enrolled courses yet. Check out the recommended courses below!</Text>
            </div>
          )}
        </div>
      </div>

      <Divider />

      {/* Recommended Courses */}
      <div className="section">
        <Text size={500} weight="bold" className="section-title">Recommended for You</Text>
        <div className="courses-grid">
          {recommendedCourses.map((course) => (
            <Card key={course.Id} className="course-card recommended">
              <CardHeader
                header={<Text weight="bold">{course.Title}</Text>}
                description={course.Description}
              />
              <CardPreview className="course-details">
                <div className="course-meta">
                  <Badge color={getDifficultyColor(course.Difficulty)} size="small">
                    {course.Difficulty}
                  </Badge>
                  <Text size={200}>{course.EstimatedHours}h</Text>
                  <Text size={200}>{course.Category}</Text>
                </div>
              </CardPreview>
              <CardFooter>
                <Button 
                  appearance="primary" 
                  size="small"
                  onClick={() => handleEnrollInCourse(course.Id)}
                >
                  Start Course
                </Button>
              </CardFooter>
            </Card>
          ))}
          {recommendedCourses.length === 0 && (
            <div className="no-courses">
              <Text size={400}>No recommendations available at this time.</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;