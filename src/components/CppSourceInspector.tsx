import React, { useState } from 'react';
import { CPP_SOURCE_CODE } from '../services/personApi';
import { Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

export const CppSourceInspector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<keyof typeof CPP_SOURCE_CODE>('person_cpp');
  const [copied, setCopied] = useState(false);

  const fileTitles: Record<keyof typeof CPP_SOURCE_CODE, { label: string; desc: string }> = {
    personapi_h: {
      label: 'personapi.h',
      desc: 'Заголовочный файл: enum PersonCategory, struct Person и прототипы функций',
    },
    person_cpp: {
      label: 'person.cpp',
      desc: 'Реализация функций getPersonCategory() и savePersonToFile()',
    },
    main_cpp: {
      label: 'main.cpp',
      desc: 'Точка входа: построчное чтение persons.txt и запись в 3 файла',
    },
    persons_txt: {
      label: 'persons.txt',
      desc: 'Исходный текстовый файл со списком людей (Иванов, Петров, Сидорова)',
    },
  };

  const currentContent = CPP_SOURCE_CODE[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* File Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/40 border border-slate-700/60 rounded-xl p-2">
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(CPP_SOURCE_CODE) as Array<keyof typeof CPP_SOURCE_CODE>).map((key) => {
            const isSelected = selectedFile === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedFile(key)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{fileTitles[key].label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Скопировано' : 'Скопировать код'}</span>
        </button>
      </div>

      {/* Code Viewer */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-indigo-400">
            ood_cpp/lab_1/{fileTitles[selectedFile].label}
          </span>
          <span className="text-xs text-slate-400">
            {fileTitles[selectedFile].desc}
          </span>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto text-xs font-mono">
          <pre className="text-slate-200 leading-relaxed whitespace-pre selection:bg-indigo-700 selection:text-white">
            {currentContent}
          </pre>
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-xs space-y-3">
        <h4 className="font-semibold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Соответствие всем пунктам «Задания 1»:</span>
        </h4>
        <ul className="text-slate-400 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong className="text-slate-200">Перечисление PersonCategory</strong>: определены три категории <code className="text-indigo-300">CHILD, TEEN, ADULT</code>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong className="text-slate-200">Структура Person</strong>: содержит строковые поля <code className="text-indigo-300">firstName</code>, <code className="text-indigo-300">lastName</code>, целое поле <code className="text-indigo-300">birthYear</code> и поле категории <code className="text-indigo-300">pCategory</code>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong className="text-slate-200">Функция getPersonCategory(Person person)</strong>: вход — тип <code className="text-slate-300">Person</code>, выход — <code className="text-indigo-300">PersonCategory</code>. Возраст ≤ 12 → CHILD, 13..18 → TEEN, &gt; 18 → ADULT.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong className="text-slate-200">Функция savePersonToFile(Person person)</strong>: вход — тип <code className="text-slate-300">Person</code>. Записывает человека в нужный файл согласно категории (<code className="text-emerald-400">children.txt</code>, <code className="text-amber-400">teens.txt</code> или <code className="text-sky-400">adults.txt</code>).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong className="text-slate-200">Модульная структура</strong>: код грамотно разбит на <code className="text-slate-300">personapi.h</code>, <code className="text-slate-300">person.cpp</code> и <code className="text-slate-300">main.cpp</code>.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
