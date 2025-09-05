/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
admin.initializeApp();

sgMail.setApiKey(
  "SG.iLdPm-stRaGfc-LKP9uvcw.6krkfZpYX3wXwl--Dx2-bfM2T0Ks84Ce0Q1oKY6" +
  "dNts"
);

exports.sendCertificateReviewedEmail = functions.firestore
  .document("certificates/{certId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only send email if status changed to "reviewed"
    if (before.status !== "reviewed" && after.status === "reviewed") {
      const email = after.email;
      const fullName = after.fullName;
      const msg = {
        to: email,
        from: "school@example.com", // Use your school email here
        subject: "Your Certificate Request Has Been Reviewed",
        text: `Dear ${fullName},\n\nYour certificate request has been reviewed by the admin. Please check your account for updates or contact the school office for more information.\n\nThank you!`,
      };
      await sgMail.send(msg);
    }
    return null;
  });

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
