#include <iostream>
#include "fraction.h"

int main()
{
    Fraction f1, f2(1, 2), f3(2, 3);
    std::cout<< f1 << ", " << f2 << ", " << f3 << std::endl;
    f1 = f2 + f3;
    std::cout << f1 << std::endl;

    return 0;
}