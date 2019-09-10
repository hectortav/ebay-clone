#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv)
{
    FILE *fp;
    char * line = NULL;
    size_t len = 0;

    if (argc >= 2)
         fp = fopen(argv[1], "r");
    else 
    {
        printf("Enter Filename in Command Line\n");
        return -1;
    }
    while (getline(&line, &len, fp) != -1)
    {
        printf("%s", line);
    }
    fclose(fp);
    if (line)
        free(line);
    return 0;
}