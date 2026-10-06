import React, { useState, useMemo } from 'react';
import { Person, PersonCategory, CATEGORY_INFO } from '../types/person';
import { calculateAge } from '../services/personApi';
import { Search, Plus, Trash2, Edit3, ArrowUpDown, Filter, AlertCircle } from 'lucide-react';

interface PersonTableProps {
  persons: Person[];
  referenceYear: number;
  onAddPerson: () => void;
  onEditPerson: (person: Person) => void;
  onDeletePerson: (id: string) => void;
  onReset: () => void;
}

type SortField = 'lastName' | 'firstName' | 'birthYear' | 'category' | 'age';
type SortOrder = 'asc' | 'desc';

export const PersonTable: React.FC<PersonTableProps> = ({
  persons,
  referenceYear,
  onAddPerson,
  onEditPerson,
  onDeletePerson,
  onReset,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('lastName');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSorted = useMemo(() => {
    return persons
      .filter((person) => {
        // Category filter
        if (selectedCategory !== 'ALL') {
          const catNum = parseInt(selectedCategory, 10);
          if (person.category !== catNum) return false;
        }

        // Search term
        if (!searchTerm.trim()) return true;
        const query = searchTerm.toLowerCase();
        return (
          person.firstName.toLowerCase().includes(query) ||
          person.lastName.toLowerCase().includes(query) ||
          person.birthYear.toString().includes(query)
        );
      })
      .sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        if (sortField === 'lastName') {
          valA = a.lastName.toLowerCase();
          valB = b.lastName.toLowerCase();
        } else if (sortField === 'firstName') {
          valA = a.firstName.toLowerCase();
          valB = b.firstName.toLowerCase();
        } else if (sortField === 'birthYear') {
          valA = a.birthYear;
          valB = b.birthYear;
        } else if (sortField === 'category') {
          valA = a.category;
          valB = b.category;
        } else if (sortField === 'age') {
          valA = calculateAge(a.birthYear, referenceYear);
          valB = calculateAge(b.birthYear, referenceYear);
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [persons, searchTerm, selectedCategory, sortField, sortOrder, referenceYear]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/70 rounded-xl overflow-hidden shadow-sm">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-700/70 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by first/last name or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter and Add */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory(PersonCategory.CHILD.toString())}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                selectedCategory === PersonCategory.CHILD.toString()
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Child [0]
            </button>
            <button
              onClick={() => setSelectedCategory(PersonCategory.TEEN.toString())}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                selectedCategory === PersonCategory.TEEN.toString()
                  ? 'bg-amber-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Teen [1]
            </button>
            <button
              onClick={() => setSelectedCategory(PersonCategory.ADULT.toString())}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                selectedCategory === PersonCategory.ADULT.toString()
                  ? 'bg-sky-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Adult [2]
            </button>
          </div>

          <button
            onClick={onAddPerson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Person</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700 font-mono">
            <tr>
              <th
                onClick={() => toggleSort('lastName')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Last Name (Фамилия)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('firstName')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>First Name (Имя)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('birthYear')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Birth Year</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('age')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Calculated Age</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('category')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Category (Enum)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((person) => {
                const info = CATEGORY_INFO[person.category];
                const age = calculateAge(person.birthYear, referenceYear);

                return (
                  <tr
                    key={person.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3 px-4 font-medium text-slate-100 font-mono">
                      {person.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono">
                      {person.firstName}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      {person.birthYear}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className="text-slate-300 font-semibold">{age}</span>
                      <span className="text-slate-500 ml-1">yrs</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-medium"
                        style={{
                          backgroundColor: person.category === 0 ? 'rgba(16, 185, 129, 0.1)' : person.category === 1 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                          borderColor: person.category === 0 ? 'rgba(16, 185, 129, 0.3)' : person.category === 1 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(14, 165, 233, 0.3)',
                          color: person.category === 0 ? '#34d399' : person.category === 1 ? '#fbbf24' : '#38bdf8',
                        }}
                      >
                        <span>{info.label}</span>
                        <span className="text-[10px] opacity-75 font-mono px-1 rounded bg-slate-900/40">
                          code: {info.code}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onEditPerson(person)}
                          className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-700/60 transition-colors"
                          title="Edit person"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeletePerson(person.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 transition-colors"
                          title="Delete person"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-600" />
                    <p className="text-sm font-medium text-slate-400">No records found</p>
                    <p className="text-xs text-slate-600 max-w-sm">
                      {persons.length === 0
                        ? "The records file is currently empty. You can add new persons or restore the original lab dataset."
                        : "No persons match your current search and filter criteria."}
                    </p>
                    {persons.length === 0 && (
                      <button
                        onClick={onReset}
                        className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        Restore Lab 1 Sample Data
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-700/70 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-slate-200 font-mono">{filteredAndSorted.length}</strong> of <strong className="text-slate-200 font-mono">{persons.length}</strong> records</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-mono">
          <span>Format: <code className="text-slate-400">LastName FirstName BirthYear</code></span>
          <span>Age = {referenceYear} - BirthYear</span>
        </div>
      </div>
    </div>
  );
};
