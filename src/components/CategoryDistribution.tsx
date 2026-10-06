import React from 'react';
import { Person, PersonCategory } from '../types/person';
import { Users, Baby, School, UserCheck, Activity } from 'lucide-react';

interface CategoryDistributionProps {
  persons: Person[];
  referenceYear: number;
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  persons,
  referenceYear,
}) => {
  const total = persons.length;
  const childCount = persons.filter((p) => p.category === PersonCategory.CHILD).length;
  const teenCount = persons.filter((p) => p.category === PersonCategory.TEEN).length;
  const adultCount = persons.filter((p) => p.category === PersonCategory.ADULT).length;

  const totalAge = persons.reduce((sum, p) => sum + (referenceYear - p.birthYear), 0);
  const avgAge = total > 0 ? (totalAge / total).toFixed(1) : '0';

  const childPct = total > 0 ? Math.round((childCount / total) * 100) : 0;
  const teenPct = total > 0 ? Math.round((teenCount / total) * 100) : 0;
  const adultPct = total > 0 ? Math.round((adultCount / total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total */}
        <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Total Records</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">{total}</span>
            <span className="text-xs text-slate-500 font-mono">records</span>
          </div>
        </div>

        {/* Child */}
        <div className="bg-slate-800/60 border border-emerald-500/20 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-medium">CHILD [0]</span>
            <Baby className="w-4 h-4" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-mono">{childCount}</span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              {childPct}%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Age ≤ 12 yrs</div>
        </div>

        {/* Teen */}
        <div className="bg-slate-800/60 border border-amber-500/20 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs font-medium">TEEN [1]</span>
            <School className="w-4 h-4" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-mono">{teenCount}</span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
              {teenPct}%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Age 13 – 18 yrs</div>
        </div>

        {/* Adult */}
        <div className="bg-slate-800/60 border border-sky-500/20 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-sky-400 mb-1">
            <span className="text-xs font-medium">ADULT [2]</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-mono">{adultCount}</span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">
              {adultPct}%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Age &gt; 18 yrs</div>
        </div>

        {/* Average Age */}
        <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-3.5 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-indigo-400 mb-1">
            <span className="text-xs font-medium">Average Age</span>
            <Activity className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white font-mono">{avgAge}</span>
            <span className="text-xs text-slate-400">years old</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">in {referenceYear}</div>
        </div>
      </div>

      {/* Distribution visual bar */}
      {total > 0 && (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 text-xs">
          <div className="flex justify-between items-center mb-1.5 text-slate-400 text-[11px]">
            <span>Category Ratio</span>
            <span className="font-mono text-slate-500">
              {childCount} Child • {teenCount} Teen • {adultCount} Adult
            </span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${childPct}%` }}
              className="bg-emerald-500 transition-all duration-300"
              title={`Child: ${childPct}%`}
            />
            <div
              style={{ width: `${teenPct}%` }}
              className="bg-amber-500 transition-all duration-300"
              title={`Teen: ${teenPct}%`}
            />
            <div
              style={{ width: `${adultPct}%` }}
              className="bg-sky-500 transition-all duration-300"
              title={`Adult: ${adultPct}%`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
