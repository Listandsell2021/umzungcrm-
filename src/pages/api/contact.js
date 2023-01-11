export default function (req, res) {

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "w01861c2.kasserver.com",
    auth: {
      user: "shiv@listandsell.de ",
      pass: "7MHvpdKcVua2yV8",
    },
    secure: true,
  });

  const mailData = {
    from: "harpreet@listandsell.de",
    to: "harpreet@listandsell.de",
    subject: `Message From`,
    text: "test",
    html: `<div>hi</div><p>Sent from: hi</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  console.log(req.body);
  res.send("success");
}
