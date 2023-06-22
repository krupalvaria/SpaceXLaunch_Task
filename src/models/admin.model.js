const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema(
  {
    sName: String,
    sEmail: String,
    sPassword: String,
    nPhoneNumber: String,
    bIsPaid: { type: Boolean, default: false },
    sUserRole: {
      type: String,
      enum: ["Admin", "User"],
      default: "User"
    }
  },
  {
    timestamps: true
  }
);

AdminSchema.pre("save", async function (next) {
  if (this.sPassword) {
    this.sPassword = await bcrypt.hash(this.sPassword, 8);
  }
  next();
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
