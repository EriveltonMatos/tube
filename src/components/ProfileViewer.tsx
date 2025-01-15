'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, LogOut } from 'lucide-react';

export default function ProfileSection() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!session) {
    return null;
  }

  const userName = session.user?.name || 'Usuário';
  const userEmail = session.user?.email || '';
  const userInitials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut({
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background shadow-xl">
      <CardContent className="md:pb-2 md:pt-0 pt-1">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="user-details">
            <div className="flex items-center space-x-4">
              <Avatar className="h-6 w-6 ">
                <AvatarImage src={session.user?.image || ''} />
                <AvatarFallback className="bg-primary/10 text-xs profile">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <AccordionTrigger className="hover:no-underline gap-4">
                  <div className="text-left">
                    <h2 className="profile md:text-sm text-foreground truncate">
                      {userName}
                    </h2>
                  </div>
                </AccordionTrigger>
              </div>
            </div>

            <AccordionContent>
              <div className="pt-4 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="profile md:text-xs">{userEmail}</span>
                </div>
                
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saindo...' : 'Sair'}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}