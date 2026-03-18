const express = require("express");
const router = express.Router();

const {
  submitContactForm,
  getAllMessages,
  updateMessageStatus,
  deleteMessage
} = require("../controllers/contactController");

const { protectAdmin } = require("../middleware/authMiddleware");

router.post("/", submitContactForm);
router.get("/", protectAdmin, getAllMessages);
router.patch("/:id/status", protectAdmin, updateMessageStatus);
router.delete("/:id", protectAdmin, deleteMessage);

module.exports = router;