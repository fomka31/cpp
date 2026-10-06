import React, { useState } from 'react';
import { Person } from '../types/person';
import { simulateCppConsoleOutput } from '../services/personApi';
import { Terminal, Copy, Check, Play, RefreshCw } from 'lucide-react';

interface ConsoleViewerProps {
  persons: Person[];
  referenceYear: number;
}

export const ConsoleViewer: React.FC<ConsoleViewerProps> = ({
  persons,
  referenceYear,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const output = simulateCppConsoleOutput(persons, referenceYear);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReRun = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>C++ stdout Simulator — ./main.exe</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReRun}
            disabled={isSimulating}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded border border-slate-700 transition-colors"
            title="Re-run main.exe"
          >
            {isSimulating ? (
              <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
            ) : (
              <Play className="w-3 h-3 text-emerald-400" />
            )}
            <span>Re-execute</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded border border-slate-700 transition-colors"
            title="Copy terminal output"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>{copied ? 'Copied!' : 'Copy Output'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-6 bg-slate-950 font-mono text-xs overflow-x-auto min-h-[300px]">
        <div className="text-slate-500 mb-2">
          // Emulating execution of compiled C++ code from main.cpp
        </div>
        <pre className="text-slate-200 leading-relaxed font-mono whitespace-pre selection:bg-indigo-700 selection:text-white">
          {output}
        </pre>
      </div>

      {/* Terminal Footer Explanation */}
      <div className="px-4 py-3 bg-slate-900 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          C++ Code format: <code className="text-indigo-300">firstName lastName birthYear getPersonCategory(person)</code>
        </div>
        <div className="text-slate-500">
          Enum values: <span className="text-emerald-400">CHILD = 0</span>, <span className="text-amber-400">TEEN = 1</span>, <span className="text-sky-400">ADULT = 2</span>
        </div>
      </div>
    </div>
  );
};
