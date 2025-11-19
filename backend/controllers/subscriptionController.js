import SubscriptionModel from "../models/SubscriptionModel.js";
import nodemailer from "nodemailer";
import { Resend } from 'resend';
// Subscribe a new email
const subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes("@")) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    // Check if email already exists
    const existingSubscription = await SubscriptionModel.findOne({ email });
    if (existingSubscription) {
      return res.json({ success: false, message: "Email already subscribed" });
    }

    // Create new subscription
    const subscription = new SubscriptionModel({ email });
    await subscription.save();

    res.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.log("Subscription error:", error);
    res.json({ success: false, message: "Error subscribing" });
  }
};

// Get all subscribers
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await SubscriptionModel.find({}).sort({
      subscribedAt: -1,
    });
    res.json({ success: true, data: subscribers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching subscribers" });
  }
};


// const sendPromotion = async (req, res) => {
//     try {
//         const { subject, message } = req.body;

//         if (!subject || !message) {
//             return res.json({
//                 success: false,
//                 message: "Subject and message are required",
//             });
//         }

//         // Get all subscribers
//         const subscribers = await SubscriptionModel.find({});

//         if (subscribers.length === 0) {
//             return res.json({ success: false, message: "No subscribers found" });
//         }

//         // Configure nodemailer transporter (Using your App Password env vars)
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASSWORD, // This should be the Gmail App Password
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         // 1. Create an array of email promises
//         const emailPromises = subscribers.map((subscriber) => {
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: subscriber.email,
//                 subject: subject,
//                 html: `
//                     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                         <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
//                             <h1 style="color: white; margin: 0;">Little Lemon</h1>
//                         </div>
//                         <div style="padding: 30px; background-color: #f9fafb;">
//                             <div style="white-space: pre-wrap;">${message}</div>
//                         </div>
//                         <div style="padding: 20px; text-align: center; background-color: #1f2937; color: white;">
//                             <p style="margin: 0; font-size: 12px;">© 2025 Little Lemon. All rights reserved.</p>
//                         </div>
//                     </div>
//                 `,
//             };
//             return transporter.sendMail(mailOptions);
//         });

//         // 2. Wait for all emails to settle (success or failure)
//         const results = await Promise.allSettled(emailPromises);

//         // 3. Analyze the results
//         const failedEmails = results.filter(result => result.status === 'rejected');
//         const successfulEmails = results.filter(result => result.status === 'fulfilled');

//         if (failedEmails.length > 0) {
//             // Log the errors for debugging (check your Railway logs!)
//             failedEmails.forEach((failure, index) => {
//                 // Find the index of the failed email to get the subscriber's email
//                 const originalIndex = results.findIndex(r => r === failure);
//                 if (originalIndex !== -1) {
//                     console.error(`Email to ${subscribers[originalIndex].email} failed:`, failure.reason);
//                 } else {
//                     console.error("An email failed to send (details below):", failure.reason);
//                 }
//             });
            
//             // If some succeed but some fail, return a partial success message
//             if (successfulEmails.length > 0) {
//                 return res.json({
//                     success: true,
//                     message: `Promotional email sent to ${successfulEmails.length} subscribers. ${failedEmails.length} emails failed. Check server logs for details.`,
//                 });
//             } else {
//                  // If ALL fail, return a complete failure message
//                 return res.json({
//                     success: false,
//                     message: "All promotional emails failed to send. Check server logs for details.",
//                 });
//             }
//         }

//         // 4. Return true success if ALL promises were fulfilled
//         res.json({
//             success: true,
//             message: `Promotional email sent to ${successfulEmails.length} subscribers!`,
//         });

//     } catch (error) {
//         // This catch block handles critical errors like DB connection issues, or transporter creation failure.
//         console.log(error); 
//         res.json({ success: false, message: "Critical server error during email process. Check logs." });
//     }
// };

const sendPromotion = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.json({
        success: false,
        message: "Subject and message are required",
      });
    }

    // Get all subscribers
    const subscribers = await SubscriptionModel.find({});

    if (subscribers.length === 0) {
      return res.json({
        success: false,
        message: "No subscribers found"
      });
    }

    // Initialize Resend with your API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Create an array of email promises
    const emailPromises = subscribers.map((subscriber) => {
      return resend.emails.send({
       from: 'Little Lemon <onboarding@resend.dev>',// Change this to your verified domain
        to: subscriber.email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #F4CE14;">Little Lemon</h2>
            <div style="margin: 20px 0;">
              ${message}
            </div>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              © 2025 Little Lemon. All rights reserved.
            </p>
          </div>
        `,
      });
    });

    // 2. Wait for all emails to settle (success or failure)
    const results = await Promise.allSettled(emailPromises);

    // 3. Analyze the results
    const failedEmails = results.filter(result => result.status === 'rejected');
    const successfulEmails = results.filter(result => result.status === 'fulfilled');

    if (failedEmails.length > 0) {
      // Log the errors for debugging
      failedEmails.forEach((failure, index) => {
        const originalIndex = results.findIndex(r => r === failure);
        if (originalIndex !== -1) {
          console.error(`Email to ${subscribers[originalIndex].email} failed:`, failure.reason);
        } else {
          console.error("An email failed to send (details below):", failure.reason);
        }
      });

      // If some succeed but some fail, return a partial success message
      if (successfulEmails.length > 0) {
        return res.json({
          success: true,
          message: `Promotional email sent to ${successfulEmails.length} subscribers. ${failedEmails.length} emails failed. Check server logs for details.`,
        });
      } else {
        // If ALL fail, return a complete failure message
        return res.json({
          success: false,
          message: "All promotional emails failed to send. Check server logs for details.",
        });
      }
    }

    // 4. Return true success if ALL promises were fulfilled
    res.json({
      success: true,
      message: `Promotional email sent to ${successfulEmails.length} subscribers!`,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Critical server error during email process. Check logs."
    });
  }
};

export { subscribeEmail, getSubscribers, sendPromotion };
