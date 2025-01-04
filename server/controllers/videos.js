import Video from '../models/Video.js';

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('uploader', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploader', 'username avatar');
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video' });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl } = req.body;
    const video = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      uploader: req.userId
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video' });
  }
};