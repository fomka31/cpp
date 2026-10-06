#include "Time.h"
#include <iomanip>
#include <sstream>
#include <cmath>

// Конструктор по умолчанию: 00:00:00
Time::Time() : hours(0), minutes(0), seconds(0) {}

// Параметризованный конструктор с нормализацией
Time::Time(int h, int m, int s) : hours(h), minutes(m), seconds(s) {
    normalize();
}

/**
 * Нормализация времени:
 * Переводит все компоненты в общее число секунд от начала суток.
 * В сутках 24 * 3600 = 86400 секунд.
 * Корректно берет остаток от деления по модулю 86400, включая отрицательные секунды.
 */
void Time::normalize() {
    long long totalSec = static_cast<long long>(hours) * 3600 +
                         static_cast<long long>(minutes) * 60 +
                         seconds;

    const int SECONDS_PER_DAY = 24 * 3600;

    // В C++ остаток от деления отрицательного числа отрицательный,
    // поэтому приводим к положительному кольцу [0, SECONDS_PER_DAY - 1]
    totalSec = (totalSec % SECONDS_PER_DAY + SECONDS_PER_DAY) % SECONDS_PER_DAY;

    hours = static_cast<int>(totalSec / 3600);
    totalSec %= 3600;
    minutes = static_cast<int>(totalSec / 60);
    seconds = static_cast<int>(totalSec % 60);
}

int Time::getHours() const {
    return hours;
}

int Time::getMinutes() const {
    return minutes;
}

int Time::getSeconds() const {
    return seconds;
}

void Time::setTime(int h, int m, int s) {
    hours = h;
    minutes = m;
    seconds = s;
    normalize();
}

/**
 * Вывод времени в формате ЧЧ:ММ:СС с ведущими нулями
 */
void Time::info() const {
    std::cout << std::setfill('0')
              << std::setw(2) << hours << ":"
              << std::setw(2) << minutes << ":"
              << std::setw(2) << seconds << std::endl;
}

std::string Time::toString() const {
    std::ostringstream oss;
    oss << std::setfill('0')
        << std::setw(2) << hours << ":"
        << std::setw(2) << minutes << ":"
        << std::setw(2) << seconds;
    return oss.str();
}

/**
 * Возвращает время в секундах от начала суток
 */
int Time::toSeconds() const {
    return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Добавление к текущему моменту времени заданного числа секунд
 */
Time& Time::addSeconds(int s) {
    seconds += s;
    normalize();
    return *this;
}

/**
 * Вычитание из текущего момента времени заданного числа секунд
 */
Time& Time::subtractSeconds(int s) {
    seconds -= s;
    normalize();
    return *this;
}

/**
 * Добавление к текущему моменту времени другого времени
 */
Time& Time::addTime(const Time& other) {
    hours += other.hours;
    minutes += other.minutes;
    seconds += other.seconds;
    normalize();
    return *this;
}

/**
 * Вычитание из текущего момента времени другого времени
 */
Time& Time::subtractTime(const Time& other) {
    hours -= other.hours;
    minutes -= other.minutes;
    seconds -= other.seconds;
    normalize();
    return *this;
}

// Операторы сравнения
bool Time::operator<(const Time& other) const {
    return toSeconds() < other.toSeconds();
}

bool Time::operator<=(const Time& other) const {
    return toSeconds() <= other.toSeconds();
}

bool Time::operator>(const Time& other) const {
    return toSeconds() > other.toSeconds();
}

bool Time::operator>=(const Time& other) const {
    return toSeconds() >= other.toSeconds();
}

bool Time::operator==(const Time& other) const {
    return toSeconds() == other.toSeconds();
}

bool Time::operator!=(const Time& other) const {
    return toSeconds() != other.toSeconds();
}

/**
 * Парсер строки времени в формате ЧЧ:ММ или ЧЧ:ММ:СС
 */
Time Time::fromString(const std::string& str) {
    int h = 0, m = 0, s = 0;
    char colon1 = ':', colon2 = ':';
    std::istringstream iss(str);
    if (iss >> h >> colon1 >> m) {
        if (iss >> colon2 >> s) {
            return Time(h, m, s);
        }
        return Time(h, m, 0);
    }
    return Time(0, 0, 0);
}