import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller Function to Manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
  console.log("Webhook received:", req.body);

  try {
    // Getting data from request body
    const { data, type } = req.body;
    console.log("Incoming data:", JSON.stringify(req.body, null, 2));


    // Switch Cases for different Events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        };
        console.log("📥 Saving user to MongoDB:", userData);
        await User.create(userData);
        res.json({success: true});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        console.log("📥 Updating user data:", userData);
        await User.findByIdAndUpdate(data.id, userData);
        res.json({success : true});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({success : true});
        break;
      }

      default:
        res.status(400).json({ success: false, message: "Unknown webhook type" });
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Webhooks Error' });
  }
};
