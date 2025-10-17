import SubscriptionModel from "../models/SubscriptionModel.js";
import nodemailer from "nodemailer";

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

// // Send promotional email to all subscribers
// const sendPromotion = async (req, res) => {
//   try {
//     const { subject, message } = req.body;

//     if (!subject || !message) {
//       return res.json({
//         success: false,
//         message: "Subject and message are required",
//       });
//     }

//     // Get all subscribers
//     const subscribers = await SubscriptionModel.find({});

//     if (subscribers.length === 0) {
//       return res.json({ success: false, message: "No subscribers found" });
//     }

//     // // Configure nodemailer transporter
//     // const transporter = nodemailer.createTransport({
//     //     service: 'gmail',
//     //     auth: {
//     //         user: process.env.EMAIL_USER,
//     //         pass: process.env.EMAIL_PASSWORD
//     //     }
//     // });

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     // Send emails to all subscribers
//     const emailPromises = subscribers.map((subscriber) => {
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: subscriber.email,
//         subject: subject,
//         html: `
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
//       };
//       return transporter.sendMail(mailOptions);
//     });

//     await Promise.all(emailPromises);

//     res.json({
//       success: true,
//       message: `Promotional email sent to ${subscribers.length} subscribers`,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error sending promotional emails" });
//   }
// };


const sendPromotion = async (req, res) => {
    try {
        const { subject, message } = req.body;
        // ... (check for subject/message and subscribers.length) ...

        // ... (transporter creation) ...

        // Create an array of email promises
        const emailPromises = subscribers.map((subscriber) => {
            const mailOptions = {
                // ... (mail options) ...
            };
            return transporter.sendMail(mailOptions);
        });

        // 🛑 CRITICAL CHANGE: Use Promise.allSettled to track success/failure for each email
        const results = await Promise.allSettled(emailPromises);

        // Analyze the results
        const failedEmails = results.filter(result => result.status === 'rejected');
        const successfulEmails = results.filter(result => result.status === 'fulfilled');

        if (failedEmails.length > 0) {
            // Log the errors for debugging (check your Railway logs!)
            failedEmails.forEach((failure, index) => {
                console.error(`Email to subscriber ${index + 1} failed:`, failure.reason);
            });
            
            // If some succeed but some fail, return a mixed success message
            if (successfulEmails.length > 0) {
                return res.json({
                    success: true, // Still technically a success as some were sent
                    message: `Promotional email sent to ${successfulEmails.length} subscribers. ${failedEmails.length} emails failed to send. Check logs for details.`,
                });
            } else {
                 // If ALL fail, treat as a complete failure
                return res.json({
                    success: false,
                    message: "All promotional emails failed to send. Check logs for details.",
                });
            }
        }

        // Only return true success if ALL promises were fulfilled
        res.json({
            success: true,
            message: `Promotional email sent to ${successfulEmails.length} subscribers!`,
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "A server error occurred during email processing." });
    }
};

export { subscribeEmail, getSubscribers, sendPromotion };
