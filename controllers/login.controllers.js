module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    console.log(res.newMail);
    res.json({ message: `hummm ${res.newPass} ${res.newMail}` });
    // res.json({ message: "auth.route" });
  },
};
