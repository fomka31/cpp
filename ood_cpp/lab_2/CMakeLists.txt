cmake_minimum_required(VERSION 3.10)
project(TimeProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(TimeProject
    main.cpp
    Time.h
    Time.cpp
    Flight.h
    Flight.cpp
)

# Копирование flights.txt в директорию сборки
configure_file(flights.txt ${CMAKE_CURRENT_BINARY_DIR}/flights.txt COPYONLY)