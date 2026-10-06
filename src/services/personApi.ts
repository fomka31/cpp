import { Person, PersonCategory, DEFAULT_REFERENCE_YEAR, CATEGORY_INFO } from '../types/person';

/**
 * Реализация функции getPersonCategory(Person person) согласно Заданию 1:
 * Вход: переменная типа Person, выход: возрастная категория PersonCategory.
 * 
 * Правила распределения по заданию:
 * - дети (до 12 лет) -> CHILD (0)
 * - подростки (от 13 до 18 лет) -> TEEN (1)
 * - взрослые (старше 18 лет) -> ADULT (2)
 */
export function getPersonCategory(
  birthYear: number,
  referenceYear: number = DEFAULT_REFERENCE_YEAR
): PersonCategory {
  const age = referenceYear - birthYear;
  if (age <= 12) {
    return PersonCategory.CHILD;
  } else if (age <= 18) {
    return PersonCategory.TEEN;
  } else {
    return PersonCategory.ADULT;
  }
}

export function calculateAge(
  birthYear: number,
  referenceYear: number = DEFAULT_REFERENCE_YEAR
): number {
  return referenceYear - birthYear;
}

/**
 * Исходный список людей из Задания 1:
 * "Иванов Иван 2007
 *  Петров Пётр 2015
 *  Сидорова Ольга 1999"
 */
export const INITIAL_PERSONS_RAW = `Иванов Иван 2007
Петров Пётр 2015
Сидорова Ольга 1999`;

let idCounter = 1;
export function generatePersonId(): string {
  return `person-${Date.now()}-${idCounter++}`;
}

export function parsePersonsText(
  text: string,
  referenceYear: number = DEFAULT_REFERENCE_YEAR
): { persons: Person[]; errors: string[] } {
  const lines = text.split(/\r?\n/);
  const persons: Person[] = [];
  const errors: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return; // пропуск пустых строк

    // Формат: Фамилия Имя ГодРождения
    const parts = trimmed.split(/\s+/);
    if (parts.length < 3) {
      errors.push(`Строка ${index + 1}: Неверный формат. Ожидается: Фамилия Имя ГодРождения. Получено: "${trimmed}"`);
      return;
    }

    const [lastName, firstName, yearStr] = parts;
    const birthYear = parseInt(yearStr, 10);

    if (isNaN(birthYear) || birthYear < 1900 || birthYear > referenceYear) {
      errors.push(`Строка ${index + 1}: Некорректный год рождения "${yearStr}" (должен быть от 1900 до ${referenceYear}).`);
      return;
    }

    const category = getPersonCategory(birthYear, referenceYear);

    persons.push({
      id: generatePersonId(),
      firstName,
      lastName,
      birthYear,
      category,
    });
  });

  return { persons, errors };
}

export function exportPersonsToTxt(persons: Person[]): string {
  // Формат файла persons.txt: "Фамилия Имя ГодРождения"
  return persons
    .map((p) => `${p.lastName} ${p.firstName} ${p.birthYear}`)
    .join('\n');
}

/**
 * Создание содержимого 3-х целевых файлов согласно Заданию 1:
 * - children.txt (дети до 12 лет)
 * - teens.txt (подростки 13-18 лет)
 * - adults.txt (взрослые старше 18 лет)
 */
export interface OutputFilesBundle {
  childrenTxt: string;
  teensTxt: string;
  adultsTxt: string;
  childrenPersons: Person[];
  teenPersons: Person[];
  adultPersons: Person[];
}

export function generateOutputFiles(
  persons: Person[],
  referenceYear: number = DEFAULT_REFERENCE_YEAR
): OutputFilesBundle {
  const childrenPersons: Person[] = [];
  const teenPersons: Person[] = [];
  const adultPersons: Person[] = [];

  persons.forEach((person) => {
    const category = getPersonCategory(person.birthYear, referenceYear);
    if (category === PersonCategory.CHILD) {
      childrenPersons.push(person);
    } else if (category === PersonCategory.TEEN) {
      teenPersons.push(person);
    } else {
      adultPersons.push(person);
    }
  });

  const formatList = (list: Person[]) =>
    list.map((p) => `${p.lastName} ${p.firstName} ${p.birthYear}`).join('\n');

  return {
    childrenTxt: formatList(childrenPersons),
    teensTxt: formatList(teenPersons),
    adultsTxt: formatList(adultPersons),
    childrenPersons,
    teenPersons,
    adultPersons,
  };
}

/**
 * Имитация работы консольной программы C++ main.cpp
 */
export function simulateCppConsoleOutput(
  persons: Person[],
  referenceYear: number = DEFAULT_REFERENCE_YEAR
): string {
  if (persons.length === 0) {
    return '[Console] Файл persons.txt пуст. Записей не обнаружено.\nProcess finished with exit code 0.';
  }

  const lines: string[] = [
    `$ g++ main.cpp person.cpp -o main && ./main`,
    `[INFO] Очищены результирующие файлы: children.txt, teens.txt, adults.txt`,
    `[INFO] Чтение файла persons.txt (опорный год: ${referenceYear})...`,
    '----------------------------------------------------------------------',
  ];

  persons.forEach((person) => {
    const cat = getPersonCategory(person.birthYear, referenceYear);
    const catInfo = CATEGORY_INFO[cat];
    lines.push(
      `${person.lastName} ${person.firstName} ${person.birthYear} -> Категория: ${cat} (${catInfo.label}) -> Записано в ${catInfo.fileName}`
    );
  });

  lines.push('----------------------------------------------------------------------');
  const bundle = generateOutputFiles(persons, referenceYear);
  lines.push(
    `[РЕЗУЛЬТАТ] Обработка успешно завершена:`
  );
  lines.push(`  • children.txt: ${bundle.childrenPersons.length} записей`);
  lines.push(`  • teens.txt:    ${bundle.teenPersons.length} записей`);
  lines.push(`  • adults.txt:   ${bundle.adultPersons.length} записей`);
  lines.push(`Process finished with exit code 0.`);
  return lines.join('\n');
}

export const LAB_TASK_DESCRIPTION = {
  title: 'Задание 1: Знакомство со структурой программ на C++, структурами и перечислениями',
  goal: 'Ознакомление с основными алгоритмическими конструкциями языка и средствами создания типов данных, определяемых разработчиком: структурами (struct), перечислениями (enum).',
  requirements: [
    'Текстовый файл со списком людей вида: Фамилия Имя ГодРождения (в столбик через пробел).',
    'Создать три других файла: дети (до 12 лет), подростки (от 13 до 18 лет) и взрослые (старше 18 лет).',
    'Имена файлов могут задаваться жестко в тексте программы: children.txt, teens.txt, adults.txt.',
    'Использовать два типа данных: перечисление PersonCategory {CHILD, TEEN, ADULT} и структуру Person (firstname, sirname/lastName, birthYear, category).',
    'Обязательно определить функцию 1: PersonCategory getPersonCategory(Person person) — определяет категорию.',
    'Обязательно определить функцию 2: void savePersonToFile(Person person) — записывает данные в нужный файл согласно категории.',
  ],
};

export const CPP_SOURCE_CODE = {
  personapi_h: `#ifndef PERSONAPI_H
#define PERSONAPI_H

#include <iostream>
#include <string>

// 1. Перечисление PersonCategory {CHILD, TEEN, ADULT}
enum PersonCategory { CHILD, TEEN, ADULT };

// 2. Структура Person
struct Person
{
    std::string firstName;
    std::string lastName;
    int birthYear;
    PersonCategory pCategory;
};

// Обязательные функции согласно заданию:
// 1. Функция, определяющая возрастную категорию человека
PersonCategory getPersonCategory(Person person);

// 2. Функция, записывающая данные о человеке в нужный файл
void savePersonToFile(Person person);

#endif`,

  person_cpp: `#include <fstream>
#include <string>
#include "personapi.h"

// 1. Определение возрастной категории человека
PersonCategory getPersonCategory(Person person) {
    int currentYear = 2026;
    int age = currentYear - person.birthYear;

    if (age <= 12) 
    {
        return PersonCategory::CHILD;
    }
    else if (age <= 18) 
    {
        return PersonCategory::TEEN;
    }
    else 
    {
        return PersonCategory::ADULT;
    }
}

// 2. Запись данных о человеке в нужный файл согласно возрастной категории
void savePersonToFile(Person person) {
    std::string filename;
    switch (person.pCategory) {
        case PersonCategory::CHILD:
            filename = "children.txt";
            break;
        case PersonCategory::TEEN:
            filename = "teens.txt";
            break;
        case PersonCategory::ADULT:
            filename = "adults.txt";
            break;
    }

    // Открываем файл в режиме добавления (append)
    std::ofstream outFile(filename, std::ios::app);
    if (outFile.is_open()) {
        outFile << person.lastName << " " 
                << person.firstName << " " 
                << person.birthYear << "\\n";
        outFile.close();
    }
}`,

  main_cpp: `#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include "personapi.h"
#include "person.cpp"

int main() 
{
    // Очищаем результирующие файлы перед началом работы
    std::ofstream("children.txt", std::ios::trunc).close();
    std::ofstream("teens.txt", std::ios::trunc).close();
    std::ofstream("adults.txt", std::ios::trunc).close();

    std::ifstream file("persons.txt");
    if (!file.is_open()) 
    {
        std::cerr << "Не удалось открыть файл persons.txt" << std::endl;
        return 1;
    }

    std::string line;

    while (std::getline(file, line))
    {
        if (line.empty()) continue;

        std::string word;
        Person person;

        std::stringstream ss(line);

        // Формат: Фамилия Имя ГодРождения
        ss >> person.lastName;
        ss >> person.firstName;
        ss >> word;

        if (word.empty()) continue;
        person.birthYear = std::stoi(word);

        // 1. Определяем возрастную категорию
        person.pCategory = getPersonCategory(person);

        // 2. Записываем данные в нужный файл согласно категории
        savePersonToFile(person);

        std::cout << person.lastName << " "
                  << person.firstName << " "
                  << person.birthYear << " -> Категория: "
                  << person.pCategory << std::endl;
    }

    file.close();
    std::cout << "Обработка завершена. Данные распределены по файлам children.txt, teens.txt, adults.txt" << std::endl;
    return 0;
}`,

  persons_txt: `Иванов Иван 2007
Петров Пётр 2015
Сидорова Ольга 1999`,
};
