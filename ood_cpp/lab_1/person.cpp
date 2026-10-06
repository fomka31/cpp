#include <fstream>
#include <string>
#include "personapi.h"

PersonCategory getPersonCategory(Person person) {
    int currentYear = 2026;
    int age = currentYear - person.birthYear;

    if (age <= 12) 
    {
        return PersonCategory::CHILD;
    }
    else if (age <= 18) 
    {
        return PersonCategory::TEEN;
    }
    else 
    {
        return PersonCategory::ADULT;
    }
}

void savePersonToFile(Person person) {
    std::string filename;
    switch (person.pCategory) {
        case PersonCategory::CHILD:
            filename = "children.txt";
            break;
        case PersonCategory::TEEN:
            filename = "teens.txt";
            break;
        case PersonCategory::ADULT:
            filename = "adults.txt";
            break;
    }

    std::ofstream outFile(filename, std::ios::app);
    if (outFile.is_open()) {
        outFile << person.lastName << " " 
                << person.firstName << " " 
                << person.birthYear << "\n";
        outFile.close();
    }
}
