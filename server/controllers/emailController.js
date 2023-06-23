import { getAllEmails } from "../csvReader.js";

const emailController = {};

emailController.getAllEmails = async (req, res) => {
    console.log("GET ALL EMAILS ROUTE HIT");
    const emails = await getAllEmails();
    res.json({emails});
};

emailController.getDuplicateEmails = async (req, res) => {
    const emails = await getAllEmails();
    const duplicates = emails.filter((email, index) => emails.indexOf(email) !== index);
    res.json({emails: duplicates});
};

emailController.emailExists = async (req, res) => {
    const email = req.query.email;
    if (!email) {
        res.status(400).json({ error: "No email provided" });
        return;
    }
    const emails = await getAllEmails();
    const exists = emails.includes(email);
    res.json({ emailExists: exists });
};

export default emailController;
