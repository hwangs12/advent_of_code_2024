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

    int walk1 = 0;
    int walk2 = 0;
    int similar_per = 0;
    int similar_total = 0;
    int val1;
    int val2;

    while (walk1 < 1000 && walk2 < 1000) {
        val1 = list_1[walk1];
        val2 = list_2[walk2];
        if (val2 < val1) {
            walk2++;
        } else if (val2 == val1) {
            similar_per += list_2[walk2];
            walk2++;
            walk1++;
            while (list_2[walk2] == list_2[walk2 - 1] && walk2 < 1000) {
                similar_per += list_2[walk2];
                walk2++;
            }
            similar_total += similar_per;
            while (list_1[walk1] == list_1[walk1 - 1] && walk1 < 1000) {
                similar_total += similar_per;
                walk1++;
            }
            similar_per = 0;
        } else if (val2 > val1) {
            walk1++;
        }
    }

    fclose(file_ptr);
    printf("%d\n", similar_total);
    return 0;
}
