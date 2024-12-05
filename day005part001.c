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
    char* token;
    char* savedptr;
    char swap[10] = "";
    char copy1[5];
    char copy2[5];
    int midNumber = 0;

    fgets(rules, 6000, rulesheet);

    while (fgets(str, 100, update_instruction) != NULL) {
        token = strtok_r(str, ",", &savedptr);

        while (token != NULL) {
            memcpy(copy1, token, 4);
            token = strtok_r(NULL, ",", &savedptr);
            if (token == NULL) {
                break;
            }
            memcpy(copy2, token, 4);
            strcat(swap,copy2);
            strcat(swap,copy1);

            // compare swap in the rules section
            printf("%s\n", swap);
            // if there is swapped item in the rule, then break the loop and get another line
            // if there is no swapped item in the rule, continue and run the next token and swap;

            
            memset(swap, 0, sizeof(swap));
            memset(copy1, 0, sizeof(copy1));
            memset(copy2, 0, sizeof(copy2));
        }
        break;
        
    }

    fclose(update_instruction);
    fclose(rulesheet);
}

int main() {
    read_rulesheet();
    return 0;
}


