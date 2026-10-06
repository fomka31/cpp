#include "Time.h"

Time::Time(int h, int m, int s) : hours(h), minutes(m), seconds(s) {
    normalize();
}

void Time::normalize() {
    int total = hours * 3600 + minutes * 60 + seconds;
    total = (total % 86400 + 86400) % 86400;

    hours = total / 3600;
    minutes = (total % 3600) / 60;
    seconds = total % 60;
}

int Time::toSeconds() const {
    return hours * 3600 + minutes * 60 + seconds;
}

std::string Time::toString() const {
    std::string hStr = (hours < 10 ? "0" : "") + std::to_string(hours);
    std::string mStr = (minutes < 10 ? "0" : "") + std::to_string(minutes);
    std::string sStr = (seconds < 10 ? "0" : "") + std::to_string(seconds);
    return hStr + ":" + mStr + ":" + sStr;
}

void Time::info() const {
    std::cout << toString() << std::endl;
}

void Time::addSeconds(int s) {
    seconds += s;
    normalize();
}

void Time::subtractSeconds(int s) {
    seconds -= s;
    normalize();
}

void Time::addTime(const Time& other) {
    seconds += other.toSeconds();
    normalize();
}

void Time::subtractTime(const Time& other) {
    seconds -= other.toSeconds();
    normalize();
}