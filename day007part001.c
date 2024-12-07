// just run all possibilities

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *equation_sheet;
    equation_sheet = fopen("day007input001.txt", "r");

    char line[100];

    char* token;
    char* savedPtr;

    char target_num[20] = "";

    while (fgets(line, 100, equation_sheet) != NULL) {
        token = strtok_r(line, ":", &savedPtr);
        memcpy(target_num, token, 10);

    }

    return 0;
}