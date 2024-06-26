﻿using System.Collections.Generic;
using System.Linq;
using Interfaces.Leagues.DataAccess;
using Interfaces.Leagues.DataAccess.Model;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Implementations.Core.DataAccess;
using Interfaces.Leagues.BuisnessLogic.Model;
using MongoDB.Bson;

namespace Implementations.Leagues.DataAccess
{
    public sealed class LeaguesRepository : MongoRepository<LeagueDb>, ILeaguesRepository
    {
        protected override string CollectionName => "leagues";
        
        public IEnumerable<LeagueDb> GetAll()
        {
            return Collection.AsQueryable<LeagueDb>().ToList();
        }

        public LeagueDb Get(string leagueId)
        {
            return Collection.AsQueryable<LeagueDb>().Where(x => x.EntityId == leagueId).First();
        }

        public void Create(LeagueUnsecureViewModel model)
        {
            var admins = model.Admins.Select(x => x.Id);

            var entity = new LeagueDb
            {
                EntityId = ObjectId.GenerateNewId().ToString(),
                Name = model.Name,
                Type = model.Type,
                Description = model.Description,
                VkSecurityGroup = model.VkGroup,
                Admins = admins
            };

            Collection.InsertOne(entity);
        }

        public void Update(LeagueUnsecureViewModel model)
        {
            var admins = model.Admins.Select(x => x.Id);

            var filter = Builders<LeagueDb>.Filter.Eq(x => x.EntityId, model.Id);
            var update = Builders<LeagueDb>.Update
                .Set(x => x.Name, model.Name)
                .Set(x => x.SubName, model.SubName)
                .Set(x => x.Description, model.Description)
                .Set(x => x.Information, model.Information)
                .Set(x => x.VkSecurityGroup, model.VkGroup)
                .Set(x => x.MediaId, model.MediaId)
                .Set(x => x.Type, model.Type)
                .Set(x => x.Admins, admins);

            Collection.UpdateOne(filter, update);
        }

        public void Delete(string leagueId)
        {
            var filter = Builders<LeagueDb>.Filter.Eq(x => x.EntityId, leagueId);

            Collection.DeleteMany(filter);
        }
    }
}
