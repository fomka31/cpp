#include "Flight.h"
#include <iomanip>
#include <sstream>

Flight::Flight() : flightNumber(""), destination(""), departureTime() {}

Flight::Flight(const std::string& number, const std::string& dest, const Time& time)
    : flightNumber(number), destination(dest), departureTime(time) {}

std::string Flight::getFlightNumber() const {
    return flightNumber;
}

std::string Flight::getDestination() const {
    return destination;
}

Time Flight::getDepartureTime() const {
    return departureTime;
}

void Flight::print() const {
    std::cout << std::left << std::setw(10) << flightNumber
              << std::setw(20) << destination
              << " " << departureTime.toString() << std::endl;
}

bool Flight::isDepartureBetween(const Time& startTime, const Time& endTime) const {
    int depSec = departureTime.toSeconds();
    int startSec = startTime.toSeconds();
    int endSec = endTime.toSeconds();

    if (startSec <= endSec) {
        return depSec >= startSec && depSec <= endSec;
    } else {
        // Если интервал переходит через полночь (например, 22:00 до 03:00)
        return depSec >= startSec || depSec <= endSec;
    }
}

bool Flight::parseLine(const std::string& line, Flight& outFlight) {
    if (line.empty()) {
        return false;
    }

    std::istringstream iss(line);
    std::string number;
    std::string dest;
    std::string timeStr;

    if (iss >> number >> dest >> timeStr) {
        Time depTime = Time::fromString(timeStr);
        outFlight = Flight(number, dest, depTime);
        return true;
    }

    return false;
}