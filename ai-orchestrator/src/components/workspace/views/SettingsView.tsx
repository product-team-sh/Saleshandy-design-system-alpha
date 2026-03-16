'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';

interface SettingsViewProps {
  campaignId: string;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const defaultActiveDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Kolkata',
  'Asia/Tokyo',
];

const stopConditions = [
  'Stop on reply',
  'Stop on meeting booked',
  'Stop on bounce',
];

export function SettingsView({ campaignId }: SettingsViewProps) {
  const [campaignName, setCampaignName] = useState('New Campaign');
  const [timezone, setTimezone] = useState('America/New_York');
  const [activeDays, setActiveDays] = useState<string[]>(defaultActiveDays);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [activeStopConditions, setActiveStopConditions] = useState<string[]>([
    'Stop on reply',
    'Stop on meeting booked',
  ]);

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleStopCondition = (condition: string) => {
    setActiveStopConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-xs font-medium text-sand-600 mb-1">
            Campaign name
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm focus:border-primary-700 focus:shadow-focused outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-sand-600 mb-1">
            Sending schedule timezone
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm focus:border-primary-700 focus:shadow-focused outline-none bg-white"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-sand-600 mb-2">
            Active days
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-sm border transition-colors',
                  activeDays.includes(day)
                    ? 'bg-primary-700 text-white border-primary-700'
                    : 'bg-white text-sand-600 border-sand-200 hover:bg-sand-50'
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-sand-600 mb-1">
            Daily send limit
          </label>
          <input
            type="number"
            value={dailyLimit}
            onChange={(e) => setDailyLimit(Number(e.target.value))}
            min={1}
            max={500}
            className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm focus:border-primary-700 focus:shadow-focused outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-sand-600 mb-2">
            Stop conditions
          </label>
          <div className="space-y-2">
            {stopConditions.map((condition) => (
              <label
                key={condition}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeStopConditions.includes(condition)}
                  onChange={() => toggleStopCondition(condition)}
                  className="w-4 h-4 rounded border-sand-300 text-primary-700 focus:ring-primary-700"
                />
                <span className="text-sm text-sand-700">{condition}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-sand-200 bg-white px-4 py-3 flex items-center gap-3">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-700 rounded-sm hover:bg-primary-800 transition-colors">
          Save Settings
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-sand-700 border border-sand-200 rounded-sm hover:bg-sand-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}
