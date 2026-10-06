#include "Time.h"
#include "Flight.h"
#include <iostream>
#include <fstream>
#include <vector>
#include <iomanip>

int main() {
    // Настройка корректного вывода символов (UTF-8)
    std::cout << "=====================================================\n";
    std::cout << "   ДЕМОНСТРАЦИЯ РАБОТЫ КЛАССА Time И РАСПИСАНИЯ      \n";
    std::cout << "=====================================================\n\n";

    // 1. Демонстрация конструкторов и метода info()
    std::cout << "[1] КОНСТРУКТОРЫ И МЕТОД info():\n";
    Time defaultTime; // По умолчанию: 00:00:00
    std::cout << "Время по умолчанию t0: ";
    defaultTime.info();

    // Важное требование ТЗ: "выводить ведущие нули, например, 05:02:09, а не 5:2:9"
    Time specificTime(5, 2, 9);
    std::cout << "Время с ведущими нулями t1 (5ч, 2м, 9с): ";
    specificTime.info();

    Time customTime(14, 45, 30);
    std::cout << "Время t2 (14ч, 45м, 30с): ";
    customTime.info();
    std::cout << "\n";

    // 2. Демонстрация секунд от начала суток (toSeconds)
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
    std::cout << "A + B (с нормализацией): ";
    sumAB.info();

    Time diffAB = timeA;
    diffAB.subtractTime(timeB);
    std::cout << "A - B: ";
    diffAB.info();
    std::cout << "\n";

    // 5. Чтение расписания самолётов из файла и фильтрация по интервалу
    std::cout << "[5] РАБОТА С ФАЙЛОМ РАСПИСАНИЯ САМОЛЁТОВ:\n";
    std::string filename = "flights.txt";
    std::ifstream file(filename);

    if (!file.is_open()) {
        std::cerr << "Ошибка: не удалось открыть файл " << filename << std::endl;
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

    std::cout << "Успешно загружено рейсов из файла: " << flights.size() << "\n\n";
    std::cout << "--- Полное расписание самолетов ---\n";
    std::cout << std::left << std::setw(10) << "Рейс"
              << std::setw(20) << "Направление"
              << " Время\n";
    std::cout << "--------------------------------------\n";
    for (const auto& flight : flights) {
        flight.print();
    }
    std::cout << "\n";

    // Заданный интервал времени для фильтрации рейсов (по ТЗ: можно задавать непосредственно в тексте программы)
    Time intervalStart(10, 0, 0);
    Time intervalEnd(13, 0, 0);

    std::cout << "Рейсы, отправляющиеся в интервале от "
              << intervalStart.toString() << " до " << intervalEnd.toString() << ":\n";
    std::cout << "--------------------------------------\n";

    int countFound = 0;
    for (const auto& flight : flights) {
        if (flight.isDepartureBetween(intervalStart, intervalEnd)) {
            flight.print();
            countFound++;
        }
    }

    if (countFound == 0) {
        std::cout << "В указанный интервал времени рейсов не найдено.\n";
    }

    std::cout << "--------------------------------------\n";
    std::cout << "Найдено рейсов в интервале: " << countFound << "\n\n";

    return 0;
}