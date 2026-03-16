'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle, Edit3, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';

interface AiReplyBannerProps {
  pendingReply: string;
  reason?: string;
  onApprove: () => void;
  onDismiss: () => void;
  onEditAndSend: (edited: string) => void;
}

export function AiReplyBanner({ pendingReply, reason, onApprove, onDismiss, onEditAndSend }: AiReplyBannerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(pendingReply);

  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-yellow-600 shrink-0" />
          <span className="text-sm font-semibold text-yellow-800 font-semibold">AI drafted a reply</span>
        </div>
        <button
          onClick={onDismiss}
          className="p-0.5 rounded hover:bg-yellow-100 text-yellow-500"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {reason && (
        <p className="text-xs text-yellow-700 text-yellow-700">{reason}</p>
      )}

      {isEditing ? (
        <div className="space-y-2">
          <TextArea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={5}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => { onEditAndSend(editedText); setIsEditing(false); }}
              disabled={!editedText.trim()}
            >
              Send Edited Reply
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white border border-yellow-200 rounded-md p-3 text-sm text-sand-700 whitespace-pre-line max-h-40 overflow-y-auto">
            {pendingReply}
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={onApprove}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve & Send
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
