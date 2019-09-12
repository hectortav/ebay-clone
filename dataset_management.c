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
    while (getline(&line, &len, fp) != -1)
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
                                                            fputs("<Description></Description>\n", fptemp);
                                                            continue;
                                                        }}}}}}}}}}}}}
        fputs(line, fptemp);
    }
    fclose(fp);
    fclose(fptemp);
    return 0;
    fp = fopen("./file.xml", "w");

    while ((sz = getline(&line, &len, fp)) != -1)
    {   
        if (strstr(line, "<Category>") != NULL)
        {
            temp = replaceWord(line, "<Category>", "<name>");
            temp = replaceWord(temp, "</Category>", "</name>");
            fputs(temp, catfp);
        }
        if (strstr(line, "<Category>") != NULL)
        {
            temp = replaceWord(line, "<Category>", "<category>");
            temp = replaceWord(temp, "</Category>", "</category>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Name>") != NULL)
        {
            temp = replaceWord(line, "<Name>", "<name>");
            temp = replaceWord(temp, "</Name>", "</name>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Currently>") != NULL)
        {
            temp = replaceWord(line, "<Currently>", "<currently>");
            temp = replaceWord(temp, "</Currently>", "</currently>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<First_Bid>") != NULL)
        {
            temp = replaceWord(line, "<First_Bid>", "<first_bid>");
            temp = replaceWord(temp, "</First_Bid>", "</first_bid>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Number_of_Bids>") != NULL)
        {
            temp = replaceWord(line, "<Number_of_Bids>", "<no_bids>");
            temp = replaceWord(temp, "</Number_of_Bids>", "</no_bids>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Bids>") != NULL)
        {
            temp = replaceWord(line, "<Bids>", "<bids>");
            temp = replaceWord(temp, "</Bids>", "</bids>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Location>") != NULL)
        {
            temp = replaceWord(line, "<Location>", "<location>");
            temp = replaceWord(temp, "</Location>", "</location>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Country>") != NULL)
        {
            temp = replaceWord(line, "<Country>", "<country>");
            temp = replaceWord(temp, "</Country>", "</country>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Started>") != NULL)
        {
            //temp = replaceWord(line, "<Started>", "<started>");
            //temp = replaceWord(temp, "</Started>", "</started>");
            strcpy(temp, "<started>2019-08-25T10:10:18.652Z</started>\n");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Ends>") != NULL)
        {
            //temp = replaceWord(line, "<Ends>", "<ends>");
            //temp = replaceWord(temp, "</Ends>", "</ends>");
            strcpy(temp, "<ends>2019-11-25T10:10:18.652Z</ends>\n");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Description>") != NULL)
        {
            temp = replaceWord(line, "<Description>", "<description>");
            temp = replaceWord(temp, "</Description>", "</description>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Buy_Price>") != NULL)
        {
            temp = replaceWord(line, "<Buy_Price>", "<buy_price>");
            temp = replaceWord(temp, "</Buy_Price>", "</buy_price>");
            fputs(temp, fp2);
        }
        else if (strstr(line, "<Location ") != NULL)
        {
            tmp[0] = '<';
            tmp[1] = 'l';
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
            while (line[i+1] != '<')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'l';i++;
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
            tmp[i] = 'l';i++;
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
            while (line[i+1] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'l';i++;
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
            tmp[i] = 'l';i++;
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
            while (line[i+1] != '"')
            {
                tmp[j] = line[i];
                i++;
                j++;
            }
            i = j;
            tmp[i] = '<';i++;
            tmp[i] = '/';i++;
            tmp[i] = 'l';i++;
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