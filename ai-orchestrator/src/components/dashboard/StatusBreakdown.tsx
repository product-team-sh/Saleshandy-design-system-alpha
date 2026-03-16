'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { StatusCount } from '@/mock/dashboard';

interface StatusBreakdownProps {
  statuses: StatusCount[];
}

export function StatusBreakdown({ statuses }: StatusBreakdownProps) {
  const total = statuses.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-sand-800 mb-4">Prospect Status</h3>
      <table className="w-full">
        <thead>
          <tr className="bg-sand-50 border-b border-sand-200">
            <th className="text-left px-4 py-2 text-sm font-semibold text-sand-600">Status</th>
            <th className="text-right px-4 py-2 text-sm font-semibold text-sand-600">Count</th>
            <th className="text-right px-4 py-2 text-sm font-semibold text-sand-600">%</th>
            <th className="px-4 py-2 text-sm font-semibold text-sand-600 w-[200px]"></th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((s) => (
            <tr
              key={s.status}
              className="border-b border-sand-100 hover:bg-sand-50 transition-colors duration-fast cursor-pointer"
            >
              <td className="px-4 py-3">
                <Badge variant={s.variant} size="sm">
                  {s.label}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right text-base font-semibold text-sand-800">
                {s.count}
              </td>
              <td className="px-4 py-3 text-right text-base text-sand-500">
                {s.percentage}%
              </td>
              <td className="px-4 py-3">
                <ProgressBar value={s.percentage} variant="primary" size="sm" />
              </td>
            </tr>
          ))}
          <tr className="bg-sand-50">
            <td className="px-4 py-3 text-base font-bold text-sand-800">Total</td>
            <td className="px-4 py-3 text-right text-base font-bold text-sand-800">{total}</td>
            <td className="px-4 py-3 text-right text-base font-bold text-sand-800">100%</td>
            <td className="px-4 py-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
