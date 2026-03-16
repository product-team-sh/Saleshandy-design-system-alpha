'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { useTimelineStore } from '@/stores/useTimelineStore';

interface NotesTabProps {
  prospectId: string;
}

export function NotesTab({ prospectId }: NotesTabProps) {
  const { notes, addNote } = useTimelineStore();
  const [draft, setDraft] = useState('');

  const prospectNotes = notes
    .filter((n) => n.prospectId === prospectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSave = () => {
    if (!draft.trim()) return;
    addNote(prospectId, draft.trim());
    setDraft('');
  };

  return (
    <div className="space-y-6">
      {/* New note */}
      <div>
        <textarea
          className="w-full border border-sand-200 rounded-md px-3 py-2 text-base text-sand-800 placeholder-sand-400 focus:border-primary-700 focus:shadow-focused outline-none transition-colors duration-fast min-h-[120px] resize-y"
          placeholder="Add notes about this prospect…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!draft.trim()}
          >
            Save Note
          </Button>
        </div>
      </div>

      {/* Existing notes */}
      {prospectNotes.length > 0 && (
        <div className="space-y-4">
          {prospectNotes.map((note) => (
            <div key={note.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-sand-500">
                  You · {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <p className="text-base text-sand-800">{note.content}</p>
              <Divider className="mt-4" />
            </div>
          ))}
        </div>
      )}

      {prospectNotes.length === 0 && !draft && (
        <p className="text-base text-sand-400 text-center py-8">No notes yet for this prospect.</p>
      )}
    </div>
  );
}
