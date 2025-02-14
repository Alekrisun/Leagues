using DiySoccer.Domain.Constants;

namespace DiySoccer.Application.Core.Security;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
public class AuthorizeAttribute : Attribute
{
    public string Role { get; set; }
}
