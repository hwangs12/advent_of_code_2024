#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

int evaluate_dampener(int* arr, int arrSize, int skipIndex) {
    int safe = 0;
    int arrCopy[20];
    memcpy(arrCopy, arr, sizeof(arrCopy));
    // remove an element of skipIndex from arr
    for (int index = skipIndex; index < arrSize; index++) {
        arrCopy[index] = arrCopy[index+1];
    }

    if (skipIndex == arrSize - 1) {
        arrCopy[skipIndex] = 0;
    }

    // evaluate its safety;
    safe = (all_decreasing(arrCopy, arrSize - 1) || all_increasing(arrCopy, arrSize - 1)) && safe_level(arrCopy, arrSize - 1);
    
    return safe;

}

void parse_input_text() {
    FILE *file_ptr;
    char str[50];
    int list_1[1000];
    int list_2[1000];
    int num1;
    int num2;
    char* token;
    int index = 0;
    int count = 0;
    int arrToCheck[20];
    int totalSafe = 0;
    file_ptr = fopen("day002input.txt", "r");
    if (NULL == file_ptr) {
        printf("File can't be opened \n");
    }
    while (fgets(str, 50, file_ptr) != NULL) {
        token = strtok(str, " ");
        arrToCheck[index++] = atoi(token);
        count++;
        while (token != NULL) {
            token = strtok(NULL, " ");
            if (token == NULL) {
                break;
            }
            count++;
            arrToCheck[index++] = atoi(token);
        }
        int inc_dec_safe = (all_decreasing(arrToCheck, count) || all_increasing(arrToCheck, count)) && safe_level(arrToCheck, count);
        if (inc_dec_safe) {
            totalSafe++;
        } else {
            for (int k = 0; k < count; k++) {
                inc_dec_safe = evaluate_dampener(arrToCheck, count, k);
                if (inc_dec_safe) {
                    totalSafe++;
                    break;
                }
            }
        }

        index = 0;
        count = 0;
        memset(arrToCheck, 0, sizeof(arrToCheck));
    }
    printf("total safe is: %d.\n", totalSafe);
}

int main() {
    parse_input_text();
    return 0;
}