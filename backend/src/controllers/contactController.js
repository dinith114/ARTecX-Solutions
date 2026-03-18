const Contact = require("../models/Contact");

const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    const trimmedFullName = fullName?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedFullName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Full name validation
    if (!/^[A-Za-z\s]+$/.test(trimmedFullName)) {
      return res.status(400).json({
        success: false,
        message: "Full name can only contain letters and spaces.",
      });
    }

    const nameParts = trimmedFullName.split(/\s+/).filter(Boolean);

    if (nameParts.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter your full name (first and last name).",
      });
    }

    const invalidNamePart = nameParts.some((part) => part.length < 2);

    if (invalidNamePart) {
      return res.status(400).json({
        success: false,
        message: "Each part of the name must have at least 2 letters.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Message validation
    if (trimmedMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long.",
      });
    }

    if (!/[A-Za-z]/.test(trimmedMessage)) {
      return res.status(400).json({
        success: false,
        message: "Message must contain meaningful text.",
      });
    }

    const words = trimmedMessage.toLowerCase().split(/\s+/).filter(Boolean);
    const uniqueWords = new Set(words);

    if (words.length >= 3 && uniqueWords.size < 3) {
      return res.status(400).json({
        success: false,
        message: "Please enter a more meaningful message.",
      });
    }

    const newContact = await Contact.create({
      fullName: trimmedFullName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newContact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["New", "In Progress", "Replied"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value.",
      });
    }

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting message:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


module.exports = {
  submitContactForm,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
};