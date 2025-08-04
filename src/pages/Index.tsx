import React, { useState, useEffect } from 'react';
import { Shield, Clock, Settings, BarChart3, User, Mail, Zap, Check, ArrowRight, Sun, Moon, LogOut, Crown, LogIn, UserPlus, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DelaySettings from '@/components/DelaySettings';
import UsageAnalytics from '@/components/UsageAnalytics';
import OutboxManager from '@/components/OutboxManager';
import InEmailPreview from '@/components/InEmailPreview';

const Index = () => {
  const [currentDelay, setCurrentDelay] = useState(60);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDelayEnabled, setIsDelayEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');
  
  // Virtual authentication state
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Mock user data for when signed in
  const mockUser = {
    email: "user@example.com",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
  };

  // Load ALL state from localStorage on component mount
  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    // Load delay enabled state
    const savedDelayEnabled = localStorage.getItem('delayEnabled');
    if (savedDelayEnabled !== null) {
      setIsDelayEnabled(savedDelayEnabled === 'true');
    }

    // Load delay duration
    const savedDelayDuration = localStorage.getItem('delayDuration');
    if (savedDelayDuration !== null) {
      const duration = parseInt(savedDelayDuration, 10);
      if (!isNaN(duration)) {
        setCurrentDelay(duration);
      }
    }

    // Load active tab
    const savedActiveTab = localStorage.getItem('activeTab');
    if (savedActiveTab !== null) {
      setActiveTab(savedActiveTab);
    }

    // Load sign in state
    const savedSignInState = localStorage.getItem('isSignedIn');
    if (savedSignInState !== null) {
      setIsSignedIn(savedSignInState === 'true');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    // Apply to document
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDelayEnabledChange = (enabled: boolean) => {
    setIsDelayEnabled(enabled);
    localStorage.setItem('delayEnabled', enabled.toString());
  };

  const handleDelayChange = (delay: number) => {
    setCurrentDelay(delay);
    localStorage.setItem('delayDuration', delay.toString());
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('activeTab', value);
  };

  const handleSignIn = async () => {
    setLoadingText('Signing in...');
    setIsLoading(true);
    setShowAuthModal(false);
    
    // Simulate Chrome identity API call
    try {
      // await chrome.identity.launchWebAuthFlow(...)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading
      
      setIsSignedIn(true);
      localStorage.setItem('isSignedIn', 'true');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.setItem('isSignedIn', 'false');
    setShowAuthModal(false);
  };

  const handleUpgrade = () => {
    // Here you would send the license key to your server
    console.log('Upgrading with license:', licenseKey);
    setShowUpgradeModal(false);
    setLicenseKey('');
  };

  const openUpgradeModal = () => {
    setShowAuthModal(false);
    setShowUpgradeModal(true);
  };

  const formatDelay = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`.replace(' 0s', '');
  };

  return (
    <div className={`min-h-screen min-w-[360px] transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* <div className="relative"> */}
                  <img
                    src="/images/email-magic-logo.png"
                    alt="Email Magic Logo"
                    className="w-12 h-8 object-contain"
                  />
                {/* </div> */}
                <div>
                  <h1 className="text-md font-semibold text-slate-900 dark:text-white">Delay Send</h1>
                  {/* <p className="text-sm text-slate-500 dark:text-slate-400">Smart delay protection for Gmail</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600" />
                  )}
                </Button>
                <Badge
                  variant="secondary"
                  className={`${
                    isDelayEnabled
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/30'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    isDelayEnabled ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></div>
                  {isDelayEnabled ? 'Active' : 'Inactive'}
                </Badge>
                {isSignedIn ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAuthModal(true)}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {mockUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAuthModal(true)}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          {/* <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
                    <p className="text-blue-100 text-lg">Your emails are protected with smart delay sending</p>
                    <div className="flex items-center mt-4 space-x-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-200" />
                        <span className="text-blue-100">{currentDelay}s delay active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-blue-200" />
                        <span className="text-blue-100">12 emails protected today</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-slate-700">
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white text-slate-600 dark:text-slate-400"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
              {/* <TabsTrigger
                value="outbox"
                className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white text-slate-600 dark:text-slate-400"
              >
                <Mail className="w-4 h-4" />
                <span>Outbox</span>
              </TabsTrigger> */}
              <TabsTrigger
                value="analytics"
                className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white text-slate-600 dark:text-slate-400"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              {/* <TabsTrigger
                value="preview"
                className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white text-slate-600 dark:text-slate-400"
              >
                <Zap className="w-4 h-4" />
                <span>Preview</span>
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="settings">
              <DelaySettings
                currentDelay={currentDelay}
                onDelayChange={handleDelayChange}
                onEnabledChange={handleDelayEnabledChange}
              />
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

        {/* Authentication Modal */}
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-[420px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                {isSignedIn ? 'Account' : 'Welcome'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 pt-4">
              {isSignedIn ? (
                // Signed In State
                <>
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {mockUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{mockUser.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{mockUser.email}</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-slate-200 dark:bg-slate-700" />
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg font-medium"
                      size="lg"
                      onClick={openUpgradeModal}
                    >
                      <Crown className="w-5 h-5 mr-3" />
                      Upgrade to Pro
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      size="lg"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                // Signed Out State
                <>
                  <div className="text-center space-y-2">
                    <p className="text-slate-600 dark:text-slate-400">
                      Sign in to sync your settings and access premium features
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg font-medium"
                      size="lg"
                      onClick={handleSignIn}
                    >
                      <LogIn className="w-5 h-5 mr-3" />
                      Sign In
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      size="lg"
                      onClick={handleSignIn}
                    >
                      <UserPlus className="w-5 h-5 mr-3" />
                      Create Account
                    </Button>
                    
                    <Separator className="bg-slate-200 dark:bg-slate-700" />
                    
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg font-medium"
                      size="lg"
                      onClick={openUpgradeModal}
                    >
                      <Crown className="w-5 h-5 mr-3" />
                      Upgrade to Pro
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Upgrade Modal */}
        <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
          <DialogContent className="sm:max-w-[420px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
                <Crown className="w-6 h-6 mr-3 text-amber-500" />
                Upgrade to Pro
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-2">
                <p className="text-slate-600 dark:text-slate-400">
                  Enter your license key to unlock premium features
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="license" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    License Key
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="license"
                      type="text"
                      placeholder="Enter your license key"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="pl-10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <Button 
                    onClick={handleUpgrade}
                    disabled={!licenseKey.trim()}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-300 disabled:to-slate-400 text-white border-0 shadow-lg font-medium"
                    size="lg"
                  >
                    <Crown className="w-5 h-5 mr-3" />
                    Activate License
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Loading Modal */}
        <Dialog open={isLoading} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center">
            <div className="space-y-4 py-6">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {loadingText}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
