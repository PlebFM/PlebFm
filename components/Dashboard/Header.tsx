import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import plebFMLogo from '../../public/plebfm-logo-bold.svg';
import { useRouter } from 'next/router';

interface HeaderProps {
  hostName: string;
  shortName: string;
  hide?: boolean;
}

export function Header({ hostName, shortName, hide }: HeaderProps) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      {/* Top row: Logo and user actions */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 flex items-center h-16 justify-between">
            <div className="flex-shrink-0">
              <Link href="/host/dashboard">
                <Image
                  src={plebFMLogo}
                  alt="PlebFM"
                  className="h-8 w-auto hover:opacity-80 transition-opacity"
                  width={120}
                />
              </Link>
            </div>
            <div className="flex items-center overflow-x-scroll mx-4 px-4 hide-scrollbar">
              <div className="flex items-center space-x-2 min-w-max">
                <Link
                  href="/host/plans"
                  className="text-xs bg-white/5 hover:bg-white/10 text-white/70 px-2 py-1.5 rounded-full transition-colors whitespace-nowrap inline-flex items-center gap-1"
                  target="_blank"
                >
                  <span className="hidden sm:inline">View </span>Plans
                </Link>
                <div className="w-px h-4 bg-white/10" />
                <Link
                  href="/host/queue"
                  className="text-xs bg-white/5 hover:bg-white/10 text-white/70 px-2 py-1.5 rounded-full transition-colors whitespace-nowrap inline-flex items-center gap-1"
                  target="_blank"
                >
                  <span className="hidden sm:inline">View </span>Leaderboard
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </Link>
                <div className="w-px h-4 bg-white/10" />
                <Link
                  href={`/${shortName}`}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white/70 px-2 py-1.5 rounded-full transition-colors whitespace-nowrap inline-flex items-center gap-1"
                  target="_blank"
                >
                  <span className="hidden sm:inline">View </span>Public Page
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </Link>
              </div>
              <div className="flex-shrink-0 flex items-center space-x-2">
                <div className="w-px h-4 bg-white/10" />
                <div className="hidden md:block text-sm text-white/50 px-2">
                  {hostName}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm text-white/50 hover:text-white/70 transition-colors whitespace-nowrap px-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: Navigation - Sticky */}
      {!hide && (
        <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="px-4 flex overflow-x-auto hide-scrollbar">
              <div className="flex space-x-1">
                <Link
                  href="/host/dashboard"
                  className={`${
                    currentPath === '/host/dashboard'
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/70 hover:text-white hover:border-b-2 hover:border-white/50'
                  } px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/host/analytics"
                  className={`${
                    currentPath === '/host/analytics'
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/70 hover:text-white hover:border-b-2 hover:border-white/50'
                  } px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors`}
                >
                  Analytics
                </Link>
                <Link
                  href="/host/settings"
                  className={`${
                    currentPath === '/host/settings'
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/70 hover:text-white hover:border-b-2 hover:border-white/50'
                  } px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors`}
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
