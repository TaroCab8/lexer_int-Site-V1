/**
 * Lexer_int Mock Integration Framework — Engine Runtime Pipeline Controller
 * Testing backend configuration for structural submission verification
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable Cross-Origin Resource Sharing so your local html files can submit data directly
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Primary Diagnostic Intake Receiver Interface route endpoint
app.post('/api/diagnostic', (req, res) => {
    const { email, targetSystem, notes } = req.body;

    // Server-side baseline input validation constraints checks
    if (!email || !targetSystem) {
        return res.status(400).json({ 
            status: "FAULT", 
            error: "Missing required tracking vectors. Intake transmission rejected." 
        });
    }

    // Output submission data securely inside server terminal stream
    console.log(`\n==================================================`);
    console.log(`[DATA INTAKE ROUTE DETECTED] : System Diagnostic Submitted`);
    console.log(`Timestamp     : ${new Date().toISOString()}`);
    console.log(`Email Vector  : ${email}`);
    console.log(`Target System : ${targetSystem}`);
    console.log(`Notes Layer   : ${notes || 'None provided'}`);
    console.log(`==================================================`);

    // Return deterministic telemetry analysis index response back to view UI block
    return res.status(200).json({
        status: "ONLINE",
        message: "Telemetry packet compiled successfully. Infrastructure entropy structural blueprint ready.",
        receivedPayload: { email, targetSystem }
    });
});

// Boot listening worker channels
app.listen(PORT, () => {
    console.log(`[RUNNING] Local testing backend online at http://localhost:${PORT}`);
    console.log(`[READY] Submit data via the Diagnostic web form component to view live logs.`);
});