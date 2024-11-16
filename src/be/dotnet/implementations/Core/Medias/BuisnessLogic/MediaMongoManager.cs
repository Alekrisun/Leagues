using System.Drawing;
using Interfaces.Core.Services.Medias.BuisnessLogic;
using Interfaces.Core.Services.Medias.DataAccess;

namespace Implementations.Core.Medias.BuisnessLogic
{
    public class MediaMongoManager : IMediaManager
    {
        private readonly IMediaRepository _mediaRepository;

        public MediaMongoManager(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        public MediaIOViewModel GetCutImage(string mediaId, int? width, int? height)
        {
            var media = _mediaRepository.Get(mediaId);
            if (media == null || media.DataBytes == null)
                return null;

            Stream stream = null; 
            if (width.HasValue && height.HasValue)
            {
                var size = new Size(width.Value, height.Value);
                stream = CreateImage(media, size, true);
            }
            else
            {
                stream = CreateImage(media, null, true);
            }

            return new MediaIOViewModel
            {
                Stream = stream,
                ContentType = media.ContentType
            };
        }

        public MediaIOViewModel GetImage(string mediaId, int? width, int? height)
        {
            var media = _mediaRepository.Get(mediaId);
            if (media == null || media.DataBytes == null)
                return null;

            Stream stream = null;
            if (width.HasValue && height.HasValue)
            {
                var size = new Size(width.Value, height.Value);
                stream = CreateImage(media, size, true);
            }
            else
            {
                stream = CreateImage(media, null, true);
            }

            return new MediaIOViewModel
            {
                Stream = stream,
                ContentType = media.ContentType
            };
        }

        private MemoryStream CreateImage(MediaDb media, Size? size, bool cut)
        {
            throw new NotImplementedException();
            //int quality = 70;
            //var format = new PngFormat(); // we gonna convert a jpeg image to a png one
//
            //using (var inStream = new MemoryStream(media.DataBytes))
            //{
            //    var outStream = new MemoryStream();
            //                    
            //    // Initialize the ImageFactory using the overload to preserve EXIF metadata.
            //    using (var imageFactory = new ImageFactory(preserveExifData: true))
            //    {
            //        // Do your magic here
            //        var factory = imageFactory
            //            .Load(inStream);
//
            //        if (size.HasValue)
            //        {
            //            factory = factory
            //                .Resize(size.Value);
            //        }
            //        else
            //        {
            //            if (cut)
            //            {
            //                factory = factory
            //                    .RoundedCorners(new RoundedCornerLayer(190, true, true, true, true));
            //            }
            //        }                        
//
            //        factory = factory
            //            .Format(format)
            //            .Quality(quality)
            //            .Save(outStream);
//
            //        return outStream;
            //    }                
            //}
        }

        //public MediaViewModel Upload(HttpPostedFile file)
        //{
        //    if (file == null || file.ContentLength == 0)
        //        return null;
//
        //    byte[] fileData = null;
        //    using (var binaryReader = new BinaryReader(file.InputStream))
        //    {
        //        fileData = binaryReader.ReadBytes(file.ContentLength);
        //    }
//
        //    var entity = new MediaDb
        //    {
        //        Name = file.FileName,
        //        ContentType = file.ContentType,
        //        DataBytes = fileData
        //    };
        //    var media = _mediaRepository.Add(entity);
//
        //    return new MediaViewModel
        //    {
        //        Id = media.EntityId,
        //    };
        //}
    }
}
