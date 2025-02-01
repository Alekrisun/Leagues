using System.Reflection;
using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Application.Core.Security;
using DiySoccer.Domain.Constants;
using DiySoccer.Domain.Entities;
using MediatR;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace DiySoccer.Application.Core.Behaviours;

public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    private readonly ICurrentContext _currentContext;
    private readonly IIdentityService _identityService;
    private readonly IApplicationDbContext _context;
    
    
    public AuthorizationBehaviour(
        ICurrentContext currentContext,
        IIdentityService identityService, 
        IApplicationDbContext context)
    {
        _currentContext = currentContext;
        _identityService = identityService;
        _context = context;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var authorizeAttributes = request.GetType().GetCustomAttributes<AuthorizeAttribute>();

        if (!authorizeAttributes.Any())
            return await next();
        
        var currentUserId = await _currentContext.GetCurrentUserId();
        if (string.IsNullOrEmpty(currentUserId))
            throw new UnauthorizedAccessException();
            
        var authorizeAttributesWithRoles = authorizeAttributes
            .Where(a => !string.IsNullOrWhiteSpace(a.Role))
            .ToList();
        if (!authorizeAttributesWithRoles.Any())
            return await next();
        
        var user = await _identityService.GetUserAsync(currentUserId);
        if (user == null)
            throw new UnauthorizedAccessException();

        if (user.IsAdmin)
            return await next();
        
        var leagueId = _currentContext.GetCurrentLeagueId();
        var league = await _context.Leagues
            .AsQueryable()
            .FirstOrDefaultAsync(x => x.EntityId == leagueId, cancellationToken: cancellationToken);
        if (league == null)
            throw new UnauthorizedAccessException();
                    
        foreach (var authorizeAttributeWithRoles in authorizeAttributesWithRoles)
        {
            switch (authorizeAttributeWithRoles.Role)
            {
                case Roles.Administrator:
                case Roles.Editor:
                    if (league.Admins.All(x => x != user.Id))
                        throw new UnauthorizedAccessException();
                    return await next();
                case Roles.Member:
                case Roles.None:
                default:
                    return await next();
            }
        }
        
        return await next();
        
            // Policy-based authorization
            //var authorizeAttributesWithPolicies = authorizeAttributes.Where(a => !string.IsNullOrWhiteSpace(a.Policy));
            //if (authorizeAttributesWithPolicies.Any())
            //{
            //    foreach (var policy in authorizeAttributesWithPolicies.Select(a => a.Policy))
            //    {
            //        var authorized = await _identityService.AuthorizeAsync(_user.Id, policy);
            //        if (!authorized)
            //        {
            //            throw new UnauthorizedAccessException();
            //        }
            //    }
            //}

        // User is authorized / authorization not required
        
    }
}
