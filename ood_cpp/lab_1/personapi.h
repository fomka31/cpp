#ifndef PERSONAPI_H
#define PERSONAPI_H

#include <iostream>

enum PersonCategory{CHILD, TEEN, ADULT};

struct Person
{
    std::string firstName;
    std::string lastName;
    int birthYear;
    PersonCategory pCategory;
};

PersonCategory getPersonCategory(Person person);
void savePersonToFile(Person person);

#endif