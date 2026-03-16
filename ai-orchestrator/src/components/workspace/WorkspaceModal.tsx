'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { Context } from '@/types/context';

const COLOR_PRESETS = [
  { color: '#1d4ed8', hover: '#1e40af', pressed: '#1e3a8a', label: 'Blue' },
  { color: '#7c3aed', hover: '#6d28d9', pressed: '#5b21b6', label: 'Purple' },
  { color: '#059669', hover: '#047857', pressed: '#065f46', label: 'Green' },
  { color: '#dc2626', hover: '#b91c1c', pressed: '#991b1b', label: 'Red' },
  { color: '#d97706', hover: '#b45309', pressed: '#92400e', label: 'Amber' },
  { color: '#0891b2', hover: '#0e7490', pressed: '#155e75', label: 'Cyan' },
];

interface WorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Context>) => void;
  initial?: Context;
}

export function WorkspaceModal({ open, onClose, onSubmit, initial }: WorkspaceModalProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [selectedColor, setSelectedColor] = useState(
    initial?.accentColor ?? COLOR_PRESETS[0].color
  );

  const preset = COLOR_PRESETS.find((p) => p.color === selectedColor) ?? COLOR_PRESETS[0];

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      ...(initial ? { id: initial.id } : {}),
      name: name.trim(),
      description: description.trim() || undefined,
      accentColor: preset.color,
      accentHover: preset.hover,
      accentPressed: preset.pressed,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Workspace' : 'Create Workspace'}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!name.trim()}>
            {initial ? 'Save Changes' : 'Create Workspace'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Workspace Name"
          placeholder="e.g. Acme Corp"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          label="Description"
          placeholder="What is this workspace for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <div>
          <label className="block text-sm font-medium text-sand-700 mb-2">Accent Color</label>
          <div className="flex gap-2">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.color}
                type="button"
                onClick={() => setSelectedColor(p.color)}
                className={cn(
                  'w-8 h-8 rounded-full transition-all',
                  selectedColor === p.color
                    ? 'ring-2 ring-offset-2 ring-sand-400 scale-110'
                    : 'hover:scale-105'
                )}
                style={{ backgroundColor: p.color }}
                title={p.label}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
