/* kind of cheated in the beginning, using vscode find function and regular expression matching */

/**
 * 1. find matching text with `do[(][)]|don't[(][)]|mul[(][0-9]+,[0-9]+[)]`
 * 2. highlight(select) all using cmd + shift + L
 * 3. cmd + c & cmd + v and paste into day003input_extract_2.txt
 * 4. 
 * 4. below using that extract to find solution
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *file_ptr;
    char str[10];
    int num1;
    int num2;
    int multiple;
    int sum = 0;
    char* token;
    file_ptr = fopen("day003input_extract_5.txt", "r");
    if (NULL == file_ptr) {
        printf("File can't be opened \n");
    }
    while (fgets(str, 10, file_ptr) != NULL) {
        token = strtok(str, ",");
        num1 = atoi(token);
        token = strtok(NULL, "\n");
        num2 = atoi(token);
        int multiple = num1 * num2;
        sum += multiple;
    }

    printf("%d\n.", sum);
    return 0;
}


