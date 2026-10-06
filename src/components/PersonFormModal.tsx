import React, { useState, useEffect } from 'react';
import { Person, CATEGORY_INFO } from '../types/person';
import { getPersonCategory, calculateAge, generatePersonId } from '../services/personApi';
import { X, Check, Sparkles } from 'lucide-react';

interface PersonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (person: Person) => void;
  initialPerson?: Person | null;
  referenceYear: number;
}

export const PersonFormModal: React.FC<PersonFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPerson,
  referenceYear,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthYear, setBirthYear] = useState<number>(2010);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialPerson) {
      setFirstName(initialPerson.firstName);
      setLastName(initialPerson.lastName);
      setBirthYear(initialPerson.birthYear);
    } else {
      setFirstName('');
      setLastName('');
      setBirthYear(2010);
    }
    setErrors({});
  }, [initialPerson, isOpen]);

  if (!isOpen) return null;

  const currentCategory = getPersonCategory(birthYear, referenceYear);
  const categoryInfo = CATEGORY_INFO[currentCategory];
  const age = calculateAge(birthYear, referenceYear);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!birthYear || isNaN(birthYear)) {
      newErrors.birthYear = 'Valid birth year is required';
    } else if (birthYear < 1900 || birthYear > referenceYear) {
      newErrors.birthYear = `Birth year must be between 1900 and ${referenceYear}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const savedPerson: Person = {
      id: initialPerson ? initialPerson.id : generatePersonId(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthYear,
      category: currentCategory,
    };

    onSave(savedPerson);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-white">
              {initialPerson ? 'Edit Person Record' : 'Add New Person Record'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              C++ struct Person &amp; getPersonCategory evaluator
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Last Name (Фамилия) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Ivanov, Smith"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
            />
            {errors.lastName && (
              <p className="text-rose-400 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              First Name (Имя) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Ivan, John"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
            />
            {errors.firstName && (
              <p className="text-rose-400 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">
                Birth Year (Год рождения) <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                1900 – {referenceYear}
              </span>
            </div>
            <input
              type="number"
              required
              min={1900}
              max={referenceYear}
              value={birthYear}
              onChange={(e) => setBirthYear(parseInt(e.target.value, 10) || referenceYear)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {errors.birthYear && (
              <p className="text-rose-400 text-xs mt-1">{errors.birthYear}</p>
            )}
          </div>

          {/* Live C++ Evaluation Preview Box */}
          <div className="mt-4 p-3.5 bg-slate-800/50 border border-slate-700/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-medium text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live getPersonCategory() Result</span>
              </div>
              <span className="font-mono text-slate-500">
                {referenceYear} - {birthYear} = {age} yrs
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs text-slate-400">Evaluated Category:</span>
                <div className="text-sm font-bold font-mono text-slate-200 mt-0.5">
                  PersonCategory::{categoryInfo.label}
                </div>
              </div>

              <div
                className="px-3 py-1 rounded-lg border text-xs font-mono font-semibold"
                style={{
                  backgroundColor: currentCategory === 0 ? 'rgba(16, 185, 129, 0.15)' : currentCategory === 1 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(14, 165, 233, 0.15)',
                  borderColor: currentCategory === 0 ? 'rgba(16, 185, 129, 0.4)' : currentCategory === 1 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(14, 165, 233, 0.4)',
                  color: currentCategory === 0 ? '#34d399' : currentCategory === 1 ? '#fbbf24' : '#38bdf8',
                }}
              >
                Code: {categoryInfo.code} ({categoryInfo.label})
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-800">
              Rule: {age <= 12 ? 'age <= 12 → CHILD (0)' : age <= 18 ? 'age <= 18 → TEEN (1)' : 'age > 18 → ADULT (2)'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{initialPerson ? 'Save Changes' : 'Add to persons.txt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
