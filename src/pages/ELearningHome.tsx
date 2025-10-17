import React from 'react';
import { 
  makeStyles, 
  tokens, 
  Button,
  Card,
  CardPreview,
  Body1,
  Subtitle1,
  Title2,
  Display,
  Badge,
  Avatar,
  ProgressBar
} from '@fluentui/react-components';
import { 
  Play24Regular,
  Clock24Regular,
  Star24Filled,
  People24Regular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  eLearning: {
    minHeight: '100vh',
  },
  hero: {
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground2} 0%, ${tokens.colorBrandBackgroundPressed} 100%)`,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: `${tokens.spacingVerticalXXXL} 0`,
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalXXXL,
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '500px',
  },
  heroTitle: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.spacingVerticalXL,
    lineHeight: '1.2',
    color: tokens.colorNeutralForegroundOnBrand,
  },
  heroSubtitle: {
    fontSize: tokens.fontSizeBase300,
    marginBottom: tokens.spacingVerticalXL,
    opacity: '0.9',
    lineHeight: '1.6',
    color: tokens.colorNeutralForegroundOnBrand,
  },
  heroButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  heroStats: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL,
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightBold,
    display: 'block',
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    opacity: '0.8',
  },
  heroImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroPlaceholder: {
    width: '400px',
    height: '300px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: tokens.borderRadiusLarge,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
  },
  coursesSection: {
    padding: `${tokens.spacingVerticalXXXL} 0`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground1,
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  courseCard: {
    height: 'fit-content',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadow16,
    },
  },
  courseImage: {
    height: '180px',
    background: `linear-gradient(45deg, ${tokens.colorPaletteBlueForeground2}, ${tokens.colorPaletteGreenForeground2})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    color: 'white',
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0`,
  },
  courseContent: {
    padding: tokens.spacingVerticalL,
  },
  courseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacingVerticalS,
  },
  courseBadge: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground2,
  },
  courseTitle: {
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
  },
  courseDescription: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.5',
  },
  courseStats: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  courseStat: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },
  courseFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalM,
  },
  courseInstructor: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  coursePrice: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  progressSection: {
    padding: `${tokens.spacingVerticalXXXL} 0`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  progressGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  progressCard: {
    padding: tokens.spacingVerticalL,
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM,
  },
  progressPercentage: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
});

const ELearningHome: React.FC = () => {
  const styles = useStyles();

  const courses = [
    {
      id: 1,
      title: "React Development Mastery",
      description: "Learn React from basics to advanced concepts with hands-on projects",
      level: "Intermediate",
      duration: "12 hours",
      rating: 4.8,
      students: 2340,
      instructor: "Sarah Johnson",
      price: "$89",
      emoji: "⚛️",
      progress: 65
    },
    {
      id: 2,
      title: "Azure Cloud Fundamentals",
      description: "Master Azure services and cloud computing concepts",
      level: "Beginner",
      duration: "8 hours",
      rating: 4.9,
      students: 1890,
      instructor: "Mike Chen",
      price: "$79",
      emoji: "☁️",
      progress: 30
    },
    {
      id: 3,
      title: "TypeScript for Professionals",
      description: "Advanced TypeScript patterns and best practices",
      level: "Advanced",
      duration: "15 hours",
      rating: 4.7,
      students: 1234,
      instructor: "Alex Rodriguez",
      price: "$99",
      emoji: "📘",
      progress: 0
    }
  ];

  return (
    <div className={styles.eLearning}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Display className={styles.heroTitle}>
              Master New Skills with Expert-Led Courses
            </Display>
            <Body1 className={styles.heroSubtitle}>
              Join thousands of learners advancing their careers with our comprehensive online courses. 
              Learn at your own pace with interactive content and real-world projects.
            </Body1>
            <div className={styles.heroButtons}>
              <Button 
                appearance="primary" 
                size="large"
                icon={<Play24Regular />}
                iconPosition="after"
              >
                Start Learning
              </Button>
              <Button 
                appearance="outline" 
                size="large"
              >
                Browse Courses
              </Button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50K+</span>
                <span className={styles.statLabel}>Students</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>200+</span>
                <span className={styles.statLabel}>Courses</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>Success Rate</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroPlaceholder}>
              🎓
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className={styles.coursesSection}>
        <div className={styles.container}>
          <Title2 className={styles.sectionTitle}>Featured Courses</Title2>
          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <Card key={course.id} className={styles.courseCard}>
                <CardPreview>
                  <div className={styles.courseImage}>
                    {course.emoji}
                  </div>
                </CardPreview>
                <div className={styles.courseContent}>
                  <div className={styles.courseHeader}>
                    <Badge 
                      className={styles.courseBadge}
                      appearance="filled"
                    >
                      {course.level}
                    </Badge>
                  </div>
                  
                  <Subtitle1 className={styles.courseTitle}>
                    {course.title}
                  </Subtitle1>
                  
                  <Body1 className={styles.courseDescription}>
                    {course.description}
                  </Body1>
                  
                  <div className={styles.courseStats}>
                    <div className={styles.courseStat}>
                      <Clock24Regular />
                      <span>{course.duration}</span>
                    </div>
                    <div className={styles.courseStat}>
                      <Star24Filled />
                      <span>{course.rating}</span>
                    </div>
                    <div className={styles.courseStat}>
                      <People24Regular />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  
                  <div className={styles.courseFooter}>
                    <div className={styles.courseInstructor}>
                      <Avatar 
                        name={course.instructor}
                        size={32}
                      />
                      <Body1>{course.instructor}</Body1>
                    </div>
                    <div className={styles.coursePrice}>
                      {course.price}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Progress */}
      <section className={styles.progressSection}>
        <div className={styles.container}>
          <Title2 className={styles.sectionTitle}>Your Learning Progress</Title2>
          <div className={styles.progressGrid}>
            {courses.map((course) => (
              <Card key={`progress-${course.id}`} className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <Subtitle1>{course.title}</Subtitle1>
                  <span className={styles.progressPercentage}>
                    {course.progress}%
                  </span>
                </div>
                <ProgressBar 
                  value={course.progress / 100}
                  thickness="medium"
                />
                <Body1 style={{ marginTop: tokens.spacingVerticalS, color: tokens.colorNeutralForeground2 }}>
                  {course.progress > 0 ? `${course.progress}% completed` : 'Not started'}
                </Body1>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ELearningHome;