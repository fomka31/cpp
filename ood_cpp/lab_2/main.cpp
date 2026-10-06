#include "Time.h"
#include "Flight.h"
#include <iostream>
#include <fstream>
#include <vector>
#include <iomanip>

int main() {
    std::cout << "=====================================================\n";
    std::cout << "   ДЕМОНСТРАЦИЯ РАБОТЫ КЛАССА Time И РАСПИСАНИЯ      \n";
    std::cout << "=====================================================\n\n";

    // 1. Конструкторы и метод info()
    std::cout << "[1] КОНСТРУКТОРЫ И МЕТОД info():\n";
    Time defaultTime;
    std::cout << "Время по умолчанию t0: ";
    defaultTime.info();

    // Требование ТЗ: "05:02:09, а не 5:2:9"
    Time specificTime(5, 2, 9);
    std::cout << "Время с ведущими нулями t1 (5ч, 2м, 9с): ";
    specificTime.info();

    Time customTime(14, 45, 30);
    std::cout << "Время t2 (14ч, 45м, 30с): ";
    customTime.info();
    std::cout << "\n";

    // 2. Время в секундах от начала суток (toSeconds)
    std::cout << "[2] ВРЕМЯ В СЕКУНДАХ ОТ НАЧАЛА СУТОК:\n";
    std::cout << "t1 в секундах от начала суток: " << specificTime.toSeconds() << " с.\n";
    std::cout << "t2 в секундах от начала суток: " << customTime.toSeconds() << " с.\n\n";

    // 3. Добавление и вычитание секунд
    std::cout << "[3] ДОБАВЛЕНИЕ И ВЫЧИТАНИЕ СЕКУНД:\n";
    Time t3(10, 15, 0);
    std::cout << "Исходное t3: ";
    t3.info();

    std::cout << "Добавим 125 секунд к t3: ";
    t3.addSeconds(125);
    t3.info();

    std::cout << "Вычтем 3600 секунд (1 час) из t3: ";
    t3.subtractSeconds(3600);
    t3.info();
    std::cout << "\n";

    // 4. Добавление и вычитание другого времени
    std::cout << "[4] СЛОЖЕНИЕ И ВЫЧИТАНИЕ ВРЕМЕНИ:\n";
    Time timeA(2, 45, 50);
    Time timeB(1, 20, 30);
    std::cout << "Время A: "; timeA.info();
    std::cout << "Время B: "; timeB.info();

    Time sumAB = timeA;
    sumAB.addTime(timeB);
    std::cout << "A + B: ";
    sumAB.info();

    Time diffAB = timeA;
    diffAB.subtractTime(timeB);
    std::cout << "A - B: ";
    diffAB.info();
    std::cout << "\n";

    // 5. Чтение расписания из файла и фильтрация
    std::cout << "[5] РАСПИСАНИЕ САМОЛЁТОВ ИЗ flights.txt:\n";
    std::ifstream file("flights.txt");
    if (!file.is_open()) {
        std::cerr << "Ошибка открытия flights.txt\n";
        return 1;
    }

    std::vector<Flight> flights;
    std::string line;
    while (std::getline(file, line)) {
        Flight f;
        if (Flight::parseLine(line, f)) {
            flights.push_back(f);
        }
    }
    file.close();

    std::cout << "Всего рейсов в файле: " << flights.size() << "\n";
    std::cout << "--------------------------------------\n";
    for (const auto& flight : flights) {
        flight.print();
    }
    std::cout << "\n";

    // Заданный интервал времени
    Time intervalStart(10, 0, 0);
    Time intervalEnd(13, 0, 0);

    std::cout << "Рейсы в интервале от "
              << intervalStart.toString() << " до " << intervalEnd.toString() << ":\n";
    std::cout << "--------------------------------------\n";

    int countFound = 0;
    for (const auto& flight : flights) {
        if (flight.isDepartureBetween(intervalStart, intervalEnd)) {
            flight.print();
            countFound++;
        }
    }

    std::cout << "--------------------------------------\n";
    std::cout << "Найдено рейсов: " << countFound << "\n\n";

    return 0;
}