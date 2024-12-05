/**
 * read in 3 by 3 chunk
 * move column and row by 3 if read;
 * pick two diagonal strings and check whether both are either 'MAS' or 'SAM'
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int M = 140;
const int N = 140;

void analyze_matrix(char arr[M][N]) {
    char diagonal1[4];
    char diagonal2[4];

    char chuck[3][3];

    int count = 0;

    for (int i = 0; i < 138; i++) {
        for (int j = 0; j < 138; j++) {
            diagonal1[0] = arr[i][j];
            diagonal1[1] = arr[i+1][j+1];
            diagonal1[2] = arr[i+2][j+2];
            diagonal1[3] = '\0';
            diagonal2[0] = arr[i][j+2];
            diagonal2[1] = arr[i+1][j+1];
            diagonal2[2] = arr[i+2][j];
            diagonal2[3] = '\0';
            if ((strcmp(diagonal1, "MAS") == 0 || strcmp(diagonal1, "SAM") == 0) && (strcmp(diagonal2, "MAS") == 0 || strcmp(diagonal2, "SAM") == 0)) {
                count++;
            }
        }
    }

    printf("ANSWER: %d\n", count);
}

/**
 * for reading diagonals
 */
int main() {
    FILE *file_ptr;
    char str[150];
    char all[140][140];
    char check[3][3];
    
    file_ptr = fopen("day004input000.txt", "r");

    if (NULL == file_ptr) {
        printf("File can't be opened \n");
    }

    int row = 0;
    while (fgets(str, 150, file_ptr) != NULL) {
        for (int col = 0; col < 140; col++) {
            all[row][col] = str[col];
        }
        row++;
    }

    fclose(file_ptr);

    analyze_matrix(all);

    return 0;
}
