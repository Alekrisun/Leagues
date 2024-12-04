using Implementations.Authenticate.BuisnessLogic;
using Implementations.Calendar;
using Implementations.Core;
using Implementations.Core.Medias.BuisnessLogic;
using Implementations.Core.Medias.DataAccess;
using Implementations.Events;
using Implementations.Events.BuisnessLogic;
using Implementations.Events.DataAccess;
using Implementations.GameApproval.BuisnessLogic;
using Implementations.GameApproval.DataAccess;
using Implementations.Games;
using Implementations.Games.BuisnessLogic;
using Implementations.Games.DataAccess;
using Implementations.Leagues;
using Implementations.Leagues.BuisnessLogic;
using Implementations.Leagues.DataAccess;
using Implementations.Teams;
using Implementations.Teams.BuisnessLogic;
using Implementations.Teams.DataAccess;
using Implementations.Unions;
using Implementations.Users.BuisnessLogic;
using Implementations.Users.DataAccess;
using Interfaces.Authenticate.BuisnessLogic;
using Interfaces.Calendar;
using Interfaces.Core.Services.Medias.BuisnessLogic;
using Interfaces.Core.Services.Medias.DataAccess;
using Interfaces.Events.BuisnessLogic;
using Interfaces.Events.DataAccess;
using Interfaces.GameApproval.BuisnessLogic;
using Interfaces.GameApproval.DataAccess;
using Interfaces.Games.BuisnessLogic;
using Interfaces.Games.DataAccess;
using Interfaces.Leagues.BuisnessLogic;
using Interfaces.Leagues.DataAccess;
using Interfaces.Teams.BuisnessLogic;
using Interfaces.Teams.DataAccess;
using Interfaces.Unions.BuisnessLogic;
using Interfaces.Users.BuisnessLogic;
using Interfaces.Users.DataAccess;

namespace DiySoccer.Core.Attributes;

public static class ServiceCollectionExtensions
{
    public static void AddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ITeamsManager, TeamsManager>();
        serviceCollection.AddScoped<ITeamsRepository, TeamsRepository>();
        serviceCollection.AddScoped<IUsersRepository, UsersRepository>();
        serviceCollection.AddScoped<IPlayersRepository, PlayersRepository>();
        serviceCollection.AddScoped<IUsersManager, UsersManager>();
        serviceCollection.AddScoped<IGamesManager, GamesManager>();
        serviceCollection.AddScoped<IGamesRepository, GamesRepository>();
        serviceCollection.AddScoped<IGameApprovalManager, GameApprovalManager>();
        serviceCollection.AddScoped<IGameApprovalRepository, GameApprovalRepository>();
        serviceCollection.AddScoped<ITournamentsManager, TournamentsManager>();
        serviceCollection.AddScoped<ILeaguesManager, LeaguesManager>();
        serviceCollection.AddScoped<ILeaguesRepository, LeaguesRepository>();
        serviceCollection.AddScoped<IAuthenticateManager, AuthenticateManager>();
        serviceCollection.AddScoped<IMediaManager, MediaMongoManager>();
        serviceCollection.AddScoped<IMediaRepository, MediaRepository>();
        serviceCollection.AddScoped<ICalendarManager, CalendarManager>();
        serviceCollection.AddScoped<IEventsManager, EventsManager>();
        serviceCollection.AddScoped<IEventsRepository, EventsRepository>();

        serviceCollection.AddScoped<EventsMapper>();
        serviceCollection.AddScoped<GamesMapper>();
        serviceCollection.AddScoped<TeamsMapper>();
        serviceCollection.AddScoped<LeaguesMapper>();
        serviceCollection.AddScoped<TournamentsMapper>();

        serviceCollection.AddScoped<UserStatisticCalculation>();
        serviceCollection.AddScoped<ScoreCalculation>();

        serviceCollection.AddHttpContextAccessor();
    }
}