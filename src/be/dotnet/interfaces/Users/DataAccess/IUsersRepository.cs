
namespace Interfaces.Users.DataAccess
{
    public interface IUsersRepository
    {
        IEnumerable<UserAuthDb> GetRange(IEnumerable<string> ids);

        UserAuthDb GetByUserName(string userName);

        IEnumerable<UserAuthDb> Find(string query, int page, int pageSize);
    }
}
