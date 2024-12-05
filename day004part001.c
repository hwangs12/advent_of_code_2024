/**
 * 12 directions:   xmas    file references
 * left to right:   202     ref: day004input000
 * right to left:   204     ref: day004input001
 * top to bottom:   228     ref: day004input002
 * bottom to top:   227     ref: day004input003
 * t to b r to l:   400     ref: day004input004
 * t to b l to r:   460     ref: day004input005
 * t to b l to r:   369     ref: day004input006
 * t to b r to l:   472     ref: day004input007
 * total:           2562
 */

/**
 * reverse string in vim: `:%! rev`
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * for reading diagonals
 */
int main() {
    FILE *file_ptr;
    int row = 0;
    int col = 0;
    char lovely[281][141];
    char str[150];
    
    file_ptr = fopen("day004input003.txt", "r");
    if (NULL == file_ptr) {
        printf("File can't be opened \n");
    }
    while (fgets(str, 150, file_ptr) != NULL) {
        for (int col = 0; col < 140; col++) {
            lovely[row+col][row] = str[col];
        }
        row++;
    }


    for (int i = 0; i < 280; i++) {
        for (int j = 0; j < 140; j++) {
            if (lovely[i][j] >= 65 && lovely[i][j] <= 90)
            printf("%c", lovely[i][j]);
        }
        printf("\n");
    }

    fclose(file_ptr);
    return 0;
}
