export default function VideoCard({ video }) {
    const { title, thumbnailUrl, channelName, views, uploadDate } = video;
  
    return (
      <div className="flex flex-col gap-2">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <img
              className="w-9 h-9 rounded-full"
              src="https://via.placeholder.com/36"
              alt={channelName}
            />
          </div>
          <div>
            <h3 className="font-semibold line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600">{channelName}</p>
            <p className="text-sm text-gray-600">
              {views.toLocaleString()} views • {uploadDate}
            </p>
          </div>
        </div>
      </div>
    );
  }