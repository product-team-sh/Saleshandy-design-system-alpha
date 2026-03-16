'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Toggle } from '@/components/ui/Toggle';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { useSettingsStore } from '@/stores/useSettingsStore';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TONE_OPTIONS = [
  { value: 'formal', label: 'Formal' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'bold', label: 'Bold & Direct' },
];
const BOOKING_OPTIONS = [
  { value: 'auto', label: 'Auto-book (AI books when prospect is positive)' },
  { value: 'human_approval', label: 'Ask me first (AI proposes, I confirm)' },
];

export function GlobalDefaultsSection() {
  const { globalDefaults, updateGlobalDefaults } = useSettingsStore();
  const { sendingSchedule, followUpCadenceDays, dailyEmailLimit, tone, bookingMode } = globalDefaults;

  const toggleDay = (dayIndex: number) => {
    const days = sendingSchedule.activeDays.includes(dayIndex)
      ? sendingSchedule.activeDays.filter((d) => d !== dayIndex)
      : [...sendingSchedule.activeDays, dayIndex].sort();
    updateGlobalDefaults({ sendingSchedule: { ...sendingSchedule, activeDays: days } });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-sand-800">Global Defaults</h3>

      {/* Sending days */}
      <div className="space-y-2">
        <label className="text-base font-medium text-sand-700">Active Sending Days</label>
        <div className="flex gap-2 flex-wrap">
          {DAYS.map((day, i) => {
            const isActive = sendingSchedule.activeDays.includes(i);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(i)}
                className={cn(
                  'px-3 py-1.5 rounded-sm text-sm font-medium border transition-colors duration-fast',
                  isActive
                    ? 'bg-primary-700 text-white border-primary-700'
                    : 'bg-white text-sand-600 border-sand-200 hover:border-sand-300'
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-sand-400">Outreach is sent in the prospect's local timezone</p>
      </div>

      {/* Sending hours */}
      <div className="grid grid-cols-2 gap-4 max-w-sm">
        <div className="space-y-1">
          <label className="text-base font-medium text-sand-700">Send from</label>
          <Input
            type="number"
            min={0}
            max={23}
            value={sendingSchedule.startHour}
            onChange={(e) => updateGlobalDefaults({
              sendingSchedule: { ...sendingSchedule, startHour: +e.target.value }
            })}
            size="sm"
          />
          <p className="text-xs text-sand-400">Hour (0–23)</p>
        </div>
        <div className="space-y-1">
          <label className="text-base font-medium text-sand-700">Send until</label>
          <Input
            type="number"
            min={0}
            max={23}
            value={sendingSchedule.endHour}
            onChange={(e) => updateGlobalDefaults({
              sendingSchedule: { ...sendingSchedule, endHour: +e.target.value }
            })}
            size="sm"
          />
          <p className="text-xs text-sand-400">Hour (0–23)</p>
        </div>
      </div>

      {/* Follow-up cadence */}
      <div className="max-w-sm space-y-1">
        <label className="text-base font-medium text-sand-700">Follow-up cadence (days between touchpoints)</label>
        <Input
          type="number"
          min={1}
          max={14}
          value={followUpCadenceDays}
          onChange={(e) => updateGlobalDefaults({ followUpCadenceDays: +e.target.value })}
          size="sm"
        />
      </div>

      {/* Daily limit */}
      <div className="max-w-sm space-y-1">
        <label className="text-base font-medium text-sand-700">Daily email limit (new leads/day)</label>
        <Input
          type="number"
          min={10}
          max={500}
          value={dailyEmailLimit}
          onChange={(e) => updateGlobalDefaults({ dailyEmailLimit: +e.target.value })}
          size="sm"
        />
      </div>

      {/* Tone */}
      <div className="max-w-sm space-y-1">
        <label className="text-base font-medium text-sand-700">Default messaging tone</label>
        <Dropdown
          options={TONE_OPTIONS}
          value={tone}
          onChange={(v) => updateGlobalDefaults({ tone: v as any })}
          size="sm"
        />
      </div>

      {/* Booking mode */}
      <div className="max-w-md space-y-1">
        <label className="text-base font-medium text-sand-700">Meeting booking mode</label>
        <Dropdown
          options={BOOKING_OPTIONS}
          value={bookingMode}
          onChange={(v) => updateGlobalDefaults({ bookingMode: v as any })}
          size="sm"
        />
      </div>
    </div>
  );
}
