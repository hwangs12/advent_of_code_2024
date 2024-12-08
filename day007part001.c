// just run all possibilities

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int multi_possible(float x, int y) {
    float difference = (float) x - y;
    float tolerableDifference = 0.0000001;

    if ((-tolerableDifference <= difference) && (difference <= tolerableDifference)) {
        return 1;
    }
    return 0;
}

int target_success(long * arr, long target, int arrSize) {
    long operator = arr[0];
    if (target == 0 || target == 1) {
        return 1;
    }

    if (target < 0) {
        return 0;
    } 


    if (multi_possible((float)(target/arr[0]), target/arr[0])) {
        return target_success(arr++, target / operator, arrSize--); 
    } else {
        long addor = arr[0];
        return target_success(arr++, target - operator, arrSize--);
    }


}

int main() {
    FILE *equation_sheet;
    equation_sheet = fopen("day007input001.txt", "r");

    char line[100];

    char* token;
    char* savedPtr;

    char target_num[20] = "";

    long target = 0;

    long intArr[20] = {0};
    long index = 0;

    long reached_target = 0;

    long sum = 0;

    while (fgets(line, 100, equation_sheet) != NULL) {
        token = strtok_r(line, ": ", &savedPtr);
        memcpy(target_num, token, 20);
        target = strtol(target_num, NULL, 10);
        while ((token = strtok_r(NULL, " \n", &savedPtr)))  {
            intArr[index++] = atoi(token);
        }
        reached_target = target_success(intArr, target, index);
        if (reached_target) {
            sum += target;
        }
    }

    printf("Answer is %ld\n", sum);

    return 0;
}