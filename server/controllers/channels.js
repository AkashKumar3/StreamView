import Channel from '../models/Channel.js';
import Video from '../models/Video.js';

export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const existingChannel = await Channel.findOne({ name });
    if (existingChannel) {
      return res.status(400).json({ message: 'Channel name already taken' });
    }

    const channel = await Channel.create({
      name,
      description,
      owner: req.userId
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating channel' });
  }
};

export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'username avatar');
    
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const videos = await Video.find({ uploader: channel.owner })
      .sort({ createdAt: -1 });

    res.json({ channel, videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching channel' });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { name, description, banner } = req.body;
    const channel = await Channel.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { name, description, banner },
      { new: true }
    );

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating channel' });
  }
};

export const subscribeToChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.subscribers.includes(req.userId)) {
      channel.subscribers = channel.subscribers.filter(id => id.toString() !== req.userId);
    } else {
      channel.subscribers.push(req.userId);
    }

    await channel.save();
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription' });
  }
};