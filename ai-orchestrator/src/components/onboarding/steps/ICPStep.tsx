'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { useOnboardingStore } from '@/stores/useOnboardingStore';

const TITLE_OPTIONS = [
  { value: 'ceo', label: 'CEO' },
  { value: 'cto', label: 'CTO' },
  { value: 'vp-sales', label: 'VP Sales' },
  { value: 'vp-marketing', label: 'VP Marketing' },
  { value: 'head-growth', label: 'Head of Growth' },
  { value: 'director-ops', label: 'Director of Ops' },
  { value: 'founder', label: 'Founder' },
];

const INDUSTRY_OPTIONS = [
  { value: 'saas', label: 'SaaS' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'agency', label: 'Marketing Agency' },
  { value: 'consulting', label: 'Consulting' },
];

const GEO_OPTIONS = [
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'uk', label: 'UK' },
  { value: 'apac', label: 'APAC' },
  { value: 'latam', label: 'LATAM' },
  { value: 'global', label: 'Global' },
];

export function ICPStep() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Target Job Titles <span className="text-red-700">*</span>
        </label>
        <Dropdown
          options={TITLE_OPTIONS}
          value={data.targetTitles}
          onChange={(val) => updateData({ targetTitles: val as string[] })}
          multiSelect
          placeholder="Select or type titles"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Target Industries <span className="text-red-700">*</span>
        </label>
        <Dropdown
          options={INDUSTRY_OPTIONS}
          value={data.targetIndustries}
          onChange={(val) => updateData({ targetIndustries: val as string[] })}
          multiSelect
          placeholder="Select industries"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-sand-800 mb-2">Min Employees</label>
          <Input
            type="number"
            placeholder="10"
            value={data.minEmployees}
            onChange={(e) => updateData({ minEmployees: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-base font-medium text-sand-800 mb-2">Max Employees</label>
          <Input
            type="number"
            placeholder="500"
            value={data.maxEmployees}
            onChange={(e) => updateData({ maxEmployees: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">Target Geographies</label>
        <Dropdown
          options={GEO_OPTIONS}
          value={data.geographies}
          onChange={(val) => updateData({ geographies: val as string[] })}
          multiSelect
          placeholder="Select regions"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">Exclusions (optional)</label>
        <textarea
          className="w-full border border-sand-200 rounded-md px-3 py-2 text-base text-sand-800 placeholder-sand-400 focus:border-primary-700 focus:shadow-focused outline-none transition-colors duration-fast min-h-[80px] resize-y"
          placeholder="e.g., Competitors, companies in legal sector, existing customers…"
          value={data.exclusions}
          onChange={(e) => updateData({ exclusions: e.target.value })}
        />
      </div>
    </div>
  );
}
