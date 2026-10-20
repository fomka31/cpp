#ifndef FRACTION_H
#define FRACTION_H
#include <iostream>

class Fraction
{
public:
    int numerator;
    int denominator;

    // Constructors
    Fraction();                       // default value: 0/1
    Fraction(int num);                // integer -> num/1
    Fraction(int num, int den);       // num/den (den != 0)

    // Utility methods
    double toDouble();                // fraction as a floating point number
    void normalize();                 // reduce the fraction (4/8 -> 1/2)

    // Arithmetic operators: fraction op fraction
    Fraction operator+(const Fraction& f2);
    Fraction operator-(const Fraction& f2);
    Fraction operator*(const Fraction& f2);
    Fraction operator/(const Fraction& f2);

    // Arithmetic operators: fraction op int
    Fraction operator+(int n);
    Fraction operator-(int n);
    Fraction operator*(int n);
    Fraction operator/(int n);
};

// Output operator: prints the fraction as "num / den"
std::ostream& operator<<(std::ostream& os, const Fraction& f);

// Arithmetic operators: int op fraction (int is the left operand)
Fraction operator+(int n, const Fraction& f);
Fraction operator-(int n, const Fraction& f);
Fraction operator*(int n, const Fraction& f);
Fraction operator/(int n, const Fraction& f);

#endif 
