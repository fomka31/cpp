#include <iostream>
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
}
