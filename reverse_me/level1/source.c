#include <stdio.h>
#include <string.h>

int main(void) {
    char password[100];

    printf("Please enter key: ");
    scanf("%s", &password);
    if (strcmp(password, "mot_de_passe") == 0) {
    } else {
        printf("Nope.");
        return 0;
    }
    return 0;
}
