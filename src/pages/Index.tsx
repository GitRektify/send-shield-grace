
import React, { useState } from 'react';
import { Shield, Clock, Settings, BarChart3, User, Mail, Zap, Check, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import DelaySettings from '@/components/DelaySettings';
import UsageAnalytics from '@/components/UsageAnalytics';
import OutboxManager from '@/components/OutboxManager';
import InEmailPreview from '@/components/InEmailPreview';

const Index = () => {
  const [currentDelay, setCurrentDelay] = useState(60);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header */}
        <header className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/image.png" 
                    alt="Email Magic Logo" 
                    className="w-10 h-10 rounded-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Email Magic: SendShield</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Smart delay protection for Gmail</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-slate-600"
                  />
                  <Moon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Active
                </Badge>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
                    <p className="text-blue-100 dark:text-purple-100 text-lg">Your emails are protected with smart delay sending</p>
                    <div className="flex items-center mt-4 space-x-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-200 dark:text-purple-200" />
                        <span className="text-blue-100 dark:text-purple-100">{currentDelay}s delay active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-blue-200 dark:text-purple-200" />
                        <span className="text-blue-100 dark:text-purple-100">12 emails protected today</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger value="outbox" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Outbox</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <DelaySettings currentDelay={currentDelay} onDelayChange={setCurrentDelay} />
            </TabsContent>

            <TabsContent value="outbox">
              <OutboxManager />
            </TabsContent>

            <TabsContent value="analytics">
              <UsageAnalytics />
            </TabsContent>

            <TabsContent value="preview">
              <InEmailPreview currentDelay={currentDelay} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
