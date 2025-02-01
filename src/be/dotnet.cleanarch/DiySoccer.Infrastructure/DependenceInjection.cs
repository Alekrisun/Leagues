using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Infrastructure.Data.Mongo;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DiySoccer.Infrastructure;

public static class DependenceInjection
{
    public static void AddInfrastructureServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
    }
}