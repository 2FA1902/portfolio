// api/send-email.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const payload = req.body;

        try {
            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.BREVO_API_KEY
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                res.status(200).json({ message: "Email envoyé avec succès" });
            } else {
                res.status(response.status).json({ error: "Échec de l'envoi de l'email" });
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'envoi de l'email" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}
