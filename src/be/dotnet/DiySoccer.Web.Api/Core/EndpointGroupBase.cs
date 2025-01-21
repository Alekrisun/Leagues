namespace DiySoccer.Web.Api.Core;

public abstract class EndpointGroupBase
{
    public abstract void Map(WebApplication app);
    public abstract string GroupRoute { get; }
}