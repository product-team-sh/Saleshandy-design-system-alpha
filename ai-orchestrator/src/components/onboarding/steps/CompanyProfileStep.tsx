'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { useOnboardingStore } from '@/stores/useOnboardingStore';

const INDUSTRY_OPTIONS = [
  { value: 'saas', label: 'SaaS' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'agency', label: 'Marketing Agency' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const SIZE_OPTIONS = [
  { value: '1-10', label: '1–10' },
  { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-500', label: '201–500' },
  { value: '500+', label: '500+' },
];

export function CompanyProfileStep() {
  const { data, updateData, errors } = useOnboardingStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Company Name <span className="text-red-700">*</span>
        </label>
        <Input
          placeholder="e.g., Saleshandy"
          value={data.companyName}
          onChange={(e) => updateData({ companyName: e.target.value })}
          error={errors.companyName}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Website <span className="text-red-700">*</span>
        </label>
        <Input
          placeholder="yourcompany.com"
          value={data.website}
          onChange={(e) => updateData({ website: e.target.value })}
          leftIcon={<span className="text-sm text-sand-400">https://</span>}
          error={errors.website}
        />
        <p className="text-sm text-sand-500 mt-1">We&apos;ll analyze your site to understand your offering</p>
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Industry <span className="text-red-700">*</span>
        </label>
        <Dropdown
          options={INDUSTRY_OPTIONS}
          value={data.industry}
          onChange={(val) => updateData({ industry: val as string })}
          placeholder="Select industry"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Company Size <span className="text-red-700">*</span>
        </label>
        <Dropdown
          options={SIZE_OPTIONS}
          value={data.companySize}
          onChange={(val) => updateData({ companySize: val as string })}
          placeholder="Select range"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          What does your company do? <span className="text-red-700">*</span>
        </label>
        <textarea
          className="w-full border border-sand-200 rounded-md px-3 py-2 text-base text-sand-800 placeholder-sand-400 focus:border-primary-700 focus:shadow-focused outline-none transition-colors duration-fast min-h-[120px] resize-y"
          placeholder="Describe your core product/service and what makes it unique…"
          value={data.valueProposition}
          onChange={(e) => updateData({ valueProposition: e.target.value })}
        />
        <p className="text-sm text-sand-500 mt-1">This helps the AI craft relevant outreach messages</p>
      </div>
    </div>
  );
}
