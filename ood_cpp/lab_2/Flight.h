#ifndef FLIGHT_H
#define FLIGHT_H

#include "Time.h"
#include <string>
#include <iostream>

/**
 * @class Flight
 * @brief Представляет информацию об авиарейсе:
 * номер рейса, пункт назначения и время отправления.
 */
class Flight {
private:
    std::string flightNumber; ///< Номер рейса (например, SU3854)
    std::string destination;  ///< Пункт назначения (например, Красноярск)
    Time departureTime;       ///< Время отправления

public:
    Flight();
    Flight(const std::string& number, const std::string& dest, const Time& time);

    std::string getFlightNumber() const;
    std::string getDestination() const;
    Time getDepartureTime() const;

    /**
     * @brief Выводит информацию о рейсе в форматированном виде
     */
    void print() const;

    /**
     * @brief Проверяет, попадает ли рейс в интервал [startTime, endTime] включительно
     */
    bool isDepartureBetween(const Time& startTime, const Time& endTime) const;

    /**
     * @brief Парсит одну строку файла формата: "SU3854 Красноярск 12:40"
     */
    static bool parseLine(const std::string& line, Flight& outFlight);
};

#endif // FLIGHT_H