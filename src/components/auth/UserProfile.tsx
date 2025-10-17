import React, { useState } from 'react';
import {
  Badge,
  Title3,
  Body1,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Avatar } from '../ui';
import { useAuth } from '../../contexts/AuthContext';
import { UserType, AuthProvider } from '../../config/authConfig';
import {
  ChevronDown24Regular,
  Person24Regular,
  SignOut24Regular,
  Shield24Regular,
  Building24Regular,
  People24Regular,
  Settings24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalXS,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusMedium,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 0,
  },
  userName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  },
  userType: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  menuHeader: {
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalS,
  },
  profileInfo: {
    flex: 1,
    minWidth: 0,
  },
  badgeContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalXS,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
});

interface UserProfileProps {
  compact?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ compact = false }) => {
  const styles = useStyles();
  const { user, logout, authProvider, switchProvider } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const handleSwitchProvider = (provider: AuthProvider) => {
    switchProvider(provider);
    setIsMenuOpen(false);
  };

  const getUserTypeDisplay = () => {
    switch (user.userType) {
      case UserType.HostTenant:
        return 'Organization';
      case UserType.B2CTenant:
        return 'Personal';
      default:
        return 'User';
    }
  };

  const getUserTypeIcon = () => {
    switch (user.userType) {
      case UserType.HostTenant:
        return <Building24Regular />;
      case UserType.B2CTenant:
        return <People24Regular />;
      default:
        return <Person24Regular />;
    }
  };

  const getUserTypeBadgeColor = () => {
    switch (user.userType) {
      case UserType.HostTenant:
        return 'brand';
      case UserType.B2CTenant:
        return 'success';
      default:
        return 'subtle';
    }
  };

  return (
    <Menu
      open={isMenuOpen}
      onOpenChange={(_, data) => setIsMenuOpen(data.open)}
    >
      <MenuTrigger>
        <button className={styles.userButton}>
          <Avatar 
            name={user.name} 
            size={compact ? 32 : 40} 
          />
          {!compact && (
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userType}>{getUserTypeDisplay()}</div>
            </div>
          )}
          <ChevronDown24Regular />
        </button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <div className={styles.menuHeader}>
            <div className={styles.profileCard}>
              <Avatar name={user.name} size={48} />
              <div className={styles.profileInfo}>
                <Title3>{user.name}</Title3>
                <Body1>{user.email}</Body1>
                <div className={styles.badgeContainer}>
                  <Badge 
                    color={getUserTypeBadgeColor() as any}
                    icon={getUserTypeIcon()}
                  >
                    {getUserTypeDisplay()}
                  </Badge>
                  {user.isAdmin && (
                    <Badge color="important" icon={<Shield24Regular />}>
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <MenuItem className={styles.menuItem}>
            <Person24Regular />
            <span>Profile Settings</span>
          </MenuItem>

          <MenuItem className={styles.menuItem}>
            <Settings24Regular />
            <span>Account Settings</span>
          </MenuItem>

          <MenuDivider />

          {authProvider !== AuthProvider.AzureAD && (
            <MenuItem 
              className={styles.menuItem}
              onClick={() => handleSwitchProvider(AuthProvider.AzureAD)}
            >
              <Building24Regular />
              <span>Switch to Organization Account</span>
            </MenuItem>
          )}

          {authProvider !== AuthProvider.AzureB2C && (
            <MenuItem 
              className={styles.menuItem}
              onClick={() => handleSwitchProvider(AuthProvider.AzureB2C)}
            >
              <People24Regular />
              <span>Switch to Personal Account</span>
            </MenuItem>
          )}

          <MenuDivider />

          <MenuItem 
            className={styles.menuItem}
            onClick={handleLogout}
          >
            <SignOut24Regular />
            <span>Sign Out</span>
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default UserProfile;
