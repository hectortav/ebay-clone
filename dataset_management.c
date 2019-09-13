#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

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
    FILE *fp, *catfp, *fp2, *fptemp;
    char * line = NULL;
    char * temp = NULL;
    char buf[50];
    char tmp[200];
    size_t len = 0;
    ssize_t sz;
    int i, j, flag;
    char c;

    if (argc >= 2)
         fp = fopen(argv[1], "r");
    else 
    {
        printf("Enter Filename in Command Line\n");
        return -1;
    }
    catfp = fopen("./categories.txt", "w");
    fp2 = fopen("./new.xml", "w");

    fptemp = fopen("./file.xml", "w");

    i = 0;
    flag = 0;
    /*while (getline(&line, &len, fp) != -1)
    {
        i = 0;
        while(line[i] == ' ')
            i++;
        if ((c = line[0+i]) == '<')  {
            if ((c = line[1+i]) == 'D')  {
                if ((c = line[2+i]) == 'e')  {
                    if ((c = line[3+i]) == 's')  {
                        if ((c = line[4+i]) == 'c')  {
                            if ((c = line[5+i]) == 'r')  {
                                if ((c = line[6+i]) == 'i')  {
                                    if ((c = line[7+i]) == 'p')  {
                                        if ((c = line[8+i]) == 't')  {
                                            if ((c = line[9+i]) == 'i')  {
                                                if ((c = line[10+i]) == 'o')  {
                                                    if ((c = line[11+i]) == 'n')  {
                                                        if ((c = line[12+i]) == '>')
                                                        {
                                                            fputs("    <Description></Description>\n", fptemp);
                                                            continue;
                                                        }}}}}}}}}}}}}
        fputs(line, fptemp);
    }
    fclose(fp);
    fclose(fptemp);
    fp = fopen("./file.xml", "r");*/
    while (getline(&line, &len, fp) != -1)
    {   
        if (strstr(line, "$") != NULL)
        {
            temp = replaceWord(line, "$", "");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Item ") != NULL)
        {
            fputs("<Item>\n", fp2);
        }
        else if (strstr(line, "</Item>") != NULL)
        {
            fputs("</Item>\n</Items>\n", fp2);

            fclose(fp2);
            system("node ./post_categories.js");
            printf("sleep for 10...\n");
            sleep(10);
            fp2 =fopen("./new.xml", "w");
            fputs("<Items>\n", fp2);
        }
        else if (strstr(line, "<Started>") != NULL)
        {
            //temp = replaceWord(line, "<Started>", "<started>");
            //temp = replaceWord(temp, "</Started>", "</started>");
            fputs("    <Started>2019-08-25T10:10:18.652Z</Started>\n", fp2);
        }
        else if (strstr(line, "<Ends>") != NULL)
        {
            //temp = replaceWord(line, "<Ends>", "<ends>");
            //temp = replaceWord(temp, "</Ends>", "</ends>");
            fputs("    <Ends>2019-11-25T10:10:18.652Z</Ends>\n", fp2);
        }
        else if (strstr(line, "<Time>") != NULL)
        {
            //temp = replaceWord(line, "<Ends>", "<ends>");
            //temp = replaceWord(temp, "</Ends>", "</ends>");
            fputs("    <Time>2019-9-25T10:10:18.652Z</Time>\n", fp2);
        }
        else if (strstr(line, "<Bidder ") != NULL)
        {
            tmp[0] = '<';
            tmp[1] = 'B';
            tmp[2] = 'i';
            tmp[3] = 'd';
            tmp[4] = 'd';
            tmp[5] = 'e';
            tmp[6] = 'r';
            tmp[7] = '>';
            tmp[8] = '<';
            tmp[9] = 'U';
            tmp[10] = 's';
            tmp[11] = 'e';
            tmp[12] = 'r';
            tmp[13] = 'I';
            tmp[14] = 'D';
            tmp[15] = '>';
            i = 15;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
                i++;
            i++;
            j = 16;
            while (line[i] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'U';i++;
            tmp[i] = 's';i++;
            tmp[i] = 'e';i++;
            tmp[i] = 'r';i++;
            tmp[i] = 'I';i++;
            tmp[i] = 'D';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '<';i++;
            tmp[i] = 'R';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 'n';i++;
            tmp[i] = 'g';i++;
            tmp[i] = '>';i++;
            
            j = i;
            i = 15;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'R';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 'n';i++;
            tmp[i] = 'g';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '\0';i++;
            
            fputs(tmp, fp2);
        }
        else if (strstr(line, "<Seller ") != NULL)
        {
            tmp[0] = '<';
            tmp[1] = 'S';
            tmp[2] = 'e';
            tmp[3] = 'l';
            tmp[4] = 'l';
            tmp[5] = 'e';
            tmp[6] = 'r';
            tmp[7] = '>';
            tmp[8] = '<';
            tmp[9] = 'U';
            tmp[10] = 's';
            tmp[11] = 'e';
            tmp[12] = 'r';
            tmp[13] = 'I';
            tmp[14] = 'D';
            tmp[15] = '>';
            i = 15;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
                i++;
            i++;
            j = 16;
            while (line[i] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'U';i++;
            tmp[i] = 's';i++;
            tmp[i] = 'e';i++;
            tmp[i] = 'r';i++;
            tmp[i] = 'I';i++;
            tmp[i] = 'D';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '<';i++;
            tmp[i] = 'R';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 'n';i++;
            tmp[i] = 'g';i++;
            tmp[i] = '>';i++;
            
            j = i;
            i = 15;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'R';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 'n';i++;
            tmp[i] = 'g';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'S';i++;
            tmp[i] = 'e';i++;
            tmp[i] = 'l';i++;
            tmp[i] = 'l';i++;
            tmp[i] = 'e';i++;
            tmp[i] = 'r';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '\0';i++;
            
            fputs(tmp, fp2);
        }
        else if (strstr(line, "<Location ") != NULL)
        {
            tmp[0] = '<';
            tmp[1] = 'L';
            tmp[2] = 'o';
            tmp[3] = 'c';
            tmp[4] = 'a';
            tmp[5] = 't';
            tmp[6] = 'i';
            tmp[7] = 'o';
            tmp[8] = 'n';
            tmp[9] = '>';
            i = 9;
            while (line[i] != '>')
                i++;
            i++;
            j = 10;
            while (line[i] != '<')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'L';i++;
            tmp[i] = 'o';i++;
            tmp[i] = 'c';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 'o';i++;
            tmp[i] = 'n';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '<';i++;
            tmp[i] = 'L';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'u';i++;
            tmp[i] = 'd';i++;
            tmp[i] = 'e';i++;
            tmp[i] = '>';i++;
            
            j = i;
            i = 9;
            while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'L';i++;
            tmp[i] = 'a';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'u';i++;
            tmp[i] = 'd';i++;
            tmp[i] = 'e';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '<';i++;
            tmp[i] = 'L';i++;
            tmp[i] = 'o';i++;
            tmp[i] = 'n';i++;
            tmp[i] = 'g';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'u';i++;
            tmp[i] = 'd';i++;
            tmp[i] = 'e';i++;
            tmp[i] = '>';i++;

            j = i;
            i = 9;
            while (line[i] != '"')
                i++;
            i++;
             while (line[i] != '"')
                i++;
            i++;
             while (line[i] != '"')
                i++;
            i++;
            while (line[i] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'L';i++;
            tmp[i] = 'o';i++;
            tmp[i] = 'n';i++;
            tmp[i] = 'g';i++;
            tmp[i] = 'i';i++;
            tmp[i] = 't';i++;
            tmp[i] = 'u';i++;
            tmp[i] = 'd';i++;
            tmp[i] = 'e';i++;
            tmp[i] = '>';i++;
            tmp[i] = '\n';i++;
            tmp[i] = '\0';i++;
            
            fputs(tmp, fp2);
        }
        else
            fputs(line, fp2);     

    }
    fclose(fp);
    fclose(fp2);
    fclose(catfp);

    if (line)
        free(line);
    if (temp)
        free(temp);
    return 0;
}