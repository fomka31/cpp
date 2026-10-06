#include "Time.h"
#include <iostream>
#include <fstream>
#include <string>
#include <vector>

#ifdef _WIN32
#include <windows.h>
#endif

// Простая структура рейса
struct Flight {
    std::string number;
    std::string destination;
    Time departure;
};

int main() {
    // Поддержка русского языка UTF-8 в консоли Windows
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
    system("chcp 65001 > nul");
#endif

    // 1. Конструкторы и метод info()
    std::cout << "[1] КОНСТРУКТОРЫ И МЕТОД info():\n";
    Time t0;
    std::cout << "По умолчанию: ";
    t0.info();

    Time t1(5, 2, 9); // Ведущие нули по ТЗ: 05:02:09
    std::cout << "С ведущими нулями (5, 2, 9): ";
    t1.info();

    Time t2(14, 45, 30);
    std::cout << "Время (14, 45, 30): ";
    t2.info();
    std::cout << "\n";

    // 2. Секунды от начала суток
    std::cout << "[2] СЕКУНДЫ ОТ НАЧАЛА СУТОК:\n";
    std::cout << "t1 в секундах: " << t1.toSeconds() << " с.\n";
    std::cout << "t2 в секундах: " << t2.toSeconds() << " с.\n\n";

    // 3. Добавление и вычитание секунд
    std::cout << "[3] ОПЕРАЦИИ С СЕКУНДАМИ:\n";
    Time t3(10, 15, 0);
    std::cout << "Исходное: ";
    t3.info();

    t3.addSeconds(125);
    std::cout << "+125 секунд: ";
    t3.info();

    t3.subtractSeconds(3600);
    std::cout << "-3600 секунд (1 час): ";
    t3.info();
    std::cout << "\n";

    // 4. Сложение и вычитание времени
    std::cout << "[4] СЛОЖЕНИЕ И ВЫЧИТАНИЕ ВРЕМЕНИ:\n";
    Time a(2, 45, 50);
    Time b(1, 20, 30);
    std::cout << "Время A: "; a.info();
    std::cout << "Время B: "; b.info();

    Time sum = a;
    sum.addTime(b);
    std::cout << "A + B: ";
    sum.info();

    Time diff = a;
    diff.subtractTime(b);
    std::cout << "A - B: ";
    diff.info();
    std::cout << "\n";

    // 5. Чтение расписания из файла и парсинг через stoi
    std::cout << "[5] РАСПИСАНИЕ САМОЛЁТОВ ИЗ flights.txt:\n";
    std::ifstream file("flights.txt");
    if (!file.is_open()) {
        std::cerr << "Не удалось открыть файл flights.txt\n";
        return 1;
    }

    std::vector<Flight> flights;
    std::string number, destination, timeStr;

    // Считываем строку формата: SU3854 Красноярск 12:40
    while (file >> number >> destination >> timeStr) {
        // Парсинг времени через substr и std::stoi (по подсказке к заданию)
        size_t colon = timeStr.find(':');
        int hours = std::stoi(timeStr.substr(0, colon));
        int minutes = std::stoi(timeStr.substr(colon + 1));

        flights.push_back({number, destination, Time(hours, minutes, 0)});
    }
    file.close();

    // Вывод всех рейсов
    std::cout << "Все рейсы в файле:\n";
    for (const auto& f : flights) {
        std::cout << f.number << "\t" << f.destination << "\t" << f.departure.toString() << "\n";
    }
    std::cout << "\n";

    // 6. Вывод рейсов в интервале (от 10:00 до 13:00)
    Time startInterval(10, 0, 0);
    Time endInterval(13, 0, 0);

    std::cout << "Рейсы в интервале от " << startInterval.toString() << " до " << endInterval.toString() << ":\n";
    int count = 0;
    for (const auto& f : flights) {
        int depSec = f.departure.toSeconds();
        if (depSec >= startInterval.toSeconds() && depSec <= endInterval.toSeconds()) {
            std::cout << f.number << "\t" << f.destination << "\t" << f.departure.toString() << "\n";
            count++;
        }
    }
    std::cout << "Найдено рейсов: " << count << "\n";

    return 0;
}