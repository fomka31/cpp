#ifndef TIME_H
#define TIME_H

#include <iostream>
#include <string>

// Класс «время» по условию лабораторной работы
class Time {
private:
    int hours;   // Часы [0..23]
    int minutes; // Минуты [0..59]
    int seconds; // Секунды [0..59]

    // Нормализация времени (0-23ч, 0-59м, 0-59с)
    void normalize();

public:
    // Конструктор по умолчанию и с параметрами
    Time(int h = 0, int m = 0, int s = 0);

    // Вывод времени в формате ЧЧ:ММ:СС с ведущими нулями
    void info() const;
    std::string toString() const;

    // Время в секундах от начала суток
    int toSeconds() const;

    // Методы добавления и вычитания
    void addSeconds(int s);
    void subtractSeconds(int s);
    void addTime(const Time& other);
    void subtractTime(const Time& other);
};

#endif