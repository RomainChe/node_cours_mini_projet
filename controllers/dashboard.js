const getDashboardPage = (req, res) => {
  if (!req.session.user) {
    req.flash("error", `Vous n'êtes pas connecter !`);
    return res.redirect("/login");
  }

  const { firstName, lastName } = req.session.user;
  req.flash("error", `Bienvenue sur le dashboard !`);
  res.render("dashboard", { userName: `${firstName} ${lastName}` });
};

export default {
  getDashboardPage,
};
