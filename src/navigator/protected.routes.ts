import { Culture } from '@/pages/Culture';
import { Settings } from '@/pages/Settings';
import { CandidateJob } from '@/pages/CandidateJob';
import { CandidateProfile } from '@/pages/CandidateProfile';
import { JobDetails, Jobs } from '@/pages/Jobs';
import { RouteObject } from 'react-router-dom';
import { CreateJob } from '@/pages/CreateJob';
import { Home } from '@/pages/Home';
import { RoutePointer } from './router.helper';
import { UserRole } from '@/services/User/type';

export const protectedRoutes: RouteObject[] = [
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/culture',
    Component: Culture,
  },
  {
    path: '/settings',
    Component: () =>
      RoutePointer([
        { role: UserRole.COMPANY, Component: Settings },
        { role: UserRole.CANDIDATE, Component: CandidateProfile },
        { role: UserRole.STUDENT, Component: CandidateProfile },
      ]),
  },
  {
    path: '/jobs',
    children: [
      {
        index: true,
        Component: Jobs,
      },
      {
        path: 'create',
        Component: () => RoutePointer([{ role: UserRole.COMPANY, Component: CreateJob }]),
      },
      {
        path: 'post/:id',
        Component: () =>
          RoutePointer([
            { role: UserRole.COMPANY, Component: JobDetails },
            { role: UserRole.CANDIDATE, Component: CandidateJob },
            { role: UserRole.STUDENT, Component: CandidateJob },
          ]),
      },
    ],
  },
];
