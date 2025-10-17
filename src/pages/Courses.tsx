import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Button,
  Card,
  CardPreview,
  Body1,
  Body2,
  Subtitle1,
  Title2,
  Badge,
  Avatar,
  Input,
  Dropdown,
  Option,
  Field
} from '@fluentui/react-components';
import {
  Clock24Regular,
  Star24Filled,
  People24Regular,
  Search24Regular,
  Grid24Filled,
  List24Filled
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  coursesPage: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: `${tokens.spacingVerticalXL} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${tokens.spacingHorizontalXL}`,
  },
  headerContent: {
    textAlign: 'center',
  },
  pageTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
  },
  pageSubtitle: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '600px',
    margin: '0 auto',
  },
  filtersSection: {
    padding: `${tokens.spacingVerticalXL} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  filtersContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filtersLeft: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  filtersRight: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center',
  },
  searchField: {
    minWidth: '250px',
  },
  filterField: {
    minWidth: '150px',
  },
  viewToggle: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
  },
  tabsContainer: {
    marginBottom: tokens.spacingVerticalL,
  },
  coursesContent: {
    padding: `${tokens.spacingVerticalXL} 0`,
  },
  coursesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalL,
  },
  coursesCount: {
    color: tokens.colorNeutralForeground2,
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: tokens.spacingHorizontalXL,
  },
  coursesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  courseCard: {
    height: 'fit-content',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow8,
    },
  },
  courseCardList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingVerticalM,
  },
  courseImage: {
    height: '160px',
    background: `linear-gradient(45deg, ${tokens.colorPaletteBlueForeground2}, ${tokens.colorPaletteGreenForeground2})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    color: 'white',
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0`,
  },
  courseImageList: {
    width: '120px',
    height: '80px',
    minWidth: '120px',
    background: `linear-gradient(45deg, ${tokens.colorPaletteBlueForeground2}, ${tokens.colorPaletteGreenForeground2})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'white',
    borderRadius: tokens.borderRadiusMedium,
  },
  courseContent: {
    padding: tokens.spacingVerticalL,
  },
  courseContentList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
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
  courseFooterList: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: tokens.spacingVerticalS,
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
  courseActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
});

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  instructor: string;
  price: string;
  emoji: string;
  category: string;
}

const Courses: React.FC = () => {
  const styles = useStyles();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: 1,
      title: "React Development Mastery",
      description: "Learn React from basics to advanced concepts with hands-on projects and real-world applications",
      level: "Intermediate",
      duration: "12 hours",
      rating: 4.8,
      students: 2340,
      instructor: "Sarah Johnson",
      price: "$89",
      emoji: "⚛️",
      category: "development"
    },
    {
      id: 2,
      title: "Azure Cloud Fundamentals",
      description: "Master Azure services and cloud computing concepts for modern applications",
      level: "Beginner",
      duration: "8 hours",
      rating: 4.9,
      students: 1890,
      instructor: "Mike Chen",
      price: "$79",
      emoji: "☁️",
      category: "cloud"
    },
    {
      id: 3,
      title: "TypeScript for Professionals",
      description: "Advanced TypeScript patterns and best practices for enterprise development",
      level: "Advanced",
      duration: "15 hours",
      rating: 4.7,
      students: 1234,
      instructor: "Alex Rodriguez",
      price: "$99",
      emoji: "📘",
      category: "development"
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description: "Create beautiful and functional user interfaces with modern design principles",
      level: "Beginner",
      duration: "10 hours",
      rating: 4.6,
      students: 3456,
      instructor: "Emma Davis",
      price: "$75",
      emoji: "🎨",
      category: "design"
    },
    {
      id: 5,
      title: "Docker & Kubernetes",
      description: "Container orchestration and deployment strategies for scalable applications",
      level: "Intermediate",
      duration: "14 hours",
      rating: 4.8,
      students: 1567,
      instructor: "David Kim",
      price: "$110",
      emoji: "🐳",
      category: "devops"
    },
    {
      id: 6,
      title: "Machine Learning Basics",
      description: "Introduction to ML algorithms and practical applications with Python",
      level: "Intermediate",
      duration: "18 hours",
      rating: 4.5,
      students: 987,
      instructor: "Dr. Lisa Wang",
      price: "$120",
      emoji: "🤖",
      category: "data-science"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'development', label: 'Development' },
    { value: 'cloud', label: 'Cloud Computing' },
    { value: 'design', label: 'Design' },
    { value: 'devops', label: 'DevOps' },
    { value: 'data-science', label: 'Data Science' },
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const renderCourseCard = (course: Course, isListView: boolean = false) => {
    if (isListView) {
      return (
        <Card key={course.id} className={styles.courseCard}>
          <div className={styles.courseCardList}>
            <div className={styles.courseImageList}>
              {course.emoji}
            </div>
            <div className={styles.courseContentList}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Subtitle1 className={styles.courseTitle}>
                  {course.title}
                </Subtitle1>
                <Badge className={styles.courseBadge} appearance="filled">
                  {course.level}
                </Badge>
              </div>
              
              <Body2 className={styles.courseDescription}>
                {course.description}
              </Body2>
              
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
              
              <div className={styles.courseFooterList}>
                <div className={styles.courseInstructor}>
                  <Avatar name={course.instructor} size={24} />
                  <Body2>{course.instructor}</Body2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
                  <div className={styles.coursePrice}>{course.price}</div>
                  <Button appearance="primary" size="small">Enroll Now</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card key={course.id} className={styles.courseCard}>
        <CardPreview>
          <div className={styles.courseImage}>
            {course.emoji}
          </div>
        </CardPreview>
        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <Badge className={styles.courseBadge} appearance="filled">
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
              <Avatar name={course.instructor} size={32} />
              <Body1>{course.instructor}</Body1>
            </div>
            <div className={styles.coursePrice}>
              {course.price}
            </div>
          </div>
          
          <div className={styles.courseActions} style={{ marginTop: tokens.spacingVerticalM }}>
            <Button appearance="primary" style={{ flex: 1 }}>
              Enroll Now
            </Button>
            <Button appearance="outline">
              Preview
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className={styles.coursesPage}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <Title2 className={styles.pageTitle}>
              Explore Our Courses
            </Title2>
            <Body1 className={styles.pageSubtitle}>
              Discover a wide range of courses designed to help you master new skills and advance your career.
              From beginner-friendly tutorials to advanced professional training.
            </Body1>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersContainer}>
            <div className={styles.filtersLeft}>
              <Field className={styles.searchField}>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  contentBefore={<Search24Regular />}
                />
              </Field>
              
              <Field className={styles.filterField}>
                <Dropdown
                  value={categories.find(c => c.value === selectedCategory)?.label}
                  onOptionSelect={(_, data) => setSelectedCategory(data.optionValue || 'all')}
                >
                  {categories.map((category) => (
                    <Option key={category.value} value={category.value}>
                      {category.label}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
              
              <Field className={styles.filterField}>
                <Dropdown
                  value={levels.find(l => l.value === selectedLevel)?.label}
                  onOptionSelect={(_, data) => setSelectedLevel(data.optionValue || 'all')}
                >
                  {levels.map((level) => (
                    <Option key={level.value} value={level.value}>
                      {level.label}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            </div>
            
            <div className={styles.filtersRight}>
              <div className={styles.viewToggle}>
                <Button
                  appearance={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="small"
                  icon={<Grid24Filled />}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  appearance={viewMode === 'list' ? 'primary' : 'outline'}
                  size="small"
                  icon={<List24Filled />}
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Content */}
      <section className={styles.coursesContent}>
        <div className={styles.container}>
          <div className={styles.coursesHeader}>
            <Body1 className={styles.coursesCount}>
              Showing {filteredCourses.length} of {courses.length} courses
            </Body1>
          </div>
          
          {viewMode === 'grid' ? (
            <div className={styles.coursesGrid}>
              {filteredCourses.map(course => renderCourseCard(course, false))}
            </div>
          ) : (
            <div className={styles.coursesList}>
              {filteredCourses.map(course => renderCourseCard(course, true))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;