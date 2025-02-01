using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Infrastructure.Data.Mongo;
using DiySoccer.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DiySoccer.Infrastructure;

public static class DependenceInjection
{
    public static void AddInfrastructureServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        
        
        builder.Services.AddTransient<IIdentityService, IdentityService>();
        
        builder.Services.AddAuthentication()
            .AddBearerToken(IdentityConstants.BearerScheme);

        builder.Services.AddAuthorizationBuilder();


        //builder.Services.AddAuthorization(options => options.(Policies.CanPurge, policy => policy.RequireRole(Roles.Administrator)));
    }
}