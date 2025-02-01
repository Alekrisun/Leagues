using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Web.Api.Core;

namespace DiySoccer.Web.Api;

public static class DependencyInjection
{
    public static void AddWebServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddHttpContextAccessor();
        builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
        
        builder.Services.AddScoped<ICurrentContext, CurrentContextService>();
    }
}