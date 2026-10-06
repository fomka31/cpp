import React, { useState, useEffect } from 'react';
import { Person } from '../types/person';
import { exportPersonsToTxt, parsePersonsText, INITIAL_PERSONS_RAW } from '../services/personApi';
import { X, FileText, Check, AlertCircle, RotateCcw } from 'lucide-react';

interface FileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  persons: Person[];
  referenceYear: number;
  onApply: (updatedPersons: Person[]) => void;
}

export const FileEditorModal: React.FC<FileEditorModalProps> = ({
  isOpen,
  onClose,
  persons,
  referenceYear,
  onApply,
}) => {
  const [content, setContent] = useState('');
  const [parseErrors, setParseErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setContent(exportPersonsToTxt(persons));
      setParseErrors([]);
    }
  }, [isOpen, persons]);

  if (!isOpen) return null;

  const handleApply = () => {
    const { persons: parsedPersons, errors } = parsePersonsText(content, referenceYear);
    if (errors.length > 0) {
      setParseErrors(errors);
      return;
    }
    onApply(parsedPersons);
    onClose();
  };

  const handleResetToLabDefault = () => {
    setContent(INITIAL_PERSONS_RAW);
    setParseErrors([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-semibold text-white">
                Edit persons.txt
              </h3>
              <p className="text-xs text-slate-400">
                Direct file representation parsed by std::ifstream in main.cpp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-400 bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <span>
              Format: <code className="text-indigo-300 font-mono">LastName FirstName BirthYear</code> (one per line)
            </span>
            <button
              onClick={handleResetToLabDefault}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Original Lab Sample</span>
            </button>
          </div>

          <div>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setParseErrors([]);
              }}
              placeholder={`Ivanov Ivan 2009\nPedrov Pedr 2015\nSidorov Sidr 1999`}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          {parseErrors.length > 0 && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>Parsing Errors Found:</span>
              </div>
              <ul className="text-xs text-rose-300 list-disc list-inside space-y-0.5">
                {parseErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Apply and Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};
