using System.Net;
using System.Net.Http.Headers;
using DiySoccer.Core.Attributes;
using Interfaces.Core;
using Interfaces.Core.Services.Medias.BuisnessLogic;
using Microsoft.AspNetCore.Mvc;

namespace DiySoccer.Api
{
    public class ImageApiController : BaseApiController
    {
        private readonly IMediaManager _mediaManager;

        public ImageApiController(IMediaManager mediaManager)
        {
            _mediaManager = mediaManager;
        }

        #region GET

        [Route("api/image/{mediaId}")]
        //[CacheOutput]
        [HttpGet]
        public IActionResult GetCutImage(string mediaId, int? width = null, int? height = null)
        {
            var model = _mediaManager.GetCutImage(mediaId, width, height);
            if (model == null)
                return new NotFoundResult();

            return new FileContentResult(model.Content, model.ContentType);
        }

        [Route("api/image/uncut/{mediaId}")]
        //[CacheOutput]
        [HttpGet]
        public IActionResult GetImage(string mediaId, int? width = null, int? height = null)
        {
            var model = _mediaManager.GetImage(mediaId, width, height);
            if (model == null)
                return new NotFoundResult();

            return new FileContentResult(model.Content, model.ContentType);
        }

        #endregion

        #region POST

        [Route("api/upload/logo")]
        [DiySoccerAuthorize(LeagueAccessStatus.Editor)]
        [HttpPost]
        public async Task<MediaViewModel> UploadImage([FromForm] IFormFile file)
        {
            using (var sr = new StreamReader(file.OpenReadStream()))
            {
                var content = await sr.ReadToEndAsync();
                
                var media = _mediaManager.Upload(file.FileName, content, file.ContentType);
                
                return media;
            }
        }

        #endregion
    }
}