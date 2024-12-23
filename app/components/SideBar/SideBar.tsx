'use client';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser, FaCog, FaSignOutAlt, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBell } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import styles from './sideBar.module.css';


interface SideBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export default function SideBar({ collapsed, setCollapsed }: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      };
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setCollapsed]);

  return (
    <Sidebar collapsed={collapsed} className={`min-h-screen shadow-lg ${styles.sideBarContainer}`}>
      <div className='flex justify-center my-2'>
        {collapsed ? (
          <FaArrowAltCircleRight className='cursor-pointer' size={30} onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <FaArrowAltCircleLeft className='cursor-pointer' onClick={() => setCollapsed(!collapsed)} size={30} />
        )}
      </div>
      <Menu>
        <MenuItem
          icon={<FaUser />}
          onClick={() => router.push('/dashboard/profile')}
          className={isActive('/dashboard/profile') ? `${styles.activeMenuItem}` : ''}
        >
          Profile
        </MenuItem>

        <MenuItem
          icon={<FaBell />}
          onClick={() => router.push('/dashboard/notifications')}
          className={isActive('/dashboard/notifications') ? `${styles.activeMenuItem}` : ''}
        >
          Notifications
        </MenuItem>

        <MenuItem
          icon={<FaSignOutAlt />}
          onClick={() => router.push('/dashboard/requests')}
          className={isActive('/dashboard/requests') ? `${styles.activeMenuItem}` : ''}
        >
          Requests
        </MenuItem>

        <SubMenu
          className={isActive('/dashboard/settings') ? `${styles.activeMenuItem}` : ''}
          label="Settings"
          icon={<FaCog />}
        >
          <MenuItem
            onClick={() => router.push('/dashboard/settings/school-details')}
            className={isActive('/dashboard/settings/school-details') ? `${styles.activeMenuItem}` : ''}
          >
            Profile Details
          </MenuItem> 
          <MenuItem
            onClick={() => router.push('/dashboard/settings/school-settings')}
            className={isActive('/dashboard/settings/school-settings') ? `${styles.activeMenuItem}` : ''}
          >
            Profile Settings
          </MenuItem>
        </SubMenu>

      </Menu>
    </Sidebar>
  );
}
