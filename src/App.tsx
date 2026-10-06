import React, { useState, useEffect } from 'react';
import { Person, DEFAULT_REFERENCE_YEAR } from './types/person';
import {
  parsePersonsText,
  exportPersonsToTxt,
  INITIAL_PERSONS_RAW,
  getPersonCategory,
} from './services/personApi';
import { Header, ActiveTabType } from './components/Header';
import { CategoryDistribution } from './components/CategoryDistribution';
import { PersonTable } from './components/PersonTable';
import { PersonFormModal } from './components/PersonFormModal';
import { FileEditorModal } from './components/FileEditorModal';
import { ConsoleViewer } from './components/ConsoleViewer';
import { CppSourceInspector } from './components/CppSourceInspector';
import { OutputFilesViewer } from './components/OutputFilesViewer';
import { AssignmentCard } from './components/AssignmentCard';

const LOCAL_STORAGE_KEY = 'cpp_lab1_persons_v2';
const LOCAL_STORAGE_YEAR_KEY = 'cpp_lab1_ref_year_v2';

export const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load persons from localStorage', e);
    }
    const { persons: initial } = parsePersonsText(INITIAL_PERSONS_RAW, DEFAULT_REFERENCE_YEAR);
    return initial;
  });

  const [referenceYear, setReferenceYear] = useState<number>(() => {
    try {
      const savedYear = localStorage.getItem(LOCAL_STORAGE_YEAR_KEY);
      if (savedYear) {
        return parseInt(savedYear, 10);
      }
    } catch {
      // ignore
    }
    return DEFAULT_REFERENCE_YEAR;
  });

  const [activeTab, setActiveTab] = useState<ActiveTabType>('outputFiles');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isRawEditorOpen, setIsRawEditorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persons));
    } catch {
      // ignore
    }
  }, [persons]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_YEAR_KEY, referenceYear.toString());
    } catch {
      // ignore
    }
  }, [referenceYear]);

  // Recalculate categories if reference year changes
  const handleReferenceYearChange = (newYear: number) => {
    setReferenceYear(newYear);
    setPersons((prev) =>
      prev.map((p) => ({
        ...p,
        category: getPersonCategory(p.birthYear, newYear),
      }))
    );
    showToast(`Опорный год изменен на ${newYear}. Категории обновлены.`);
  };

  const handleAddPerson = () => {
    setEditingPerson(null);
    setIsFormModalOpen(true);
  };

  const handleEditPerson = (person: Person) => {
    setEditingPerson(person);
    setIsFormModalOpen(true);
  };

  const handleSavePerson = (personToSave: Person) => {
    if (editingPerson) {
      setPersons((prev) =>
        prev.map((p) => (p.id === personToSave.id ? personToSave : p))
      );
      showToast(`Запись ${personToSave.lastName} ${personToSave.firstName} обновлена`);
    } else {
      setPersons((prev) => [personToSave, ...prev]);
      showToast(`Добавлена новая запись: ${personToSave.lastName} ${personToSave.firstName}`);
    }
  };

  const handleDeletePerson = (id: string) => {
    const toDelete = persons.find((p) => p.id === id);
    setPersons((prev) => prev.filter((p) => p.id !== id));
    showToast(`Запись ${toDelete ? `${toDelete.lastName} ${toDelete.firstName}` : ''} удалена`);
  };

  const handleReset = () => {
    const { persons: resetData } = parsePersonsText(INITIAL_PERSONS_RAW, referenceYear);
    setPersons(resetData);
    showToast('Восстановлены исходные данные из Задания 1 (persons.txt)');
  };

  const handleExportTxt = () => {
    const content = exportPersonsToTxt(persons);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'persons.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Файл persons.txt скачан');
  };

  const handleApplyRawContent = (updated: Person[]) => {
    setPersons(updated);
    showToast(`Успешно загружено ${updated.length} записей из persons.txt`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-lg border border-indigo-400/40 text-xs font-medium animate-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <Header
        referenceYear={referenceYear}
        onReferenceYearChange={handleReferenceYearChange}
        onReset={handleReset}
        onExport={handleExportTxt}
        onOpenRawEditor={() => setIsRawEditorOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Category Stats and Summary Bar */}
        <CategoryDistribution persons={persons} referenceYear={referenceYear} />

        {/* Tab Views */}
        {activeTab === 'outputFiles' && (
          <OutputFilesViewer persons={persons} referenceYear={referenceYear} />
        )}

        {activeTab === 'persons' && (
          <PersonTable
            persons={persons}
            referenceYear={referenceYear}
            onAddPerson={handleAddPerson}
            onEditPerson={handleEditPerson}
            onDeletePerson={handleDeletePerson}
            onReset={handleReset}
          />
        )}

        {activeTab === 'console' && (
          <ConsoleViewer persons={persons} referenceYear={referenceYear} />
        )}

        {activeTab === 'cppSource' && <CppSourceInspector />}

        {activeTab === 'assignment' && <AssignmentCard />}
      </main>

      {/* Modals */}
      <PersonFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSavePerson}
        initialPerson={editingPerson}
        referenceYear={referenceYear}
      />

      <FileEditorModal
        isOpen={isRawEditorOpen}
        onClose={() => setIsRawEditorOpen(false)}
        persons={persons}
        referenceYear={referenceYear}
        onApply={handleApplyRawContent}
      />
    </div>
  );
};

export default App;
