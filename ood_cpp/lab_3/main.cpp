#include <iostream>
#include "fraction.h"

using namespace std;

// Determinant of a 2x2 matrix of fractions: a*d - b*c
Fraction determinant(Fraction m[2][2])
{
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

// Square of a 2x2 matrix: A^2 = A * A^T (as given in the assignment).
// Element (i, j) is the scalar product of row i of A and row j of A^T
// (row j of A^T is column j of A).
void squareMatrix(Fraction a[2][2], Fraction result[2][2])
{
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
        {
            result[i][j] = a[i][0] * a[j][0] + a[i][1] * a[j][1];
        }
}

int main()
{
    // ---------- Test of the constructors and utility methods ----------
    cout << "=== Constructors, toDouble(), normalize() ===" << endl;

    Fraction f0;                 // default constructor -> 0/1
    Fraction f1(3);              // integer -> 3/1
    Fraction f2(1, 2);           // 1/2
    Fraction f3(2, 3);           // 2/3
    Fraction f4(4, 8);           // not normalized yet

    cout << "f0 = " << f0 << ", toDouble = " << f0.toDouble() << endl;
    cout << "f1 = " << f1 << ", toDouble = " << f1.toDouble() << endl;
    cout << "f2 = " << f2 << ", toDouble = " << f2.toDouble() << endl;
    cout << "f4 before normalize = " << f4 << endl;
    f4.normalize();
    cout << "f4 after  normalize = " << f4 << endl;

    // check denominator validation
    try
    {
        Fraction bad(1, 0);      // must throw an exception
        cout << bad << endl;
    }
    catch (domain_error& e)
    {
        cout << "Caught error: " << e.what() << endl;
    }

    // ---------- Test of arithmetic operations ----------
    cout << endl << "=== Arithmetic operations ===" << endl;

    cout << f2 << " + " << f3 << " = " << f2 + f3 << endl;
    cout << f2 << " - " << f3 << " = " << f2 - f3 << endl;
    cout << f2 << " * " << f3 << " = " << f2 * f3 << endl;
    cout << f2 << " / " << f3 << " = " << f2 / f3 << endl;

    // fraction with an integer (fraction on the left)
    cout << f2 << " + 1 = " << f2 + 1 << endl;
    cout << f2 << " * 3 = " << f2 * 3 << endl;

    // integer with a fraction (integer on the left)
    cout << "1 + " << f2 << " = " << 1 + f2 << endl;
    cout << "5 - " << f3 << " = " << 5 - f3 << endl;

    // ---------- Matrix example ----------
    cout << endl << "=== 2x2 matrix of fractions ===" << endl;

    Fraction a[2][2] = { { Fraction(1, 2), Fraction(2, 3) },
                         { Fraction(3, 4), Fraction(4, 5) } };

    cout << "Matrix A:" << endl;
    for (int i = 0; i < 2; i++)
    {
        cout << "| " << a[i][0] << "  " << a[i][1] << " |" << endl;
    }

    Fraction a2[2][2];
    squareMatrix(a, a2);

    cout << "A^2 = A * A^T:" << endl;
    for (int i = 0; i < 2; i++)
    {
        cout << "| " << a2[i][0] << "  " << a2[i][1] << " |" << endl;
    }

    cout << "det(A) = " << determinant(a) << endl;

    return 0;
}
