import React from 'react';
import { BookOpen, CheckCircle2, FileCode, SplitSquareVertical } from 'lucide-react';

export const AssignmentCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Официальное описание</span>
        </div>
        <h2 className="text-xl font-bold text-white mt-1">
          Задание 1: Знакомство со структурой программ на C++, структурами и перечислениями
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Цель: ознакомление с основными алгоритмическими конструкциями языка и средствами создания пользовательских типов данных: структурами (<code className="text-slate-300">struct</code>) и перечислениями (<code className="text-slate-300">enum</code>).
        </p>
      </div>

      {/* Grid of Requirement Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Block 1: Формат входного файла */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>1. Входной файл (persons.txt)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Текстовый файл со списком людей вида <code className="text-indigo-300 font-mono">Фамилия Имя ГодРождения</code>, записанных через пробел в столбик:
          </p>
          <pre className="bg-slate-950 p-2.5 rounded-lg text-xs font-mono text-emerald-400 border border-slate-800">
            Иванов Иван 2007{'\n'}
            Петров Пётр 2015{'\n'}
            Сидорова Ольга 1999
          </pre>
        </div>

        {/* Block 2: Три выходных файла */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
            <SplitSquareVertical className="w-4 h-4 text-emerald-400" />
            <span>2. Разделение на 3 файла</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Программа переносит людей в три отдельных файла согласно возрасту:
          </p>
          <ul className="text-xs space-y-1 font-mono">
            <li className="flex items-center justify-between bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
              <span className="text-emerald-400">children.txt</span>
              <span className="text-slate-400">дети (до 12 лет)</span>
            </li>
            <li className="flex items-center justify-between bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
              <span className="text-amber-400">teens.txt</span>
              <span className="text-slate-400">подростки (от 13 до 18 лет)</span>
            </li>
            <li className="flex items-center justify-between bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
              <span className="text-sky-400">adults.txt</span>
              <span className="text-slate-400">взрослые (старше 18 лет)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Required Types & Functions */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Обязательные типы данных и функции по заданию
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="font-mono text-indigo-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Типы данных:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-5 list-disc">
              <li>
                <code className="text-emerald-300">enum PersonCategory &#123; CHILD, TEEN, ADULT &#125;;</code>
              </li>
              <li>
                <code className="text-emerald-300">struct Person</code>: строковые поля <code className="text-slate-300">firstName</code>, <code className="text-slate-300">lastName</code>, числовое <code className="text-slate-300">birthYear</code>, и категория <code className="text-slate-300">pCategory</code>.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-indigo-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Обязательные функции:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-5 list-disc">
              <li>
                <code className="text-amber-300">PersonCategory getPersonCategory(Person person);</code> — определяет возрастную категорию.
              </li>
              <li>
                <code className="text-amber-300">void savePersonToFile(Person person);</code> — записывает человека в нужный файл согласно категории.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
