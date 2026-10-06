import React, { useState } from 'react';
import { Person } from '../types/person';
import { generateOutputFiles } from '../services/personApi';
import { FileText, Download, Copy, Check, Users, Baby, School, UserCheck } from 'lucide-react';

interface OutputFilesViewerProps {
  persons: Person[];
  referenceYear: number;
}

export const OutputFilesViewer: React.FC<OutputFilesViewerProps> = ({
  persons,
  referenceYear,
}) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const bundle = generateOutputFiles(persons, referenceYear);

  const files = [
    {
      name: 'children.txt',
      title: 'Дети (children.txt)',
      ageRange: 'до 12 лет (возраст ≤ 12)',
      count: bundle.childrenPersons.length,
      content: bundle.childrenTxt,
      icon: Baby,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      borderColor: 'border-emerald-500/30',
    },
    {
      name: 'teens.txt',
      title: 'Подростки (teens.txt)',
      ageRange: 'от 13 до 18 лет (13 ≤ возраст ≤ 18)',
      count: bundle.teenPersons.length,
      content: bundle.teensTxt,
      icon: School,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      borderColor: 'border-amber-500/30',
    },
    {
      name: 'adults.txt',
      title: 'Взрослые (adults.txt)',
      ageRange: 'старше 18 лет (возраст > 18)',
      count: bundle.adultPersons.length,
      content: bundle.adultsTxt,
      icon: UserCheck,
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      borderColor: 'border-sky-500/30',
    },
  ];

  const downloadFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.forEach((file) => {
      downloadFile(file.name, file.content);
    });
  };

  const copyContent = (fileName: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining requirement */}
      <div className="bg-slate-800/60 border border-indigo-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>3 результирующих файла по Заданию 1</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Функция <code className="text-indigo-300 font-mono">savePersonToFile(Person person)</code> распределяет записи в файлы <strong>children.txt</strong>, <strong>teens.txt</strong> и <strong>adults.txt</strong>.
          </p>
        </div>

        <button
          onClick={downloadAll}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Скачать все 3 файла (.txt)</span>
        </button>
      </div>

      {/* 3 Output File Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files.map((file) => {
          const Icon = file.icon;
          const isCopied = copiedFile === file.name;

          return (
            <div
              key={file.name}
              className={`bg-slate-900 border ${file.borderColor} rounded-xl overflow-hidden flex flex-col shadow-lg`}
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-300" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white">{file.name}</h4>
                    <p className="text-[11px] text-slate-400">{file.ageRange}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ${file.badgeColor}`}
                >
                  {file.count} {file.count === 1 ? 'чел.' : 'чел.'}
                </span>
              </div>

              {/* Card Code/File Body */}
              <div className="p-4 flex-1 bg-slate-950 font-mono text-xs flex flex-col justify-between min-h-[160px]">
                {file.content ? (
                  <pre className="text-slate-200 leading-relaxed overflow-x-auto whitespace-pre selection:bg-indigo-700 selection:text-white">
                    {file.content}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-600 py-6 my-auto text-center">
                    <Users className="w-6 h-6 mb-1 opacity-50" />
                    <span>Файл пуст</span>
                    <span className="text-[10px] text-slate-600">Нет записей данной категории</span>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-500">
                  {file.count} строк
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyContent(file.name, file.content)}
                    disabled={!file.content}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-slate-200 bg-slate-800 rounded border border-slate-700 transition-colors disabled:opacity-40"
                    title="Скопировать содержимое"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Скопировано' : 'Копия'}</span>
                  </button>

                  <button
                    onClick={() => downloadFile(file.name, file.content)}
                    disabled={!file.content}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-indigo-300 hover:text-white bg-indigo-600/30 hover:bg-indigo-600/50 rounded border border-indigo-500/40 transition-colors disabled:opacity-40"
                    title={`Скачать ${file.name}`}
                  >
                    <Download className="w-3 h-3" />
                    <span>Скачать</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
