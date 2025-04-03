
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const NavBar: React.FC = () => {
  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-insight-600">Insight</span>
                <span className="text-2xl font-bold text-analysis-500">Growth</span>
                <span className="ml-1 text-lg text-gray-600 dark:text-gray-300">Compass</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <HelpCircle size={20} className="text-gray-600 dark:text-gray-300" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings size={20} className="text-gray-600 dark:text-gray-300" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-insight-100 text-insight-800">IG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Smith</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.smith@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Company Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
