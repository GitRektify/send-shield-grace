
import React, { useState } from 'react';
import { Clock, Shield, Zap, Check, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface DelaySettingsProps {
  currentDelay: number;
  onDelayChange: (delay: number) => void;
}

const DelaySettings: React.FC<DelaySettingsProps> = ({ currentDelay, onDelayChange }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presetDelays = [
    { value: 15, label: '15 seconds', description: 'Quick review' },
    { value: 30, label: '30 seconds', description: 'Standard protection' },
    { value: 60, label: '1 minute', description: 'Recommended' },
    { value: 120, label: '2 minutes', description: 'Extra careful' },
    { value: 300, label: '5 minutes', description: 'Maximum protection' }
  ];

  const formatDelay = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`.replace(' 0s', '');
  };

  return (
    <div className="space-y-6">
      {/* Main Delay Setting */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Delay Duration</CardTitle>
                <CardDescription>How long to wait before sending emails</CardDescription>
              </div>
            </div>
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Delay Display */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatDelay(currentDelay)}
              </div>
              <p className="text-blue-600/70">Current delay time</p>
            </div>

            {/* Preset Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {presetDelays.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onDelayChange(preset.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                    currentDelay === preset.value
                      ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">{preset.label}</span>
                    {currentDelay === preset.value && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{preset.description}</p>
                </button>
              ))}
            </div>

            {/* Custom Delay Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Custom delay</label>
                <span className="text-sm text-slate-500">{formatDelay(currentDelay)}</span>
              </div>
              <Slider
                value={[currentDelay]}
                onValueChange={(value) => onDelayChange(value[0])}
                max={300}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>5s</span>
                <span>5m</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Zap className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Advanced Options</CardTitle>
                <CardDescription>Fine-tune your protection settings</CardDescription>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
          </button>
        </CardHeader>
        {showAdvanced && (
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-700">Smart weekend delays</p>
                <p className="text-sm text-slate-500">Extend delay for weekend emails</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-700">High-priority bypass</p>
                <p className="text-sm text-slate-500">Skip delay for urgent emails</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-700">Sound notifications</p>
                <p className="text-sm text-slate-500">Audio alerts during delay</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tips */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-800 mb-2">Protection Tips</h3>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• 60 seconds provides the perfect balance of protection and convenience</li>
                <li>• You can edit or cancel emails during the delay period</li>
                <li>• Weekend delays help prevent after-hours work emails</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelaySettings;
