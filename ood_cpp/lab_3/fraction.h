#ifndef FRACTION_H
#define FRACTION_H
#include <iostream>

class Fraction
{
public:
    int numerator;
    int denominator;
    Fraction();
    Fraction(int num, int den);
    Fraction operator+(Fraction f2);
};

std::ostream& operator<<(std::ostream& os, const Fraction& f);

#endif 
