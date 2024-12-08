/**
 * 1. extract lines from rulesheet
 * 2. 
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void read_rulesheet() {
    FILE *rulesheet;
    FILE *update_instruction;
    rulesheet = fopen("day005input001_rulesheet.txt", "r");
    update_instruction = fopen("day005input000_updates.txt", "r");
    char rules[6000];
    char str[50];
    char* token;
    char copy1[3];
    char copy2[3];
    char* savedptr;
    char swaprule[5];
    int lineArr[30];
    int index = 0;
    int temp = 0;
    char swap[5] = "";
    int sum = 0;
    int noskip = 0;

    fgets(rules, 6000, rulesheet);
    while (fgets(str, 100, update_instruction) != NULL) {
        token = strtok_r(str, ",\n", &savedptr);
        while (token != NULL) {
            lineArr[index++] = atoi(token);
            token = strtok_r(NULL, ",\n", &savedptr);
        }
        for (int i = 0; i < index - 1; i++) {
            sprintf(copy1, "%d", lineArr[i]);
            sprintf(copy2, "%d", lineArr[i+1]);
            strcat(swap, copy2);
            strcat(swap, copy1);
            if (strstr(rules, swap) != NULL) {
                noskip = 1;
                temp = lineArr[i+1];
                lineArr[i+1] = lineArr[i];
                lineArr[i] = temp;
            }

            memset(copy1, 0, sizeof(copy1));
            memset(copy2, 0, sizeof(copy2));
            memset(swap, 0, sizeof(swap));
        }
        if (noskip) {
            sum += lineArr[index/2];
        }
        memset(lineArr, 0 , sizeof(lineArr));
        noskip = 0;
        index = 0;
    }

    printf("%d", sum);

    fclose(update_instruction);
    fclose(rulesheet);
}

int main() {
    read_rulesheet();
    return 0;
}


