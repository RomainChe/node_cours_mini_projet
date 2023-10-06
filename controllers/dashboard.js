const getDashboardPage = (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const { firstName, lastName } = req.session.user;
    res.render('dashboard', { userName: `${firstName} ${lastName}` });
  };
  
  export default {
    getDashboardPage,
  };