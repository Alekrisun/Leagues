﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace DiySoccer
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "login",
                url: "account/login",
                defaults: new { controller = "Account", action = "Login" }
            );
              
            routes.MapRoute(
                name: "logout",
                url: "account/logoff",
                defaults: new { controller = "Account", action = "LogOff" }
            );
            
            routes.MapRoute("SinglePage", "{*url}", 
                new { controller = "Home", action = "Index" });
        }
    }
}
