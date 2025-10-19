import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  Divider
} from '@fluentui/react-components';
import { 
  PersonRegular, 
  BookRegular, 
  CertificateRegular,
  ClockRegular,
  StarRegular,
  TrophyRegular
} from '@fluentui/react-icons';
import './MyProfile.css';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  completedDate?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  rating?: number;
}

interface UserStats {
  coursesCompleted: number;
  coursesInProgress: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  currentStreak: number;
}

const MyProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    }
  }, [isAuthenticated, user]);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls - replace with actual API calls
      await Promise.all([
        loadUserCourses(),
        loadRecommendedCourses(),
        loadUserStats()
      ]);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserCourses = async () => {
    // Mock data - replace with actual API call
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Microsoft 365 Fundamentals',
        description: 'Learn the basics of Microsoft 365 suite',
        progress: 100,
        status: 'completed',
        completedDate: '2025-10-15',
        category: 'Microsoft 365',
        difficulty: 'Beginner',
        estimatedHours: 8,
        rating: 5
      },
      {
        id: '2',
        title: 'SharePoint Advanced Features',
        description: 'Master advanced SharePoint capabilities',
        progress: 65,
        status: 'in-progress',
        category: 'SharePoint',
        difficulty: 'Advanced',
        estimatedHours: 12
      },
      {
        id: '3',
        title: 'Power Platform Basics',
        description: 'Introduction to Power Apps, Power Automate, and Power BI',
        progress: 0,
        status: 'not-started',
        category: 'Power Platform',
        difficulty: 'Intermediate',
        estimatedHours: 10
      }
    ];
    setUserCourses(mockCourses);
  };

  const loadRecommendedCourses = async () => {
    // Mock data - replace with actual API call
    const mockRecommended: Course[] = [
      {
        id: '4',
        title: 'Teams Administration',
        description: 'Learn to manage Microsoft Teams environments',
        progress: 0,
        status: 'not-started',
        category: 'Microsoft Teams',
        difficulty: 'Intermediate',
        estimatedHours: 15
      },
      {
        id: '5',
        title: 'Azure Active Directory Basics',
        description: 'Understanding identity and access management',
        progress: 0,
        status: 'not-started',
        category: 'Azure',
        difficulty: 'Intermediate',
        estimatedHours: 8
      }
    ];
    setRecommendedCourses(mockRecommended);
  };

  const loadUserStats = async () => {
    // Mock data - replace with actual API call
    const mockStats: UserStats = {
      coursesCompleted: 5,
      coursesInProgress: 2,
      totalHoursLearned: 47,
      certificatesEarned: 3,
      currentStreak: 7
    };
    setUserStats(mockStats);
  };

  const getCourseStatusBadge = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return <Badge color="success" icon={<CertificateRegular />}>Completed</Badge>;
      case 'in-progress':
        return <Badge color="warning" icon={<ClockRegular />}>In Progress</Badge>;
      case 'not-started':
        return <Badge color="subtle" icon={<BookRegular />}>Not Started</Badge>;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'subtle';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="profile-container">
        <Text size={500}>Please sign in to view your profile.</Text>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="profile-container loading">
        <Spinner size="large" label="Loading your profile..." />
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
          {userCourses.map((course) => (
            <Card key={course.id} className="course-card">
              <CardHeader
                header={<Text weight="bold">{course.title}</Text>}
                description={course.description}
                action={getCourseStatusBadge(course.status)}
              />
              <CardPreview className="course-details">
                <div className="course-meta">
                  <Badge color={getDifficultyColor(course.difficulty)} size="small">
                    {course.difficulty}
                  </Badge>
                  <Text size={200}>{course.estimatedHours}h</Text>
                  <Text size={200}>{course.category}</Text>
                </div>
                {course.progress > 0 && (
                  <div className="progress-section">
                    <Text size={200}>Progress: {course.progress}%</Text>
                    <ProgressBar value={course.progress / 100} />
                  </div>
                )}
                {course.rating && (
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <StarRegular
                        key={i}
                        className={i < course.rating! ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                  </div>
                )}
              </CardPreview>
              <CardFooter>
                <Button appearance="primary" size="small">
                  {course.status === 'completed' ? 'Review' : 'Continue'}
                </Button>
                {course.completedDate && (
                  <Text size={200}>Completed: {course.completedDate}</Text>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      {/* Recommended Courses */}
      <div className="section">
        <Text size={500} weight="bold" className="section-title">Recommended for You</Text>
        <div className="courses-grid">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="course-card recommended">
              <CardHeader
                header={<Text weight="bold">{course.title}</Text>}
                description={course.description}
              />
              <CardPreview className="course-details">
                <div className="course-meta">
                  <Badge color={getDifficultyColor(course.difficulty)} size="small">
                    {course.difficulty}
                  </Badge>
                  <Text size={200}>{course.estimatedHours}h</Text>
                  <Text size={200}>{course.category}</Text>
                </div>
              </CardPreview>
              <CardFooter>
                <Button appearance="primary" size="small">
                  Start Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;