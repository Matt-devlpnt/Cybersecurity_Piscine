#include <stdio.h>
#include <string.h>

int main(void)
{
    char password[100];

    printf("Please enter key: ");
    scanf("%99s", password);

    if (strcmp(password, "__stack_check") == 0)
        printf("Good job.\n");
    else
        printf("Nope.\n");

    return 0;
}
