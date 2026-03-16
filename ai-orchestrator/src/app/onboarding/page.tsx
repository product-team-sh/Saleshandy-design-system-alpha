'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload, FileText, Globe, MessageSquare, CheckCircle, ArrowRight, Rocket, ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { PathDInterview } from '@/components/onboarding/PathDInterview';
import { ChannelsStep } from '@/components/onboarding/steps/ChannelsStep';
import { IntegrationsStep } from '@/components/onboarding/steps/IntegrationsStep';

type OnboardingPath = 'customer_list' | 'winning_copy' | 'docs_url' | 'ai_interview';

const PATHS: {
  key: OnboardingPath;
  icon: React.ElementType;
  label: string;
  sub: string;
}[] = [
  {
    key: 'customer_list',
    icon: Upload,
    label: 'Upload your customer list',
    sub: 'AI analyzes your wins and generates a lookalike ICP automatically.',
  },
  {
    key: 'winning_copy',
    icon: FileText,
    label: 'Paste your best-performing copy',
    sub: 'AI extracts patterns, tone, and what\'s working so it can replicate it.',
  },
  {
    key: 'docs_url',
    icon: Globe,
    label: 'Share your docs or website',
    sub: 'Drop a URL or upload PDFs — AI processes everything and populates your Brain.',
  },
  {
    key: 'ai_interview',
    icon: MessageSquare,
    label: 'Let AI interview you',
    sub: '5 conversational questions. Takes about 3 minutes. No prep needed.',
  },
];

type Stage = 'paths' | 'inputs' | 'setup' | 'channels' | 'integrations' | 'launch';

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('paths');
  const [selectedPaths, setSelectedPaths] = useState<OnboardingPath[]>([]);
  const [completedPaths, setCompletedPaths] = useState<OnboardingPath[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);

  // Path inputs
  const [csvFile, setCsvFile] = useState<string>('');
  const [winningCopy, setWinningCopy] = useState('');
  const [docsUrl, setDocsUrl] = useState('');
  const [interviewDone, setInterviewDone] = useState(false);

  const togglePath = (path: OnboardingPath) => {
    setSelectedPaths((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handlePathsDone = () => {
    if (selectedPaths.length === 0) return;

    const hasPureInput = selectedPaths.some((p) => p !== 'ai_interview');
    if (hasPureInput || selectedPaths.includes('ai_interview')) {
      setStage('inputs');
    } else {
      setStage('setup');
    }
  };

  const allInputsComplete = selectedPaths.every((path) => {
    if (path === 'customer_list') return !!csvFile;
    if (path === 'winning_copy') return !!winningCopy.trim();
    if (path === 'docs_url') return !!docsUrl.trim();
    if (path === 'ai_interview') return interviewDone;
    return true;
  });

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => router.push('/dashboard'), 1800);
  };

  const STAGE_LABELS: Record<Stage, string> = {
    paths: 'Choose your path',
    inputs: 'Share what you have',
    setup: 'Connect email',
    channels: 'Enable channels',
    integrations: 'Connect tools',
    launch: 'Ready to launch',
  };

  const STAGE_ORDER: Stage[] = ['paths', 'inputs', 'setup', 'channels', 'integrations', 'launch'];
  const currentIndex = STAGE_ORDER.indexOf(stage);

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">
      {/* Progress header */}
      <div className="bg-white border-b border-sand-200 px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-ocean-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-base font-semibold text-sand-800">Saleshandy AI</span>
          </div>
          <div className="flex items-center gap-2">
            {STAGE_ORDER.filter((s) => s !== 'paths').map((s, i) => (
              <React.Fragment key={s}>
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  STAGE_ORDER.indexOf(stage) > i
                    ? 'bg-ocean-500 text-white'
                    : STAGE_ORDER.indexOf(stage) === i + 1
                    ? 'bg-ocean-100 text-ocean-700 ring-2 ring-ocean-500'
                    : 'bg-sand-100 text-sand-400'
                )}>
                  {STAGE_ORDER.indexOf(stage) > i ? '✓' : i + 1}
                </div>
                {i < 4 && <div className="w-6 h-px bg-sand-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 py-10 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Stage: Path selection */}
          {stage === 'paths' && (
            <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-8 -mx-4 -mt-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 max-w-2xl w-full">
                <div className="text-center mb-8">
                  <h1 className="font-serif text-4xl text-white text-center mb-2">
                    What do you have to get started?
                  </h1>
                  <p className="text-ocean-200 text-center text-base">
                    Choose one or more. The more you share, the smarter your AI starts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PATHS.map((path) => {
                    const Icon = path.icon;
                    const isSelected = selectedPaths.includes(path.key);
                    return (
                      <button
                        key={path.key}
                        type="button"
                        onClick={() => togglePath(path.key)}
                        className={cn(
                          'text-left p-5 rounded-xl transition-all duration-150 cursor-pointer',
                          isSelected
                            ? 'bg-white/20 border-2 border-ocean-300 ring-2 ring-ocean-400/30'
                            : 'bg-white/10 border border-white/20 hover:bg-white/20'
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-white shrink-0" />
                          )}
                        </div>
                        <h3 className="text-white font-semibold mt-3 mb-1 text-base">
                          {path.label}
                        </h3>
                        <p className="text-sm text-ocean-200">{path.sub}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={handlePathsDone}
                    disabled={selectedPaths.length === 0}
                    className="bg-white text-ocean-700 hover:bg-ocean-50 font-semibold px-8 py-3 rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage: Inputs */}
          {stage === 'inputs' && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-sand-800">Share what you have</h1>
                <p className="text-base text-sand-500 mt-2">
                  Your AI will process these to build your working knowledge base.
                </p>
              </div>

              {selectedPaths.map((path) => (
                <div key={path} className="bg-white border border-sand-200 rounded-md p-5 space-y-3">
                  {path === 'customer_list' && (
                    <>
                      <h3 className="text-base font-semibold text-sand-800">Upload Customer List</h3>
                      <p className="text-sm text-sand-500">CSV with columns: name, company, title, email</p>
                      <div
                        className="border-2 border-dashed border-sand-200 rounded-md p-6 text-center cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
                        onClick={() => setCsvFile('customers.csv')}
                      >
                        {csvFile ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{csvFile}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                            <p className="text-sm text-sand-500">Click to upload CSV</p>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  {path === 'winning_copy' && (
                    <>
                      <h3 className="text-base font-semibold text-sand-800">Paste Your Best-Performing Emails</h3>
                      <p className="text-sm text-sand-500">Paste 3–5 emails that converted. AI will extract tone, structure, and hooks.</p>
                      <TextArea
                        placeholder="Paste your best emails here..."
                        value={winningCopy}
                        onChange={(e) => setWinningCopy(e.target.value)}
                        rows={6}
                      />
                    </>
                  )}

                  {path === 'docs_url' && (
                    <>
                      <h3 className="text-base font-semibold text-sand-800">Share Your Website or Docs</h3>
                      <p className="text-sm text-sand-500">Your website, help center, or product documentation URL.</p>
                      <Input
                        placeholder="https://yourcompany.com"
                        value={docsUrl}
                        onChange={(e) => setDocsUrl(e.target.value)}
                        leftIcon={<Globe className="w-4 h-4" />}
                      />
                    </>
                  )}

                  {path === 'ai_interview' && (
                    <>
                      <h3 className="text-base font-semibold text-sand-800">AI Interview</h3>
                      <p className="text-sm text-sand-500">5 questions. Takes about 3 minutes.</p>
                      <PathDInterview onComplete={() => setInterviewDone(true)} />
                    </>
                  )}
                </div>
              ))}

              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setStage('paths')}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStage('channels')}
                  disabled={!allInputsComplete}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Stage: Channels */}
          {stage === 'channels' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-sand-800">Enable your channels</h1>
                <p className="text-base text-sand-500 mt-1">
                  Email is required. Others are optional but increase reply rates.
                </p>
              </div>
              <div className="bg-white border border-sand-200 rounded-md p-6">
                <ChannelsStep />
              </div>
              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setStage('inputs')}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStage('integrations')}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Stage: Integrations */}
          {stage === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-sand-800">Connect your tools</h1>
                <p className="text-base text-sand-500 mt-1">
                  Optional — you can always connect these later.
                </p>
              </div>
              <div className="bg-white border border-sand-200 rounded-md p-6">
                <IntegrationsStep />
              </div>
              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setStage('channels')}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStage('launch')}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Stage: Launch */}
          {stage === 'launch' && (
            <div className="space-y-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto">
                <Rocket className="w-9 h-9 text-primary-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-sand-800">Your AI is ready.</h1>
                <p className="text-base text-sand-500 mt-2">
                  Here's what it knows about your business:
                </p>
              </div>
              <div className="bg-white border border-sand-200 rounded-md p-6 text-left space-y-3 max-w-lg mx-auto">
                {selectedPaths.includes('customer_list') && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-sand-700">Generated a lookalike ICP from your customer list</span>
                  </div>
                )}
                {selectedPaths.includes('winning_copy') && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-sand-700">Extracted your brand voice and messaging patterns</span>
                  </div>
                )}
                {selectedPaths.includes('docs_url') && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-sand-700">Processed your website and documentation</span>
                  </div>
                )}
                {selectedPaths.includes('ai_interview') && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-sand-700">Built a business context profile from your interview</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-sand-700">Email infrastructure configured and warming up</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleLaunch}
                disabled={isLaunching}
                className="mx-auto"
              >
                {isLaunching ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Launch Your AI
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
