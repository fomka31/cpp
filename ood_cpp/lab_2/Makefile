CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2

TARGET = TimeProject
OBJS = main.o Time.o Flight.o

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)

main.o: main.cpp Time.h Flight.h
	$(CXX) $(CXXFLAGS) -c main.cpp

Time.o: Time.cpp Time.h
	$(CXX) $(CXXFLAGS) -c Time.cpp

Flight.o: Flight.cpp Flight.h Time.h
	$(CXX) $(CXXFLAGS) -c Flight.cpp

clean:
	rm -f $(OBJS) $(TARGET)

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run