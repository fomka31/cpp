#include "fraction.h"
#include <cstdlib>   // abs()
#include <stdexcept> // std::domain_error

// ---------- Constructors ----------

// Default constructor: 0/1
Fraction::Fraction()
{
    numerator = 0;
    denominator = 1;
}

// Integer constructor: n becomes n/1
Fraction::Fraction(int num)
{
    numerator = num;
    denominator = 1;
}

// Main constructor with validation: denominator must not be 0
Fraction::Fraction(int num, int den)
{
    if (den == 0)
        throw std::domain_error("Denominator cannot be 0");
    numerator = num;
    denominator = den;
}

// ---------- Utility methods ----------

// Fraction value as a floating point number
double Fraction::toDouble()
{
    return static_cast<double>(numerator) / denominator;
}

// Reduce the fraction: divide both parts by their greatest common divisor
void Fraction::normalize()
{
    // find the greatest common divisor (Euclid's algorithm)
    int a = abs(numerator);
    int b = abs(denominator);
    while (b != 0)
    {
        int t = a % b;
        a = b;
        b = t;
    }
    int gcd = a;

    numerator /= gcd;
    denominator /= gcd;

    // keep the minus sign in the numerator
    if (denominator < 0)
    {
        numerator = -numerator;
        denominator = -denominator;
    }
}

// ---------- Arithmetic operators: fraction op fraction ----------

Fraction Fraction::operator+(const Fraction& f2)
{
    Fraction result(numerator * f2.denominator +
                    denominator * f2.numerator,
                    denominator * f2.denominator);
    result.normalize();
    return result;
}

Fraction Fraction::operator-(const Fraction& f2)
{
    Fraction result(numerator * f2.denominator -
                    denominator * f2.numerator,
                    denominator * f2.denominator);
    result.normalize();
    return result;
}

Fraction Fraction::operator*(const Fraction& f2)
{
    Fraction result(numerator * f2.numerator,
                    denominator * f2.denominator);
    result.normalize();
    return result;
}

Fraction Fraction::operator/(const Fraction& f2)
{
    if (f2.numerator == 0)
        throw std::domain_error("Division by zero fraction");
    Fraction result(numerator * f2.denominator,
                    denominator * f2.numerator);
    result.normalize();
    return result;
}

// ---------- Arithmetic operators: fraction op int ----------
// The integer is treated as a fraction n/1

Fraction Fraction::operator+(int n)
{
    return *this + Fraction(n);
}

Fraction Fraction::operator-(int n)
{
    return *this - Fraction(n);
}

Fraction Fraction::operator*(int n)
{
    return *this * Fraction(n);
}

Fraction Fraction::operator/(int n)
{
    return *this / Fraction(n);
}

// ---------- Output operator ----------

std::ostream& operator<<(std::ostream& os, const Fraction& f)
{
    os << f.numerator << " / " << f.denominator;
    return os;
}

// ---------- Arithmetic operators: int op fraction ----------
// Free functions, because the left operand is an int, not a Fraction

Fraction operator+(int n, const Fraction& f)
{
    return Fraction(n) + f;
}

Fraction operator-(int n, const Fraction& f)
{
    return Fraction(n) - f;
}

Fraction operator*(int n, const Fraction& f)
{
    return Fraction(n) * f;
}

Fraction operator/(int n, const Fraction& f)
{
    return Fraction(n) / f;
}
