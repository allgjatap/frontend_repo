import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  User,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { SidebarTab } from '@/components/Layout/SidebarTab';
import { useGetMe } from '@/services/Auth';
import { storage } from '@/utils/storage';
import { Sidebar } from '@/components/Layout/Sidebar';
import Logo from '@/assets/icons/Logo.svg';
import PlatformName from '@/assets/icons/PlatformName.svg';
import { Briefcase, CreditCard, Envelope, GraduationCap, Network } from '@phosphor-icons/react';
import { getFullName } from '@/utils/getFullName';
import { UserRole } from "@/services/User/type";
import { useCompanyRole } from "@/services/Company";
import { CompanyRole } from "@/services/Company/type";

export const MainLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { data: user } = useGetMe();
  const { data } = useCompanyRole();
  const { data: companyUser } = data || {};
  const [activeTab, setActiveTab] = useState('');

  if (!user.hasCompletedOnboarding) {
    return <Navigate to='/onboarding' />;
  }

  useEffect(() => {
    const path = location.pathname;

    switch (true) {
      case path === '/':
        setActiveTab('Network');
        break;
      case path.startsWith('/culture'):
        setActiveTab('Culture Fit');
        break;
      case path.startsWith('/settings'):
        setActiveTab('Company Settings');
        break;
      case path.startsWith('/todo'):
        setActiveTab('To Do');
        break;
      case path.startsWith('/messages'):
        setActiveTab('Messages');
        break;
      case path.startsWith('/jobs'):
        setActiveTab('Jobs');
        break;
      case path.startsWith('/visa'):
        setActiveTab('Visa');
        break;

      default:
        setActiveTab('');
    }
  }, [location.pathname]);

  const logout = () => {
    storage.removeItem('accessToken');
    queryClient.removeQueries();
    navigate('/login');
  };

  const DropdownUser = () => {
    return (
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <div className='bordered'>
            <User
              name={getFullName(user)}
              description={user.username}
              avatarProps={{
                src: user.profile,
              }}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions' className='flex gap-1 rounded-md p-2 text-center'>
          <DropdownItem key='settings' onClick={() => navigate('/settings')}>
            Settings
          </DropdownItem>
          <DropdownItem key='Logout' className='text-red cursor-pointer' color='danger' onClick={logout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };
  const sidebar = useMemo(() => {
   if (user.role === UserRole.COMPANY && companyUser?.role === CompanyRole.CEO) {
      return [
        { title: 'My Network', path: '/', icon: Network, isDisabled: true },
        { title: 'Messages', path: '/messages', icon: Envelope, isDisabled: true },
        {
          title: 'Jobs',
          path: '/jobs',
          icon: Briefcase,
          isDisabled: false,
          children: [
            { title: 'Add New Job', path: '/jobs/create' },
            { title: 'Job Post', path: '/jobs' },
          ],
        },
        { title: 'Visa', path: '/visa', icon: CreditCard, isDisabled: true },
        { title: 'Culture Fit', path: '/culture', icon: GraduationCap },
      ];
   }

   else if (user.role === UserRole.COMPANY && companyUser?.role === CompanyRole.HUMAN_RESOURCES ) {
      return [
        { title: 'My Network', path: '/', icon: Network, isDisabled: true },
        { title: 'Messages', path: '/messages', icon: Envelope, isDisabled: true },
        {
          title: 'Jobs',
          path: '/jobs',
          icon: Briefcase,
          isDisabled: false,
          children: [
            { title: 'Add New Job', path: '/jobs/create' },
            { title: 'Job Post', path: '/jobs' },
          ],
        },
        { title: 'Visa', path: '/visa', icon: CreditCard, isDisabled: true },
        { title: 'Culture Fit', path: '/culture', icon: GraduationCap },
      ];
    } else if (user.role === UserRole.CANDIDATE || companyUser?.role === CompanyRole.TECHNICAL_LEAD) {
      return [
        { title: 'My Network', path: '/', icon: Network, isDisabled: true },
        { title: 'Messages', path: '/messages', icon: Envelope, isDisabled: true },
        { title: 'Visa', path: '/visa', icon: CreditCard, isDisabled: true },
        { title: 'Culture Fit', path: '/culture', icon: GraduationCap },
        { title: 'Jobs', path: '/jobs', icon: Briefcase, isDisabled: false },
      ];
    } else if (user.role === UserRole.STUDENT) {
      return [
        { title: 'My Network', path: '/', icon: Network, isDisabled: true },
        { title: 'Messages', path: '/messages', icon: Envelope, isDisabled: true },
        { title: 'Culture Fit', path: '/culture', icon: GraduationCap },
        { title: 'Jobs', path: '/jobs', icon: Briefcase, isDisabled: false },
      ]
    }
  
    return []; // Default value if none of the conditions match
  }, [user.role, companyUser?.role]);
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='flex h-screen w-full max-w-[295px] flex-col overflow-auto border-r-1 border-[#F2EAFA] bg-white'>
        <Sidebar className='gap-8'>
          <div className='flex items-center gap-2'>
            <Image src={Logo} />
            <Image src={PlatformName} className='rounded-none' />
          </div>
          
             {sidebar.map((items) => ( 
              <SidebarTab
                key={items.title}
                title={items.title}
                path={items.path}
                icon={items.icon}
                isDisabled={items.isDisabled}
                         
              >
                {items.children?.map((item) => (
                  <SidebarTab key={item.title} title={item.title} path={item.path} />
                ))}                                   
              </SidebarTab>
            ))}
 
          
        </Sidebar>
      </div>

      <div className='flex h-screen flex-1 flex-col overflow-hidden'>
        <Navbar maxWidth='full' className='max-h-[88px] border-b'>
          <NavbarBrand>
            <p className='text-xl font-semibold text-[#091E42]'>{activeTab}</p>
          </NavbarBrand>
          <NavbarContent justify='end'>
            <DropdownUser />
          </NavbarContent>
        </Navbar>

        <div className='flex-1 flex-col overflow-y-auto overflow-x-hidden bg-slate-50'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
