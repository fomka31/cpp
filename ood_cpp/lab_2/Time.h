#ifndef TIME_H
#define TIME_H

#include <iostream>
#include <string>

/**
 * @class Time
 * @brief Класс для представления и манипуляции временем (часы, минуты, секунды).
 */
class Time {
private:
    int hours;   ///< Число часов [0..23]
    int minutes; ///< Число минут [0..59]
    int seconds; ///< Число секунд [0..59]

    void normalize();

public:
    Time();
    Time(int h, int m = 0, int s = 0);

    int getHours() const;
    int getMinutes() const;
    int getSeconds() const;
    void setTime(int h, int m, int s);

    void info() const;
    std::string toString() const;
    int toSeconds() const;

    Time& addSeconds(int s);
    Time& subtractSeconds(int s);
    Time& addTime(const Time& other);
    Time& subtractTime(const Time& other);

    bool operator<(const Time& other) const;
    bool operator<=(const Time& other) const;
    bool operator>(const Time& other) const;
    bool operator>=(const Time& other) const;
    bool operator==(const Time& other) const;
    bool operator!=(const Time& other) const;

    static Time fromString(const std::string& str);
};

#endif // TIME_H