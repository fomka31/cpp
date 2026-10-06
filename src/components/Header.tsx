import React from 'react';
import { Code2, Calendar, RotateCcw, Download, Terminal, Upload, FileText, SplitSquareVertical, BookOpen } from 'lucide-react';

export type ActiveTabType = 'persons' | 'outputFiles' | 'console' | 'cppSource' | 'assignment';

interface HeaderProps {
  referenceYear: number;
  onReferenceYearChange: (year: number) => void;
  onReset: () => void;
  onExport: () => void;
  onOpenRawEditor: () => void;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  referenceYear,
  onReferenceYearChange,
  onReset,
  onExport,
  onOpenRawEditor,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          {/* Title and Badges */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-inner">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Задание 1: Разделение людей по возрастам
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  C++ Лабораторная 1
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Распределение из <code className="text-slate-300">persons.txt</code> в 3 файла: <code className="text-emerald-400">children.txt</code>, <code className="text-amber-400">teens.txt</code>, <code className="text-sky-400">adults.txt</code>
              </p>
            </div>
          </div>

          {/* Controls: Reference year & actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Reference Year Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Опорный год:</span>
              <input
                type="number"
                min="1950"
                max="2100"
                value={referenceYear}
                onChange={(e) => onReferenceYearChange(parseInt(e.target.value, 10) || 2026)}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-right font-mono font-medium text-indigo-300 focus:outline-none focus:border-indigo-500"
                title="Опорный год для расчёта возраста: год - birthYear"
              />
              {referenceYear === 2026 && (
                <span className="text-[10px] text-emerald-400 font-semibold px-1 rounded bg-emerald-950/60 border border-emerald-800/60">
                  2026 (код C++)
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <button
              onClick={onOpenRawEditor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors shadow-sm"
              title="Редактировать persons.txt напрямую"
            >
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>persons.txt</span>
            </button>

            <button
              onClick={onExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors shadow-sm"
              title="Скачать persons.txt"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Скачать исходный</span>
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-colors shadow-sm"
              title="Сбросить к исходным данным из Задания 1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Сброс</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-t border-slate-800/80 -mb-px">
          <button
            onClick={() => setActiveTab('outputFiles')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'outputFiles'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>3 выходных файла (Задание 1)</span>
          </button>

          <button
            onClick={() => setActiveTab('persons')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'persons'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Таблица и добавление</span>
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'console'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Консоль ./main.exe</span>
          </button>

          <button
            onClick={() => setActiveTab('cppSource')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'cppSource'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Исходный код C++ (*.h, *.cpp)</span>
          </button>

          <button
            onClick={() => setActiveTab('assignment')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'assignment'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Текст задания 1</span>
          </button>
        </div>
      </div>
    </header>
  );
};
