/* kind of cheated in the beginning, using vscode find function and regular expression matching */

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
    char str[100];
    char saved_token[100][5];
    char* token;
    char* swap_is_here = "";
    char* savedptr;
    char swap[10] = "";
    char copy1[5];
    char copy2[5];
    int sum = 0;
    int index = 0;

    fgets(rules, 6000, rulesheet);
start_new_line:
    while (fgets(str, 100, update_instruction) != NULL) {
        token = strtok_r(str, ",", &savedptr);
        while (token != NULL) {
            memcpy(copy1, token, 4);
            strcpy(saved_token[index++], copy1);
            token = strtok_r(NULL, ",\n", &savedptr);
            if (token == NULL) {
                memset(copy1, 0, sizeof(copy1));
                break;
            }
            memcpy(copy2, token, 4);
            strcat(swap,copy2);
            strcat(swap,copy1);

            // compare swap in the rules section
            swap_is_here = strstr(rules, swap);
            if (swap_is_here) {
                memset(swap, 0, sizeof(swap));
                memset(copy1, 0, sizeof(copy1));
                memset(copy2, 0, sizeof(copy2));
                memset(saved_token, 0, sizeof(saved_token));
                index = 0;
                goto start_new_line;
            }

            // if there is swapped item in the rule, then break the loop and get another line
            // if there is no swapped item in the rule, continue and run the next token and swap;

            
            memset(swap, 0, sizeof(swap));
            memset(copy1, 0, sizeof(copy1));
            memset(copy2, 0, sizeof(copy2));
        }

        sum += atoi(saved_token[index/2]);
        if (swap_is_here) {
            memset(swap_is_here, 0, sizeof(char*));
        }
        memset(saved_token, 0, sizeof(saved_token));
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


