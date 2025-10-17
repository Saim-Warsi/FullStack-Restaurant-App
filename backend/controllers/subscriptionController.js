import SubscriptionModel from "../models/SubscriptionModel.js";
import nodemailer from "nodemailer";

const subscribeEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.json({ success: false, message: "Invalid email address" });
        }

        const existingSubscription = await SubscriptionModel.findOne({ email });
        if (existingSubscription) {
            return res.json({ success: false, message: "Email already subscribed" });
        }

        const subscription = new SubscriptionModel({ email });
        await subscription.save();

        res.json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
        res.json({ success: false, message: "Error subscribing" });
    }
};

const getSubscribers = async (req, res) => {
    try {
        const subscribers = await SubscriptionModel.find({}).sort({ subscribedAt: -1 });
        res.json({ success: true, data: subscribers });
    } catch (error) {
        res.json({ success: false, message: "Error fetching subscribers" });
    }
};

const sendPromotion = async (req, res) => {
    try {
        const { subject, message } = req.body;

        if (!subject || !message) {
            return res.json({ success: false, message: "Subject and message are required" });
        }

        const subscribers = await SubscriptionModel.find({});
        
        if (subscribers.length === 0) {
            return res.json({ success: false, message: "No subscribers found" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        res.json({ 
            success: true, 
            message: `Sending promotional email to ${subscribers.length} subscribers...` 
        });

        setImmediate(() => {
            sendEmailsInBackground(subscribers, subject, message, transporter);
        });

    } catch (error) {
        res.json({ success: false, message: "Error sending promotional emails" });
    }
};

async function sendEmailsInBackground(subscribers, subject, message, transporter) {
    for (const subscriber of subscribers) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: subscriber.email,
                subject: subject,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
                            <h1 style="color: white; margin: 0;">Little Lemon</h1>
                        </div>
                        <div style="padding: 30px; background-color: #f9fafb;">
                            <div style="white-space: pre-wrap;">${message}</div>
                        </div>
                        <div style="padding: 20px; text-align: center; background-color: #1f2937; color: white;">
                            <p style="margin: 0; font-size: 12px;">© 2025 Little Lemon. All rights reserved.</p>
                        </div>
                    </div>
                `
            };
            
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${subscriber.email}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to send to ${subscriber.email}:`, error.message);
        }
    }
    console.log('All emails processed');
}

export { subscribeEmail, getSubscribers, sendPromotion };