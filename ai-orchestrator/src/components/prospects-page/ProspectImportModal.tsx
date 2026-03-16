'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';

interface ProspectImportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProspectImportModal({ open, onClose }: ProspectImportModalProps) {
  const [emailText, setEmailText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const hasContent = emailText.trim().length > 0;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Placeholder: file handling would go here
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Import Prospects"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={!hasContent}>
            Import Prospects
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Drag and drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-8 text-center transition-colors duration-150 cursor-pointer',
            dragActive
              ? 'border-primary-700 bg-primary-50'
              : 'border-sand-300 bg-sand-50 hover:border-sand-400'
          )}
        >
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              dragActive ? 'bg-primary-100' : 'bg-sand-200'
            )}
          >
            <Upload
              className={cn(
                'w-5 h-5',
                dragActive ? 'text-primary-700' : 'text-sand-500'
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-sand-700">
              Drop your CSV here or click to browse
            </p>
            <p className="text-xs text-sand-400 mt-1">
              Supports .csv files up to 25MB
            </p>
          </div>
        </div>

        {/* Divider with text */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-sand-200" />
          <span className="text-xs text-sand-400 uppercase tracking-wide">Or</span>
          <div className="flex-1 h-px bg-sand-200" />
        </div>

        {/* Paste email addresses */}
        <div>
          <TextArea
            label="Paste email addresses"
            placeholder="Enter email addresses, one per line..."
            size="md"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            helperText="Enter one email address per line"
          />
        </div>
      </div>
    </Modal>
  );
}
