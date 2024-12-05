/* kind of cheated in the beginning, using vscode find function and regular expression matching */

/**
 * 1. extract lines from rulesheet
 * 2. 
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void read_rulesheet() {
    FILE *file_ptr;
    FILE *file_ptr_2;
    file_ptr = fopen("day005input000_rulesheet.txt", "r");
    file_ptr_2 = fopen("day005input000_updates.txt", "r");
    char str[10];
    char* token1;
    char* token2;
    char swap[10] = "";
    char copy1[5];
    char copy2[5];
    int num1;
    int num2;
    while (fgets(str, 10, file_ptr) != NULL) {
        token1 = strtok(str, "|");
        token2 = strtok(NULL, "\n");
        memcpy(copy1, token1, 5);
        memcpy(copy2, token1, 5);
        memcpy(swap, token2, 5);

        // when swap is in the rulesheet that update instructions are wrong
        // when no swap is in the rulesheet that is correct, we can search for the middle value
        

        strcat(copy1, swap);
        strcat(swap, copy2);
        printf("%s\n", copy1);
        printf("-------\n");
    }
}

int main() {
    read_rulesheet();
    return 0;
}


