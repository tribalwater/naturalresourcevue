using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using Microsoft.AspNetCore.Mvc;

namespace DbUitlsCoreTest.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<dynamic> Hello()
        {
            var dbTest = new DapperHelper("Data Source = tribald.com, 1433; Initial Catalog = sbwaternewtest; Database = sbwaternewtest; User Id = sbwaternewtest; Password = sbwaternewtest; ", "SQLSEVER");
            // var res = dbTest.QueryTable("SELECT TOP (100) [PARTNO] ,[PARTNAME],[PARTTYPECD] ,[CBRN] FROM  [sbwaternewtest].[dbo].[PART_PROPERTIES] where PARTTYPE = 'welltag'");
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add("PARTTYPE", "welltag");
            whereDict.Add("PARTNO", "0341");

            string[] selectArray = { "PARTNO", "PARTTYPE" };
            var res = dbTest.GetList( "PART_PROPERTIES", null, whereDict);

           // Console.WriteLine(well.getType)
            return res.ToList();
        
         }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
