using interfaces.Entities;
using interfaces.Models;

namespace interfaces.Services;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(string id);
}