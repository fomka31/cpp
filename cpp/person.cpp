#include <fstream>
#include "personapi.h"

PersonCategory getPersonCategory(Person person) {
    PersonCategory result;
    if (2026 - person.birthYear <= 12) 
    {
        result = PersonCategory::CHILD;
    }
    else if (2026 - person.birthYear <= 18) 
    {
        result = PersonCategory::TEEN;
    }
    else 
    {
        result = PersonCategory::ADULT;
    }

    return result;
}