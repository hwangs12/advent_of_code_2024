#include <stdio.h>
#include <stdlib.h>

int all_increasing(int* arr, int arrSize) {
    for (int i = 1; i < arrSize; i++) {
        if (arr[i] < arr[i-1]) {
            return 0;
        }
    }
    return 1;
}

int all_decreasing(int* arr, int arrSize) {
    for (int i = 1; i < arrSize; i++) {
        if (arr[i] > arr[i-1]) {
            return 0;
        }
    }
    return 1;
}

int safe_level(int* arr, int arrSize) {
    int diff;
    for (int i = 1; i < arrSize; i++) {
        diff = abs(arr[i] - arr[i-1]);
        if (diff < 1 || diff > 3) {
            return 0;
        }
    }
    return 1;
}


void parse_input_text() {
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
}

int main() {

}