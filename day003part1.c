/* kind of cheated in the beginning, using vscode find function and regular expression matching */

/**
 * 1. find matching text with `mul[(][0-9]+,[0-9]+[)]`
 * 2. highlight(select) all using cmd + shift + L
 * 3. cmd + c & cmd + v and paste into day003input_extract.txt
 * 4. below using that extract to find solution
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int comp(const void* a, const void* b) {

      // If a is smaller, positive value will be returned
    return (*(int*)a - *(int*)b);
}

int main() {
    FILE *file_ptr;
    char str[50];
    int list_1[1000];
    int list_2[1000];
    int num1;
    int num2;
    char* endptr;
    char* token;
    int index1 = 0;
    int index2 = 0;
    int diffTotal = 0;
    file_ptr = fopen("day001input.txt", "r");
    if (NULL == file_ptr) {
        printf("File can't be opened \n");
    }
    while (fgets(str, 50, file_ptr) != NULL) {
        token = strtok(str, "   ");
        num1 = atoi(token);
        list_1[index1] = num1;
        while (token != NULL) {
            token = strtok(NULL, "   ");
            if (token != NULL) {
                num2 = atoi(token);
                list_2[index2] = num2;
            }
        }
        index1++;
        index2++;
    }

    qsort(list_1, 1000, sizeof(int), comp);
    qsort(list_2, 1000, sizeof(int), comp);

    for (int i = 0; i < 1000; i++) {
        diffTotal += abs(list_1[i]-list_2[i]);
    }

    fclose(file_ptr);
    printf("%d\n", diffTotal);
    return 0;
}


