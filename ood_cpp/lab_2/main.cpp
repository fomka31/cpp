#include "Time.h"
#include <iostream>
#include <fstream>
#include <string>

#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
    system("chcp 65001 > nul");
#endif

    // Демонстрация конструкторов и info()
    Time t1;
    std::cout << "Время по умолчанию: ";
    t1.info();

    Time t2(5, 2, 9);
    std::cout << "Время (05:02:09): ";
    t2.info();

    // Время в секундах от начала суток
    std::cout << "В секундах от начала суток: " << t2.toSeconds() << "\n";

    // Добавление и вычитание секунд
    t2.addSeconds(125);
    std::cout << "+125 секунд: ";
    t2.info();

    t2.subtractSeconds(3600);
    std::cout << "-3600 секунд: ";
    t2.info();

    // Сложение и вычитание другого времени
    Time t3(1, 20, 30);
    t2.addTime(t3);
    std::cout << "+ время (01:20:30): ";
    t2.info();

    t2.subtractTime(t3);
    std::cout << "- время (01:20:30): ";
    t2.info();

    // Вывод рейсов в интервале от 10:00:00 до 13:00:00
    std::cout << "\nРейсы от 10:00:00 до 13:00:00:\n";
    Time start(10, 0, 0);
    Time end(13, 0, 0);

    std::ifstream file("flights.txt");
    if (!file.is_open()) {
        std::cerr << "Ошибка открытия flights.txt\n";
        return 1;
    }

    std::string number, destination, timeStr;
    while (file >> number >> destination >> timeStr) {
        size_t colon = timeStr.find(':');
        int hours = std::stoi(timeStr.substr(0, colon));
        int minutes = std::stoi(timeStr.substr(colon + 1));
        Time dep(hours, minutes, 0);

        int depSec = dep.toSeconds();
        if (depSec >= start.toSeconds() && depSec <= end.toSeconds()) {
            std::cout << number << " " << destination << " " << dep.toString() << "\n";
        }
    }
    file.close();

    return 0;
}