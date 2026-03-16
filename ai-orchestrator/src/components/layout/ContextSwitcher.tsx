'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useContextStore, useActiveContext } from '@/stores/useContextStore';
import { WorkspaceModal } from '@/components/workspace/WorkspaceModal';
import type { Context } from '@/types/context';

export function ContextSwitcher() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCtx, setEditingCtx] = useState<Context | undefined>();
  const ref = useRef<HTMLDivElement>(null);
  const { contexts, activeContextId, setActiveContext, createContext, updateContext } = useContextStore();
  const activeContext = useActiveContext();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreate = () => {
    setEditingCtx(undefined);
    setModalOpen(true);
    setOpen(false);
  };

  const handleEdit = (ctx: Context) => {
    setEditingCtx(ctx);
    setModalOpen(true);
    setOpen(false);
  };

  const handleSubmit = (data: Partial<Context>) => {
    if (editingCtx) {
      updateContext(editingCtx.id, data);
    } else {
      const created = createContext(data);
      setActiveContext(created.id);
    }
  };

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-sm border border-sand-200',
            'hover:bg-sand-50 transition-colors duration-fast',
            'text-base font-medium text-sand-800'
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: activeContext?.accentColor }}
          />
          <span className="truncate max-w-[160px]">{activeContext?.name ?? 'Select Workspace'}</span>
          <ChevronDown className={cn('w-4 h-4 text-sand-400 transition-transform duration-fast', open && 'rotate-180')} />
        </button>

        {open && (
          <div
            className="absolute top-full left-0 mt-1 w-[260px] bg-white border border-sand-200 rounded-md shadow-popover z-dropdown"
            role="listbox"
            aria-label="Select workspace"
          >
            <div className="px-3 py-2 border-b border-sand-100">
              <p className="text-xs font-semibold text-sand-400 uppercase tracking-wide">Workspaces</p>
            </div>
            {contexts.map((ctx) => (
              <div
                key={ctx.id}
                className={cn(
                  'group flex items-center gap-3 px-3 py-2',
                  'hover:bg-sand-50 transition-colors duration-fast',
                  ctx.id === activeContextId && 'bg-primary-50'
                )}
              >
                <button
                  role="option"
                  aria-selected={ctx.id === activeContextId}
                  onClick={() => {
                    setActiveContext(ctx.id);
                    setOpen(false);
                  }}
                  className="flex-1 flex items-center gap-3 text-left min-w-0"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ctx.accentColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-sand-800 truncate">{ctx.name}</p>
                    {ctx.campaignCount != null && (
                      <p className="text-xs text-sand-400">{ctx.campaignCount} campaigns</p>
                    )}
                  </div>
                  {ctx.id === activeContextId && (
                    <Check className="w-4 h-4 text-primary-700 flex-shrink-0" />
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleEdit(ctx); }}
                  className="p-1 rounded text-sand-300 hover:text-sand-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Edit workspace"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <div className="border-t border-sand-100">
              <button
                onClick={handleCreate}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Workspace
              </button>
            </div>
          </div>
        )}
      </div>

      <WorkspaceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editingCtx}
      />
    </>
  );
}
