const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res) => {
  const feedback = await Feedback.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json(feedback);
};

exports.getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find();

  res.json(feedback);
};
exports.getMyFeedback = async (req, res) => {
  const orders = await Feedback.find({
    userId: req.user.id,
  });

  res.json(orders);
};

exports.updateFeedback = async (req, res) => {
  const feedback = await Feedback.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id,
    },
    req.body,
    { new: true },
  );
  res.json(feedback);
};

exports.deleteFeedback = async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
};

exports.addAdminComment = async (req, res) => {
  try {
    const { adminComment } = req.body;

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    feedback.adminComment = adminComment;

    await feedback.save();

    res.json({
      message: "Comment added successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
