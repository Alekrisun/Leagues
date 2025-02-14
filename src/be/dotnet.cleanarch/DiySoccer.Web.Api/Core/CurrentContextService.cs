using System.IdentityModel.Tokens.Jwt;
using System.Text;
using DiySoccer.Application.Core.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DiySoccer.Web.Api.Core;

public class CurrentContextService : ICurrentContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IIdentityService _identityService;
    private readonly IOptions<AppSettings> _appSettings;

    private string? _id = null;
    
    public CurrentContextService(IHttpContextAccessor httpContextAccessor, IOptions<AppSettings> appSettings, IIdentityService identityService)
    {
        _httpContextAccessor = httpContextAccessor;
        _appSettings = appSettings;
        _identityService = identityService;
    }
    
    public async Task<string?> GetCurrentUserId()
    {
        if (_httpContextAccessor.HttpContext == null)
            throw new NullReferenceException("HttpContext is null");

        if (_id != null)
            return _id;
        
        var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token != null)
            _id = await AttachUserToContext(_httpContextAccessor.HttpContext, token);
        else
            _id = string.Empty;
        
        return _id;
    }

    public string? GetCurrentLeagueId()
    {
        if (_httpContextAccessor.HttpContext == null)
            throw new NullReferenceException("HttpContext is null");
        
        return _httpContextAccessor.HttpContext.Request.RouteValues.ContainsKey("leagueId") 
            ? _httpContextAccessor.HttpContext.Request.RouteValues["leagueId"].ToString() 
            : string.Empty;
    }

    private async Task<string?> AttachUserToContext(HttpContext context, string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.First(x => x.Type == "id").Value;

            // attach user to context on successful jwt validation
            return await _identityService.GetUserIdAsync(userId);
        }
        catch
        {
            // do nothing if jwt validation fails
            // user is not attached to context so request won't have access to secure routes
            return string.Empty;
        }
    }
}
