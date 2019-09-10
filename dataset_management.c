#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *replaceWord(const char *s, const char *oldW, const char *newW) //https://www.geeksforgeeks.org/c-program-replace-word-text-another-given-word/
{ 
    char *result; 
    int i, cnt = 0; 
    int newWlen = strlen(newW); 
    int oldWlen = strlen(oldW); 
  
    for (i = 0; s[i] != '\0'; i++) 
    { 
        if (strstr(&s[i], oldW) == &s[i]) 
        { 
            cnt++; 
  
            i += oldWlen - 1; 
        } 
    } 
  
    result = (char *)malloc(i + cnt * (newWlen - oldWlen) + 1); 
  
    i = 0; 
    while (*s) 
    { 
        if (strstr(s, oldW) == s) 
        { 
            strcpy(&result[i], newW); 
            i += newWlen; 
            s += oldWlen; 
        } 
        else
            result[i++] = *s++; 
    } 
  
    result[i] = '\0'; 
    return result; 
} 

int main(int argc, char **argv)
{
    FILE *fp, *catfp, *fp2;
    char * line = NULL;
    char * temp = NULL;
    char * buf = NULL;
    size_t len = 0;

    if (argc >= 2)
         fp = fopen(argv[1], "r");
    else 
    {
        printf("Enter Filename in Command Line\n");
        return -1;
    }
    catfp = fopen("./categories.txt", "w");
    fp2 = fopen("./new.xml", "w");

    while (getline(&line, &len, fp) != -1)
    {
        if (strstr(line, "<Category>") != NULL)
        {
            temp = replaceWord(line, "<Category>", "<name>");
            temp = replaceWord(temp, "</Category>", "</name>");
            fputs(temp, catfp);
        }
        fputs(line, fp2);        
    }
    fclose(fp);
    fclose(fp2);
    fclose(catfp);
    if (line)
        free(line);
    if (temp)
        free(temp);
    if (buf)
        free(buf);
    return 0;
}