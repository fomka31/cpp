#ifndef FLIGHT_H
#define FLIGHT_H

#include "Time.h"
#include <string>
#include <iostream>

class Flight {
private:
    std::string flightNumber;
    std::string destination;
    Time departureTime;

public:
    Flight();
    Flight(const std::string& number, const std::string& dest, const Time& time);

    std::string getFlightNumber() const;
    std::string getDestination() const;
    Time getDepartureTime() const;

    void print() const;
    bool isDepartureBetween(const Time& startTime, const Time& endTime) const;
    static bool parseLine(const std::string& line, Flight& outFlight);
};

#endif // FLIGHT_H