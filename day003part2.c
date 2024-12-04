/* kind of cheated in the beginning, using vscode find function and regular expression matching */

/**
 * 1. find matching text with `do[(][)]|don't[(][)]|mul[(][0-9]+,[0-9]+[)]`
 * 2. highlight(select) all using cmd + shift + L
 * 3. cmd + c & cmd + v and paste into day003input_extract_2.txt
 * 4. remove all the mul() and just leave the two numbers
 * 5. change all the don't() to no. 
 * 6. change all the do to yes.
 * 7. copy and paste to day003input_extract_3.txt
 * 8. copy and paste to day003input_extract_4.txt
 * 7. remove all the lines each starting at line with no, then lines up to but not including yes. (this I did manually so far and it's annoying)
 * 8. remove all the lines with yes. 
 * 9. use extract_4 to read, use part1 solution to get the sum. 
 * 
 * if you don't like manual line removal for 'no', stop at extract_3 and run solution below. that way we save manual editing of the file.
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
    int yes;
    int no;
    char* token;
    file_ptr = fopen("day003input_extract_3.txt", "r");
    if (NULL == file_ptr) {
        printf("File can't be opened \n");
    }
    while (fgets(str, 10, file_ptr) != NULL) {
        yes = strcmp(str, "yes\n") == 0;
        no = strcmp(str, "no\n") == 0;
        if (yes) {
            continue;
        }
        if (no) {
            while (fgets(str, 10, file_ptr) != NULL) {
                yes = strcmp(str, "yes\n") == 0;
                if (yes) {
                    break;
                }
            }
            continue;
        }
        token = strtok(str, ",");
        num1 = atoi(token);
        token = strtok(NULL, "\n");
        num2 = atoi(token);
        multiple = num1 * num2;
        sum += multiple;
    }

    printf("%d\n.", sum);
    return 0;
}


