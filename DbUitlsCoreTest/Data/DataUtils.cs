using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DbUitlsCoreTest.Data
{
    public class DataUtils
    {
        public static string sqlConvert(string sql)
        {

            // when using T-SQL specific syntax, don't convert it
            if (sql.Contains("for xml auto") || sql.Contains("for xml path"))
            {
                return sql;
            }

            //Store original string for debugging
            string original = sql;
            string ch11 = Convert.ToString(Convert.ToChar(11));

            // added this as there is no need to process string literals
            StringDictionary sdReplacements = new StringDictionary();
            char[] aryChSql = sql.Replace("\'\'", ch11 + ch11).ToCharArray();
            bool startFound = false;
            int lastStart = -1;
            for (int iChar = 0; iChar < aryChSql.Length; iChar++)
            {
                if (aryChSql[iChar] == '\'')
                {
                    if (startFound)
                    {
                        string theSubstring = new string(aryChSql, lastStart, iChar - lastStart).Replace(ch11 + ch11, "\'\'");
                        string theKey = "{" + string.Format("{0}", sdReplacements.Count) + "}";
                        sdReplacements.Add(theKey, theSubstring);
                        int firstOccurrence = sql.Replace("\'\'", "~~").Replace("'{", "~~").Replace("}'", "~~").IndexOf("'") + 1;
                        sql = sql.Substring(0, firstOccurrence) + theKey + sql.Substring(firstOccurrence + theSubstring.Length);
                        startFound = false;
                    }
                    else
                    {
                        lastStart = iChar + 1;
                        iChar++;
                        startFound = true;
                    }
                }
            }

            //Prepare SQL statement for translating
            sql = sql.Replace("~", "TiLdE");
            sql = sql.Replace("(+)", "~");
            sql = sql.Replace(".references", ".[references]");
            sql = sql.Replace(".lineno", ".[lineno]");

            //Create variables for SQL Conversion
            StringBuilder sbOutput = new StringBuilder();
            bool inliteral = false;
            bool foundequals = false;
            bool foundouterjoin = false;
            bool dotafterequals = false;
            int lastequals = -1;
            int pos = 0;
            int sqlpos = 0;
            char lastchr = 'a';
            string lastchars = "";
            Hashtable tabledata = new Hashtable();

            //Loop through each character and build translation if query contains outer join, concatination or an Oracle function
            if (sql.IndexOf("||") > 0 ||
               sql.IndexOf("~") >= 0 ||
               sql.ToUpper().IndexOf("SYSDATE") > 0 ||
               sql.IndexOf("''") > 0 ||
               sql.ToLower().IndexOf("lower(") > 0 ||
               sql.ToLower().IndexOf("upper(") > 0 ||
               sql.ToLower().IndexOf("instr(") > 0 ||
               sql.ToLower().IndexOf("substr(") > 0 ||
               sql.ToLower().IndexOf("length(") > 0)
            {
                foreach (char chr in sql.ToCharArray())
                {
                    sqlpos++;
                    //Toggle inlitereal bool if apostrophe is found
                    if (chr.Equals('\''))
                    {
                        if (inliteral)
                        {
                            inliteral = false;
                        }
                        else
                        {
                            inliteral = true;
                        }
                    }

                    //~ will represent outer join if not in a litereal
                    if (chr.Equals('~') && !inliteral)
                    {
                        foundouterjoin = true;
                        //If equals was found first, this is a righ-outer join
                        if (foundequals)
                        {
                            sbOutput = sbOutput.Insert(lastequals, "*");
                            foundouterjoin = false;
                            foundequals = false;
                            dotafterequals = false;
                        }
                        //Need to encode "lineno" keyword when used as a column name and not already encoded
                    }
                    else if (sbOutput.ToString().EndsWith("lineno") && !inliteral && !chr.Equals('\"') &&
                              !chr.Equals(']') && !lastchr.Equals('\"') && !sbOutput.ToString().EndsWith("tlineno"))
                    {
                        sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 6) + "[lineno]" + chr.ToString());
                        pos += 2;
                        //Need to replace double-pipes which are not in literals with a plus sign
                    }
                    else if (chr.Equals('|') && !inliteral && lastchr.Equals('|'))
                    {
                        sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 1) + "+");
                        pos--;
                        //If in a literal or not a special character, just append the character
                    }
                    else
                    {
                        sbOutput.Append(chr.ToString());
                    }
                    /*  -- this was taken out, because although compare logic is not case-sensitive in SQL Server, still may need to return data in a specific case for select statements
                    //No need for lower or upper methods as SQL Server is not case-sensitive
                    if(!inliteral && (
                       lastchars.ToLower().EndsWith("lower(") ||
                       lastchars.ToLower().EndsWith("upper("))) {
                       lastchars = "";
                       //Get rid of upper or lower keyword and put back the open parenthesis
                       output = output.Substring(0,output.Length-7) + "(" + chr.ToString();
                       pos-=5;
                    }
                    */
                    //Replace instr with charindex function
                    if (!inliteral &&
                       lastchars.ToLower().EndsWith("instr("))
                    {
                        lastchars = "";
                        sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 7) + "charindex(" + chr.ToString());
                        pos += 5;
                    }
                    //Replace substr with substring function
                    if (!inliteral &&
                       lastchars.ToLower().EndsWith("substr("))
                    {
                        lastchars = "";
                        sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 8) + "substring(" + chr.ToString());
                        pos += 4;
                    }
                    //Replace length with len function
                    if (!inliteral &&
                       lastchars.ToLower().EndsWith("length("))
                    {
                        lastchars = "";
                        sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 8) + "len(" + chr.ToString());
                        pos -= 4;
                    }
                    //Equals when not a literal means a possible join
                    if (chr.Equals('=') && !inliteral)
                    {
                        foundequals = true;
                        lastequals = pos;
                        //If join was found first, this is a left-outer join
                        if (foundouterjoin)
                        {
                            sbOutput.Insert(lastequals, "*");
                            foundouterjoin = false;
                            foundequals = false;
                            dotafterequals = false;
                        }
                    }
                    //If a close parenthesis is found or the words "and" or "or" when not in a literal, reset variables
                    if (foundequals && !inliteral &&
                       (chr.Equals(')') ||
                       lastchars.ToLower().EndsWith("and ") ||
                       lastchars.ToLower().EndsWith("or ")))
                    {
                        foundouterjoin = false;
                        foundequals = false;
                        dotafterequals = false;
                    }
                    //If join is an inner-join, reset variables
                    if (chr.Equals('.') && foundequals && !inliteral)
                    {
                        dotafterequals = true;
                    }
                    //Join is an inner join if second table has a space after it rather than a tilde
                    if (chr.Equals(' ') && dotafterequals && !inliteral)
                    {
                        foundouterjoin = false;
                        foundequals = false;
                        dotafterequals = false;
                    }

                    pos++;
                    //Check for double apostrophe used as a field assignment and replace with "null"
                    /*
                     * to be used as a field assignment:
                     * must not be in a literal
                     * current and last characters must be an apostrophe
                     * next character must not be an apostrophe
                     * there must be a coma, equals or open paren before the last apostrophe
                     * value must not be part of an nvl or isnull function
                     */
                    if (!inliteral && lastchr.Equals('\'') && chr.Equals('\''))
                    {
                        string nextchar = "";
                        try
                        {
                            nextchar = sql.Substring(sqlpos, 1);
                        }
                        catch (Exception)
                        {
                            //Ignore if can't get next character
                        }
                        if (nextchar != "'")
                        {
                            if (lastchars.Replace("'", "").Trim().EndsWith(",") ||
                               lastchars.Replace("'", "").Trim().EndsWith("=") ||
                               lastchars.Replace("'", "").Trim().EndsWith("("))
                            {
                                //Determine if double apostrophe is inside of an isnull or nvl function
                                bool nullfunction = false;
                                int fcnloc = lastchars.ToLower().IndexOf("isnull(");
                                if (fcnloc < 0)
                                {
                                    fcnloc = lastchars.ToLower().IndexOf("nvl(");
                                }
                                if (fcnloc >= 0)
                                {
                                    //If function call found, count open and close paren's after it
                                    string fcntmp = lastchars.Substring(fcnloc);
                                    //Should be one more open paren's then close paren's if this is part of the isnull function
                                    if (fcntmp.Split('(').Length == fcntmp.Split(')').Length + 1)
                                    {
                                        nullfunction = true;
                                    }
                                }
                                if (!nullfunction)
                                {
                                    sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 2) + "null");
                                    pos = pos + 2;
                                }
                            }
                        }
                    }
                    lastchr = chr;
                    lastchars += chr.ToString().ToUpper();
                    //Check for sysdate
                    if (!inliteral && lastchars.EndsWith("SYSDATE"))
                    {
                        sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, sbOutput.Length - 7) + "GETDATE()");
                        lastchars = "";
                        pos = pos + 2;
                    }
                }
            }
            else
            {
                //If query does not contain any outer joins or concatinations, use original query for additional checks
                sbOutput = new StringBuilder(sql);
            }

            //Check for declare statement and setup as normal value
            if (sbOutput.ToString().ToLower().IndexOf("declare newstruct") >= 0 ||
               sbOutput.ToString().ToLower().IndexOf("declare hxml") >= 0 ||
               sbOutput.ToString().ToLower().IndexOf("declare remarkstruct") >= 0 ||
               sbOutput.ToString().ToLower().IndexOf("declare xmlstruct") >= 0)
            {
                //Figure out the name of the variable
                int start = sbOutput.ToString().IndexOf(" ", sbOutput.ToString().ToLower().IndexOf("declare") + 1);
                int finish = sbOutput.ToString().IndexOf(" ", start + 1);
                string varname = sbOutput.ToString().Substring(start, finish - start).Trim();

                //Figure out the value assigned to the variable
                start = sbOutput.ToString().IndexOf("'", finish) + 1;
                string tempval = sbOutput.ToString().Substring(start);
                //Start with negative because indexes are zero-based
                finish = -1;
                lastchr = 'a';
                char lastchr2 = 'x';
                foreach (char chr in tempval.ToCharArray())
                {
                    //Variable ends once the next apostrophe is found, povided there aren't two apostrophes in a row
                    if (lastchr.Equals('\'') && !chr.Equals('\'') && !lastchr2.Equals('\''))
                    {
                        break;
                    }
                    lastchr2 = lastchr;
                    lastchr = chr;
                    finish++;
                }

                //Store data assigned to the variable
                string varval = sbOutput.ToString().Substring(start, finish);

                //Figure out where the query starts
                start = sbOutput.ToString().ToLower().IndexOf("begin", finish) + 5;

                //Store the query as a variable and strip off semi-colons
                string query = sbOutput.ToString().Substring(start);
                query = query.Substring(0, query.Length - 4);
                query = query.Substring(0, query.LastIndexOf(";"));

                //Replace the variable with the variable's assigned value, add apostrophes
                query = query.Replace(varname, "'" + varval + "'");

                //Reassign the output
                sbOutput = new StringBuilder(query);
            }

            //Replace rownum with top x rows
            if (sbOutput.ToString().ToLower().IndexOf("where rownum ") > 0)
            {
                int rnstart = sbOutput.ToString().ToLower().IndexOf("where rownum ");
                int rnend = rnstart + 13;
                string tmpval = sbOutput.ToString().Substring(rnend).Trim();
                string numrows = tmpval.Substring(tmpval.IndexOf(" "));
                numrows = numrows.Trim();
                if (numrows.IndexOf(" ") > 0)
                {
                    numrows = numrows.Substring(0, numrows.IndexOf(" "));
                }
                sbOutput = new StringBuilder(sbOutput.ToString().Substring(0, rnstart));
                int selpos = sbOutput.ToString().ToLower().IndexOf("select") + 7;
                sbOutput.Insert(selpos, " top " + numrows + " ");
                //If selecting from a view, add top 100 percent to the view (second select clause)
                if (sbOutput.ToString().ToLower().IndexOf("order by") > 0 && sbOutput.ToString().ToLower().IndexOf("select") < sbOutput.ToString().ToLower().IndexOf("select", 10))
                {
                    int secsel = sbOutput.ToString().ToLower().IndexOf("select", 10);
                    sbOutput.Insert(secsel + 7, " top 100 percent ");
                    if (sbOutput.ToString().Trim().EndsWith(")"))
                    {
                        sbOutput.Append(" tvtmptble");
                    }
                }
                else if (sbOutput.ToString().Trim().EndsWith(")"))
                {
                    sbOutput.Append(" tvtmptble");
                }
                //Put distinct before top 100 percent if applicable
                if (sbOutput.ToString().IndexOf("top 100 percent distinct") > 0)
                {
                    sbOutput.Replace("top 100 percent distinct", "distinct top 100 percent");
                }
            }

            //Replace Oracle chr function with SQL Server char function
            sbOutput.Replace("chr(", "char(");



            //Replace nvl statement(s) with isnull statements
            if (sbOutput.ToString().ToLower().IndexOf("nvl(") >= 0)
            {
                sbOutput.Replace("nvl(", "isnull(").Replace("NVL(", "isnull(");
            }

            //Use user-defined trunc function if applicable
            if (sbOutput.ToString().IndexOf("trunc(") >= 0)
            {
                // this piece of code requires the SQL Server structure update performed on 7/9/2010
                sbOutput.Replace("trunc(", "dbo.trunc(").Replace("dbo.dbo.trunc(", "dbo.trunc(");
            }
            // defaulting to current user trunc function for execution

            /*
            //Replace nvl statement(s) with case statement(s)
            while(output.ToLower().IndexOf("nvl(") >= 0) {
               int blen = output.Length;
               output = convertNvl(output);
               //Make sure infinite loop doesn't happen due to literal values
               if(blen == output.Length) {
                  break;
               }
            }
            */



            //Replace outer join from artifact to itemartifact if applicable
            if (sbOutput.ToString().IndexOf("(itemartifact.artifactid *= artifact.artifactid)") > 0)
            {
                sbOutput.Replace("(itemartifact.artifactid *= artifact.artifactid)", "(itemartifact.artifactid = artifact.artifactid or itemartifact.artifactid is null)");
            }

            //Make sure "DiStIncT" keyword is in the write place
            if (sbOutput.ToString().IndexOf("top 100 percent DiStIncT") > 0)
            {
                sbOutput.Replace("top 100 percent DiStIncT", "DiStIncT top 100 percent");
            }

            //Make sure order by is included in the outer-most query if applicable
            string outputTemp = sbOutput.ToString();
            if (outputTemp.LastIndexOf(") tvtmptble") == outputTemp.LastIndexOf(")") && outputTemp.IndexOf("order by") > 0 &&
               outputTemp.LastIndexOf("order by") > outputTemp.LastIndexOf("select") &&
               outputTemp.LastIndexOf("order by") < outputTemp.LastIndexOf(") tvtmptble"))
            {
                string obclause = outputTemp.Substring(outputTemp.ToLower().LastIndexOf("order by"));
                //TO DO - find way to ensure code works with order by clause actually contains parenthesis in it
                obclause = obclause.Substring(0, obclause.IndexOf(")"));
                //Only add order by clause if it doesn't include table labels
                if (obclause.IndexOf(".") < 0)
                {
                    sbOutput.Append(" " + obclause);
                }
            }

            //Substitute characters back after processing
            sbOutput.Replace("~", "(+)");
            sbOutput.Replace("TiLdE", "~");

            //clean up top 1 if needed
            if (sbOutput.ToString().IndexOf(" top 1)") >= 0)
            {
                sbOutput.Replace(" top 1)", "");
            }

            //Log translation results if debugging
            //LogInformation("Translated\r" + original + "\r\rto\r\r" + output);
            string newOutput = sbOutput.ToString();
            if (sdReplacements.Count > 0)
            {
                ArrayList alReplacements = new ArrayList();
                for (int iToken = 0; iToken < sdReplacements.Count; iToken++)
                {
                    string sKey = "{" + iToken + "}";
                    alReplacements.Add(sdReplacements[sKey]);
                }
                string[] aryReplacements = (string[])alReplacements.ToArray(typeof(string));
                newOutput = string.Format(newOutput, aryReplacements);
            }

            //Replace to_date with convert
            while (newOutput.ToString().ToLower().IndexOf("to_date") >= 0)
            {
                int blen = newOutput.Length;
                newOutput = convertToDate(newOutput.ToString());
                //Make sure infinite loop doesn't happen due to literal values
                if (blen == newOutput.Length)
                {
                    break;
                }
            }

            //Replace to_char with convert
            while (newOutput.ToString().ToLower().IndexOf("to_char") >= 0)
            {
                int blen = newOutput.Length;
                newOutput = convertToChar(newOutput.ToString());
                //Make sure infinite loop doesn't happen due to literal values
                if (blen == newOutput.Length)
                {
                    break;
                }
            }

            //Replace to_number with convert
            while (newOutput.ToString().ToLower().IndexOf("to_number") >= 0)
            {
                int blen = newOutput.Length;
                newOutput = convertToNumber(newOutput.ToString());
                //Make sure infinite loop doesn't happen due to literal values
                if (blen == newOutput.Length)
                {
                    break;
                }
            }

            //Replace decode statement(s) with case statement(s)
            while (newOutput.ToString().ToLower().IndexOf("decode(") >= 0)
            {
                int blen = newOutput.Length;
                newOutput = convertDecode(newOutput.ToString());
                //Make sure infinite loop doesn't happen due to literal values
                if (blen == newOutput.Length)
                {
                    break;
                }
            }

            //Replace new_time function with -- no equiv in SQL Server, need to write custom function
            while (newOutput.ToString().ToLower().IndexOf("new_time(") >= 0)
            {
                int blen = newOutput.Length;
                newOutput = convertNewTime(newOutput.ToString());
                //Make sure infinite loop doesn't happen due to literal values
                if (blen == newOutput.Length)
                {
                    break;
                }
            }

            return newOutput;
        }
        /// <summary>
        /// Format date for Oracle SQL statement
        /// </summary>
        /// <param name="xdate">date to be formatted</param>
        /// <returns>dd-mmm-yyyy formatted date</returns>
        public static string formatOraDate(string xdate)
        {
            if (xdate == null || xdate.Length == 0)
            {
                return xdate;
            }
            DateTime ydate = DateTime.Now;
            try
            {
                ydate = Convert.ToDateTime(xdate);
            }
            catch (Exception)
            {
                return xdate;
            }
            string sdate = "";
            string smonth = "";
            switch (ydate.Month)
            {
                case 1:
                    smonth = "JAN";
                    break;
                case 2:
                    smonth = "FEB";
                    break;
                case 3:
                    smonth = "MAR";
                    break;
                case 4:
                    smonth = "APR";
                    break;
                case 5:
                    smonth = "MAY";
                    break;
                case 6:
                    smonth = "JUN";
                    break;
                case 7:
                    smonth = "JUL";
                    break;
                case 8:
                    smonth = "AUG";
                    break;
                case 9:
                    smonth = "SEP";
                    break;
                case 10:
                    smonth = "OCT";
                    break;
                case 11:
                    smonth = "NOV";
                    break;
                case 12:
                    smonth = "DEC";
                    break;
            }
            sdate += ydate.Day.ToString().PadLeft(2, '0') + "-"
               + smonth + "-" + ydate.Year;
            return sdate;
        }

        /// <summary>
        /// Replace an occurrence of Oracle TO_DATE function with CONVERT function
        /// </summary>
        /// <param name="sql">SQL statement to be converted</param>
        /// <returns>converted SQL</returns>
        private static string convertToDate(string sql)
        {
            if (sql.ToLower().IndexOf("to_date(") >= 0)
            {
                //Figure out where the to_date statement begins
                int ds = sql.ToLower().IndexOf("to_date(");
                //Figure out where the to_date statement ends and break into sections
                string tmp = sql.Substring(ds + 8);
                string sectionval = "";
                bool inliteral = false;
                int de = 0;
                int parencount = 0;
                string[] sections = new string[2];
                foreach (char chr in tmp.ToCharArray())
                {
                    de++;
                    if (chr.Equals('\''))
                    {
                        if (inliteral)
                        {
                            inliteral = false;
                        }
                        else
                        {
                            inliteral = true;
                        }
                    }
                    if (!inliteral && chr.Equals('('))
                    {
                        parencount++;
                    }
                    if (!inliteral && chr.Equals(')'))
                    {
                        if (parencount == 0)
                        {
                            sections[1] = sectionval.Trim();
                            //If to_date function only had one argument, set the first section to that argument
                            if (sections[0] == null || sections[0].Length == 0)
                            {
                                sections[0] = sectionval.Trim();
                            }
                            break;
                        }
                        else
                        {
                            parencount--;
                        }
                    }
                    if (!inliteral && chr.Equals(',') && parencount == 0)
                    {
                        if (sections[0] == null)
                        {
                            sections[0] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                    }
                    sectionval += chr.ToString();
                }
                de += ds + 8;
                string part1 = sql.Substring(0, ds);
                string part2 = " CONVERT(datetime, " + sections[0] + ")";
                string part3 = sql.Substring(de);
                sql = part1 + part2 + part3;
            }
            return sql;
        }

        /// <summary>
		/// Replace an occurrence of Oracle TO_CHAR function with CONVERT function
		/// </summary>
		/// <param name="sql">SQL statement to be converted</param>
		/// <returns>converted SQL</returns>
		private static string convertToChar(string sql)
        {
            if (sql.ToLower().IndexOf("to_char(") >= 0)
            {
                //Figure out where the to_date statement begins
                int ds = sql.ToLower().IndexOf("to_char(");
                //Figure out where the to_date statement ends and break into sections
                string tmp = sql.Substring(ds + 8);
                string sectionval = "";
                bool inliteral = false;
                int de = 0;
                int parencount = 0;
                string[] sections = new string[2];
                foreach (char chr in tmp.ToCharArray())
                {
                    de++;
                    if (chr.Equals('\''))
                    {
                        if (inliteral)
                        {
                            inliteral = false;
                        }
                        else
                        {
                            inliteral = true;
                        }
                    }
                    if (!inliteral && chr.Equals('('))
                    {
                        parencount++;
                    }
                    if (!inliteral && chr.Equals(')'))
                    {
                        if (parencount == 0)
                        {
                            sections[1] = sectionval.Trim();
                            //If to_char function only had one argument, set the first section to that argument
                            if (sections[0] == null || sections[0].Length == 0)
                            {
                                sections[0] = sectionval.Trim();
                            }
                            break;
                        }
                        else
                        {
                            parencount--;
                        }
                    }
                    if (!inliteral && chr.Equals(',') && parencount == 0)
                    {
                        if (sections[0] == null)
                        {
                            sections[0] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                    }
                    sectionval += chr.ToString();
                }
                de += ds + 8;
                string part1 = sql.Substring(0, ds);
                string part2 = " CONVERT(varchar(4000), " + sections[0] + ")";
                //Check for special format requirements and add month, year and day functions if needed
                if (sections[1].Length > 0)
                {
                    string format = sections[1].ToUpper().Replace("\"", "").Replace("'", "");
                    switch (format)
                    {
                        case "FMHHFM:MI PM":
                            /*
												 part2 = "convert(varchar, datepart(hh," + sections[0] +
														 ")) + ':' + convert(varchar, datepart(mi," + sections[0] + "))";
							*/
                            part2 = "RIGHT('0'+LTRIM(RIGHT(CONVERT(varchar," + sections[0] + ",100),8)),7)";
                            break;
                        case "DD-MON-YYYY":
                            part2 = "convert(varchar,day(" + sections[0] +
                               ")) + '-' + upper(substring(datename(month, " + sections[0] +
                               "),1,3)) + '-' + convert(varchar,year(" +
                               sections[0] + "))";
                            break;
                        case "MM_DD_YYYY":
                            part2 = "convert(varchar,month(" + sections[0] +
                                    ")) + '_' + convert(varchar,day(" + sections[0] +
                                    ")) + '_' + convert(varchar,year(" +
                                    sections[0] + "))";
                            break;
                        case "DD":
                            part2 = part2.Replace(sections[0], "day(" + sections[0] + ")");
                            break;
                        case "MM":
                            part2 = part2.Replace(sections[0], "month(" + sections[0] + ")");
                            break;
                        case "YY":
                            part2 = "substring(convert(varchar, year(" + sections[0] + ")),3,2)";
                            break;
                        case "YYYY":
                            part2 = part2.Replace(sections[0], "year(" + sections[0] + ")");
                            break;
                        case "HH24":
                            part2 = part2.Replace(sections[0], "datepart(hour," + sections[0] + ")");
                            break;
                        case "HH":
                            part2 = part2.Replace(sections[0], "datepart(hour," + sections[0] + ")");
                            break;
                        case "MI":
                            part2 = part2.Replace(sections[0], "datepart(minute," + sections[0] + ")");
                            break;
                        default:
                            string temp = format;
                            break;
                    }
                }
                string part3 = sql.Substring(de);
                sql = part1 + part2 + part3;
            }
            return sql;
        }

        /// <summary>
		/// Replace an occurrence of Oracle TO_NUMBER function with CONVERT function
		/// </summary>
		/// <param name="sql">SQL statement to be converted</param>
		/// <returns>converted SQL</returns>
		private static string convertToNumber(string sql)
        {
            if (sql.ToLower().IndexOf("to_number(") >= 0)
            {
                //Figure out where the to_date statement begins
                int ds = sql.ToLower().IndexOf("to_number(");
                //Figure out where the to_date statement ends and break into sections
                string tmp = sql.Substring(ds + 10);
                string sectionval = "";
                bool inliteral = false;
                int de = 0;
                int parencount = 0;
                string numval = "";
                foreach (char chr in tmp.ToCharArray())
                {
                    de++;
                    if (chr.Equals('\''))
                    {
                        if (inliteral)
                        {
                            inliteral = false;
                        }
                        else
                        {
                            inliteral = true;
                        }
                    }
                    if (!inliteral && chr.Equals('('))
                    {
                        parencount++;
                    }
                    if (!inliteral && chr.Equals(')'))
                    {
                        if (parencount == 0)
                        {
                            numval = sectionval.Trim();
                            break;
                        }
                        else
                        {
                            parencount--;
                        }
                    }
                    sectionval += chr.ToString();
                }
                de += ds + 10;
                string part1 = sql.Substring(0, ds);
                string part2 = " CONVERT(numeric, " + numval + ")";
                string part3 = sql.Substring(de);
                sql = part1 + part2 + part3;
            }
            return sql;
        }

        /// <summary>
		/// Replace any occurrence of Oracle DECODE function with case statement
		/// </summary>
		/// <param name="sql">sql statement to be converted</param>
		/// <returns>converted sql</returns>
		private static string convertDecode(string sql)
        {
            if (sql.ToLower().IndexOf("decode(") >= 0)
            {
                //Figure out where the decode statement begins
                int ds = sql.ToLower().IndexOf("decode(");
                //Figure out where the deocde statement ends and break into sections
                string tmp = sql.Substring(ds + 7);
                string sectionval = "";
                bool inliteral = false;
                int de = 0;
                int parencount = 0;
                string[] sections = new string[4];
                foreach (char chr in tmp.ToCharArray())
                {
                    de++;
                    if (chr.Equals('\''))
                    {
                        if (inliteral)
                        {
                            inliteral = false;
                        }
                        else
                        {
                            inliteral = true;
                        }
                    }
                    if (!inliteral && chr.Equals('('))
                    {
                        parencount++;
                    }
                    if (!inliteral && chr.Equals(')'))
                    {
                        if (parencount == 0)
                        {
                            sections[3] = sectionval.Trim();
                            break;
                        }
                        else
                        {
                            parencount--;
                        }
                    }
                    if (!inliteral && chr.Equals(',') && parencount == 0)
                    {
                        if (sections[0] == null)
                        {
                            sections[0] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                        else if (sections[1] == null)
                        {
                            sections[1] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                        else if (sections[2] == null)
                        {
                            sections[2] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                    }
                    sectionval += chr.ToString();
                }
                de += ds + 7;
                string part1 = sql.Substring(0, ds);
                string part2 = " case when " + sections[0];
                if (sections[1].ToLower().Equals("null"))
                {
                    part2 += " is null";
                }
                else
                {
                    part2 += " = " + sections[1];
                }
                part2 += " then " + sections[2] + " else " + sections[3] + " end ";
                string part3 = sql.Substring(de);
                sql = part1 + part2 + part3;
            }
            return sql;
        }

        /// Remove Oracle new_time function
		/// </summary>
		/// <param name="sql">SQL statement to be converted</param>
		/// <returns>converted SQL</returns>
		public static string convertNewTime(string sql)
        {
            if (sql.ToLower().IndexOf("new_time(") >= 0)
            {
                //Figure out where the new_time statement begins
                int ds = sql.ToLower().IndexOf("new_time(");
                //Figure out where the new_time statement ends and break into sections
                string tmp = sql.Substring(ds + 9);
                string sectionval = "";
                bool inliteral = false;
                int de = 0;
                int parencount = 0;
                string[] sections = new string[4];
                foreach (char chr in tmp.ToCharArray())
                {
                    de++;
                    if (chr.Equals('\''))
                    {
                        if (inliteral)
                        {
                            inliteral = false;
                        }
                        else
                        {
                            inliteral = true;
                        }
                    }
                    if (!inliteral && chr.Equals('('))
                    {
                        parencount++;
                    }
                    if (!inliteral && chr.Equals(')'))
                    {
                        if (parencount == 0)
                        {
                            sections[3] = sectionval.Trim();
                            break;
                        }
                        else
                        {
                            parencount--;
                        }
                    }
                    if (!inliteral && chr.Equals(',') && parencount == 0)
                    {
                        if (sections[0] == null)
                        {
                            sections[0] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                        else if (sections[1] == null)
                        {
                            sections[1] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                        else if (sections[2] == null)
                        {
                            sections[2] = sectionval.Trim();
                            sectionval = "";
                            continue;
                        }
                    }
                    sectionval += chr.ToString();
                }
                de += ds + 9;
                string part1 = sql.Substring(0, ds);
                //Strip out new_time reference completely, as this is now being handled in C#
                string part2 = sections[0];
                string part3 = sql.Substring(de);
                sql = part1 + part2 + part3;
            }
            return sql;
        }

        /// <summary>
        /// Remove non-keyboard characters from specified value
        /// </summary>
        /// <param name="input">Value to be parsed for non-keyboard values</param>
        /// <returns>Input value with any non-keyboard values removed</returns>
        public static string StripUnicodeCharacters(string input)
        {
            return Regex.Replace(input, @"[^\p{IsBasicLatin}]|", String.Empty);
        }

        /// <summary>
        /// Decrypt the specified text
        /// </summary>
        /// <param name="x">Text to be decrypted</param>
        /// <returns>Decrypted text</returns>
        [DebuggerStepThrough]
        public static string decryptData(string x)
        {
            return DataUtils.decryptData(x, "TopVuepw", "TVs@lt");
        }

        /// <summary>
        /// Decrypt the specified text
        /// </summary>
        /// <param name="x">Text to be decrypted</param>
        /// <param name="encpwd">Encryption password</param>
        /// <param name="saltstring">String value for encryption salt</param>
        /// <returns>Decrypted text</returns>
        // Convert.FromBase64String will usually throw a exception, which we want to ignore for now.
        public static string decryptData(string x, string encpwd, string saltstring)
        {
            if (string.IsNullOrEmpty(x))
            {
                return "";
            }
            //Set up hashes and keys for decryption
            byte[] vecbytes = Encoding.UTF8.GetBytes("Z1X2Y3W4V5U6T7S8");
            byte[] saltbytes = Encoding.UTF8.GetBytes(saltstring);
            byte[] encryptedbytes = null;
            try
            {
                if (Regex.IsMatch(x, "(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?){1}") && x != null && !x.StartsWith("Provider=") && !x.StartsWith("Data Source="))
                {
                    encryptedbytes = Convert.FromBase64String(x);
                }
                else
                {
                    return x;
                }
                encryptedbytes = Convert.FromBase64String(x);
            }
            catch (Exception)
            {
                return x;
            }
            //Set password and type of decryption
            PasswordDeriveBytes password = new PasswordDeriveBytes(encpwd, saltbytes, "MD5", 1);
            byte[] keybytes = password.GetBytes(16);
            RijndaelManaged symkey = new RijndaelManaged();
            symkey.Mode = CipherMode.CBC;
            //symkey.Padding = PaddingMode.None; - caused junk to be added to end of decoded string
            //Create and initialize decryptor
            ICryptoTransform decryptor = symkey.CreateDecryptor(keybytes, vecbytes);
            using (MemoryStream ms = new MemoryStream(encryptedbytes))
            {
                //Specify data to be decrypted
                using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                {
                    byte[] textbytes = new byte[encryptedbytes.Length];
                    //Read data into byte array
                    int bc = cs.Read(textbytes, 0, textbytes.Length);
                    //Close memory objects
                    ms.Close();
                    cs.Close();
                    //Convert byte array into UTF8 string and return
                    string decoded = Encoding.UTF8.GetString(textbytes, 0, bc);
                    return decoded;
                }
            }
        }

        /// <summary>
        /// Checks string value to see if it contains a valid date and specifies a time other than midnight
        /// </summary>
        /// <param name="xdate">value to compare</param>
        /// <returns>true if value passed is a date and contains a time other than midnight, otherwise false</returns>
        public static bool hasTime(string xdate)
        {
            bool valid = true;
            try
            {
                DateTime tdate = Convert.ToDateTime(xdate);
                if (tdate.Hour == 0 && tdate.Minute == 0)
                {
                    valid = false;
                }
            }
            catch (Exception)
            {
                //not a valid date
                valid = false;
            }
            return valid;
        }




    }

}
