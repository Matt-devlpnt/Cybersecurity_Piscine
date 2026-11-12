#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void no( void ) {
    puts("Nope.");
    exit(EXIT_FAILURE);
}

int ok( void ) {
    puts("Good job.");
    return EXIT_SUCCESS;
}

int main(void) {
    char password[24];
    char buffer[9];

    printf("Please enter key: ");
    int scan_return = scanf("%23s", password);

    if (scan_return == 1 && password[0] == '0' && password[1] == '0') {
        memset(buffer, 0, 9);
        buffer[0] = 'd';

        size_t length_buffer = strlen(buffer);
        size_t length_password = strlen(password);

        int i = 2;
        int j = 1;

        while (length_buffer < 8 && i < length_password) {
            char temp[4];

            // Récupération de trois caractères
            temp[0] = password[i];
            temp[1] = password[i + 1];
            temp[2] = password[i + 2];
            temp[3] = '\0';

            // Conversion en entier
            int result = atoi(temp);

            // Stockage sur un seul octet
            buffer[j] = (char)(result & 0xFF);

            // Incrémentation des compteurs
            i += 3;
            j++;
        }

        buffer[j] = '\0';

        if (strcmp(buffer, "delabere") == 0)
            ok();
        else
            no();

    } else {
        no();
    }

    return EXIT_SUCCESS;
}
