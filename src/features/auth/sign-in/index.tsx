import '@radix-ui/react-icons'
import { useRouter } from '@tanstack/react-router'
import { FaUserTie, FaUserShield, FaCalculator } from 'react-icons/fa'
import { GiFarmTractor } from 'react-icons/gi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { AuthUser, useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

type Role = {
  name: string
  user: AuthUser
  icon: any
  description: string
}

const roles: Role[] = [
  {
    name: 'Admin',
    user: {
      accountNo: '0',
      email: 'admin@arma.com',
      role: ['admin'],
    } as AuthUser,
    icon: <MdAdminPanelSettings />,
    description: 'Full system access, user management, and settings control.',
  },
  {
    name: 'Director',
    icon: <FaUserTie />,
    user: {
      accountNo: '1',
      email: 'director@arma.com',
      role: ['admin', 'director', 'chairman', 'accounts'],
    } as AuthUser,
    description: 'Oversees operations and strategic decision-making.',
  },
  {
    name: 'Chairman',
    icon: <FaUserShield />,
    user: {
      accountNo: '2',
      email: 'chairman@arma.com',
      role: ['chairman', 'accounts'],
    } as AuthUser,
    description: 'Top-level oversight and final authority on major decisions.',
  },
  {
    name: 'Accounts',
    user: {
      accountNo: '3',
      email: 'accounts@arma.com',
      role: ['accounts'],
    } as AuthUser,
    icon: <FaCalculator />,

    description: 'Manages financial records, payments, and transactions.',
  },
  {
    name: 'Field Operator',
    icon: <GiFarmTractor />,
    user: {
      accountNo: '4',
      email: 'field@arma.com',
      role: ['field'],
    } as AuthUser,
    description:
      'Logs on-site data after each purchase and monitors field activity.',
  },
]

export default function SignIn() {
  const { auth } = useAuthStore()
  const router = useRouter()

  function handleLogin(role: Role) {
    auth.setUser(role.user)
    router.navigate({
      href: '/',
    })
  }
  return (
    <AuthLayout2>
      {roles.map((role) => (
        <Card
          onClick={() => handleLogin(role)}
          className='flex aspect-square h-60 w-60 cursor-pointer flex-col items-center justify-center hover:border-neutral-300 hover:bg-neutral-200'
        >
          <CardContent>
            <CardTitle className='text-lg tracking-tight'>
              <div className='flex items-center gap-2'>
                {role.icon}
                {role.name}
              </div>
            </CardTitle>
            <CardDescription>{role.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </AuthLayout2>
  )
}

interface Props {
  children: React.ReactNode
}

function AuthLayout2({ children }: Props) {
  return (
    <div className='bg-primary-foreground grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          <h1 className='text-xl font-medium'>ARMA Auth</h1>
        </div>
        <div className='flex justify-center gap-2'>{children}</div>
      </div>
    </div>
  )
}
