#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include "personapi.h"
#include "person.cpp"

int main() 
{
    std::ifstream file("persons.txt");
    std::string line;

    while(std::getline(file,line))
    {
        std::string word;
        Person person;

        std::stringstream ss(line);

        ss >> person.firstName;
        ss >> person.lastName;
        ss >> word;
        person.birthYear = std::stoi(word);

        std::cout << person.firstName << " "
                  << person.lastName << " "
                  << person.birthYear << " "
                  << getPersonCategory(person) << std::endl;
    }


    file.close();
    return 0;
}