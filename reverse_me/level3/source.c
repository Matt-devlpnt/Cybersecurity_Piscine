#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void ___syscall_malloc() {
    puts("Nope.");
    exit(EXIT_FAILURE);
}

void ____syscall_malloc() {
    puts("Good job.");
}

int main(void) {
    char password[24];
    char buffer[9];

    printf("Please enter key: ");
    int scan_return = scanf("%23s", password);

    if (scan_return == 1 && password[1] == '2' && password[0] == '4') {
        fflush(stdin);
        memset(buffer, 0, 9);
        buffer[0] = '*';

        int i = 2;
        int j = 1;
        char temp[4];

        temp[3] = '\0';

        while (strlen(buffer) < 8 && i < strlen(password)) {

            temp[0] = password[i];
            temp[1] = password[i + 1];
            temp[2] = password[i + 2];

            int result = atoi(temp);

            buffer[j] = (char)(result & 0xFF);

            i += 3;
            j++;
        }

        buffer[j] = '\0';

        if (strcmp(buffer, "********") == 0)
            ____syscall_malloc();
        else
            ___syscall_malloc();

    } else {
        ___syscall_malloc();
    }
}
