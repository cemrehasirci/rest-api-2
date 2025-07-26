const users = [];
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "Henüz bir kullanıcımız bulunmamakta..." });
    }
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((c) => c.id === userId);

  if (!user) {
    return res.status(404).json({ message: "Bu id ye ait user bulunamadı..." });
  }

  return res.status(200).json(user)
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen bilgileri tam giriniz..." });
    }

    const n = 6;
    if (password.length < n) {
      return res
        .status(400)
        .json({ message: "Şifreniz 6 karakterden az olamaz..." });
    }

    const user = users.find((c) => c.email === email);
    if (user) {
      return res
        .status(500)
        .json({ message: "Bu email kullanımda lütfen giriş yapın..." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: passwordHash,
    };

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    users.push(newUser);
    return res.status(201).json({
      message: "Yeni kullanıcı oluşturuldu :)",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen bilgileri tam giriniz..." });
    }

    const user = users.find((c) => c.email === email);
    if (!user) {
      return res
        .status(500)
        .json({ message: "Bu mailde bir kullanıcı yok lütfen kayıt olun..." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Şifre hatalı tekrar deneyin..." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Giriş yapıldı :)",
      token,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { getAllUsers, getUserById, register, login };
