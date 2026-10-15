#ifndef TIME_H
#define TIME_H

#include <iostream>
#include <string>

class Time {
private:
    int hours;  
    int minutes; 
    int seconds; 

    void normalize();

public:
    Time(int h = 0, int m = 0, int s = 0);

    void info() const;
    std::string toString() const;

    int toSeconds() const;

    void addSeconds(int s);
    void subtractSeconds(int s);
    void addTime(const Time& other);
    void subtractTime(const Time& other);
};

#endif