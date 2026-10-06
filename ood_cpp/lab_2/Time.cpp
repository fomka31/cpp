#include "Time.h"
#include <iomanip>
#include <sstream>

Time::Time() : hours(0), minutes(0), seconds(0) {}

Time::Time(int h, int m, int s) : hours(h), minutes(m), seconds(s) {
    normalize();
}

void Time::normalize() {
    long long totalSec = static_cast<long long>(hours) * 3600 +
                         static_cast<long long>(minutes) * 60 +
                         seconds;

    const int SECONDS_PER_DAY = 24 * 3600;
    totalSec = (totalSec % SECONDS_PER_DAY + SECONDS_PER_DAY) % SECONDS_PER_DAY;

    hours = static_cast<int>(totalSec / 3600);
    totalSec %= 3600;
    minutes = static_cast<int>(totalSec / 60);
    seconds = static_cast<int>(totalSec % 60);
}

int Time::getHours() const { return hours; }
int Time::getMinutes() const { return minutes; }
int Time::getSeconds() const { return seconds; }

void Time::setTime(int h, int m, int s) {
    hours = h;
    minutes = m;
    seconds = s;
    normalize();
}

void Time::info() const {
    std::cout << toString() << std::endl;
}

std::string Time::toString() const {
    std::ostringstream oss;
    oss << std::setfill('0')
        << std::setw(2) << hours << ":"
        << std::setw(2) << minutes << ":"
        << std::setw(2) << seconds;
    return oss.str();
}

int Time::toSeconds() const {
    return hours * 3600 + minutes * 60 + seconds;
}

Time& Time::addSeconds(int s) {
    seconds += s;
    normalize();
    return *this;
}

Time& Time::subtractSeconds(int s) {
    seconds -= s;
    normalize();
    return *this;
}

Time& Time::addTime(const Time& other) {
    hours += other.hours;
    minutes += other.minutes;
    seconds += other.seconds;
    normalize();
    return *this;
}

Time& Time::subtractTime(const Time& other) {
    hours -= other.hours;
    minutes -= other.minutes;
    seconds -= other.seconds;
    normalize();
    return *this;
}

bool Time::operator<(const Time& other) const { return toSeconds() < other.toSeconds(); }
bool Time::operator<=(const Time& other) const { return toSeconds() <= other.toSeconds(); }
bool Time::operator>(const Time& other) const { return toSeconds() > other.toSeconds(); }
bool Time::operator>=(const Time& other) const { return toSeconds() >= other.toSeconds(); }
bool Time::operator==(const Time& other) const { return toSeconds() == other.toSeconds(); }
bool Time::operator!=(const Time& other) const { return toSeconds() != other.toSeconds(); }

Time Time::fromString(const std::string& str) {
    int h = 0, m = 0, s = 0;
    char c1 = ':', c2 = ':';
    std::istringstream iss(str);
    if (iss >> h >> c1 >> m) {
        if (iss >> c2 >> s) {
            return Time(h, m, s);
        }
        return Time(h, m, 0);
    }
    return Time(0, 0, 0);
}