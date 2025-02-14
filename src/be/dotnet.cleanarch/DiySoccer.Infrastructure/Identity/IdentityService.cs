using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using DiySoccer.Application.Core.Interfaces;
using DiySoccer.Application.Core.Models;
using DiySoccer.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DiySoccer.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    //private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    //private readonly IAuthorizationService _authorizationService;

    private IOptions<AppSettings> _appSettings;
    
    public IdentityService(IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings;
    }

    private static List<ApplicationUserDb> _users = new List<ApplicationUserDb>
    {
        new ApplicationUserDb
        {
            Id = "1", 
            FirstName = "Aleksei", 
            LastName = "K.",
            Username = "aleksei.kriachko@protonmail.com", 
            Password = "123456",
            IsAdmin = true 
        },
        new ApplicationUserDb
        {
            Id = "56f2fab83cbc6a10542a5946", 
            FirstName = "Editor", 
            LastName = "E.",
            Username = "editor", 
            Password = "123456"
        }
    };
    
    public Task<string?> GetUserIdAsync(string userId)
    {
        var user = _users.SingleOrDefault(x => x.Id == userId)?.Id;

        return Task.FromResult(user);
    }

    public Task<ApplicationUserDb?> GetUserAsync(string userId)
    {
        var user = _users.SingleOrDefault(x => x.Id == userId);

        return Task.FromResult(user);
    }

    public Tuple<string?, ApplicationUserDb?> GenerateTokenAsync(string userName, string password)
    {
        var user = _users.SingleOrDefault(x => x.Username == userName && x.Password == password);

        // return null if user not found
        if (user == null) return Tuple.Create((string?)null, (ApplicationUserDb?)null);

        // authentication successful so generate jwt token
        var token = generateJwtToken(user);

        return Tuple.Create(token, user);
    }
    
    private string generateJwtToken(ApplicationUserDb user)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
