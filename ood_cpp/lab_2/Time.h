#ifndef TIME_H
#define TIME_H

#include <iostream>
#include <string>

/**
 * @class Time
 * @brief Класс для представления и манипуляции временем (часы, минуты, секунды).
 * 
 * Обеспечивает инкапсуляцию, корректную нормализацию (0-23ч, 0-59м, 0-59с),
 * а также базовые арифметические операции над временем.
 */
class Time {
private:
    int hours;   ///< Число часов [0..23]
    int minutes; ///< Число минут [0..59]
    int seconds; ///< Число секунд [0..59]

    /**
     * @brief Приводит время к нормальному виду (секунды и минуты в пределах [0..59], часы [0..23]).
     * Корректно обрабатывает переполнения и отрицательные значения.
     */
    void normalize();

public:
    // Конструктор по умолчанию (00:00:00)
    Time();

    // Параметризованный конструктор с аргументами по умолчанию
    Time(int h, int m = 0, int s = 0);

    // Геттеры элементов-данных
    int getHours() const;
    int getMinutes() const;
    int getSeconds() const;

    // Сеттеры элементов-данных (с автоматической нормализацией)
    void setTime(int h, int m, int s);

    /**
     * @brief Выводит время в формате ЧЧ:ММ:СС с ведущими нулями (например, 05:02:09)
     */
    void info() const;

    /**
     * @brief Возвращает строковое представление в формате ЧЧ:ММ:СС
     */
    std::string toString() const;

    /**
     * @brief Возвращает время в секундах от начала суток [0..86399].
     */
    int toSeconds() const;

    /**
     * @brief Добавление к текущему моменту времени заданного числа секунд.
     * @param s Число секунд для добавления
     * @return Ссылка на текущий объект
     */
    Time& addSeconds(int s);

    /**
     * @brief Вычитание из текущего момента времени заданного числа секунд.
     * @param s Число секунд для вычитания
     * @return Ссылка на текущий объект
     */
    Time& subtractSeconds(int s);

    /**
     * @brief Добавление к текущему моменту времени другого времени.
     * @param other Другой объект Time
     * @return Ссылка на текущий объект
     */
    Time& addTime(const Time& other);

    /**
     * @brief Вычитание из текущего момента времени другого времени.
     * @param other Другой объект Time
     * @return Ссылка на текущий объект
     */
    Time& subtractTime(const Time& other);

    // Операторы сравнения для удобной фильтрации по интервалам
    bool operator<(const Time& other) const;
    bool operator<=(const Time& other) const;
    bool operator>(const Time& other) const;
    bool operator>=(const Time& other) const;
    bool operator==(const Time& other) const;
    bool operator!=(const Time& other) const;

    // Статический метод создания времени из строки "ЧЧ:ММ" или "ЧЧ:ММ:СС"
    static Time fromString(const std::string& str);
};

#endif // TIME_H