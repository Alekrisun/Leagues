using System;
using System.Net.Http.Headers;
using System.Web.Http.Filters;

namespace DiySoccer.Core.Attributes
{
    public class CacheFilter : ActionFilterAttribute  
    {  
        private int TimeDuration { get; set; }

        public CacheFilter()
        {
            this.TimeDuration = 3600;
        }
        
        public CacheFilter(int maxAgeInSeconds)
        {
            this.TimeDuration = maxAgeInSeconds;
        }
        
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)  
        {  
            actionExecutedContext.Response.Headers.CacheControl = new CacheControlHeaderValue  
            {  
                MaxAge = TimeSpan.FromSeconds(TimeDuration),  
                MustRevalidate = true,  
                Public = true  
            };  
        }  
    } 
}