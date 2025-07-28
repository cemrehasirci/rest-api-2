const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@admin.com",
    password: "$2b$12$l65NMs1XITu78k6dI5JRYe2Wv/pzgQXaV35XZ1X9aAy8/kGVtxicC", //admin123
    role: "admin",
  },
];


const searchUser = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "İsim parametresi gerekli." });
    }

    const filtered = users.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filtered.length === 0) {
      return res.status(404).json({ message: "Bu filtreye uygun user yok..." });
    }

    return res.status(200).json(filtered);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


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

  return res.status(200).json(user);
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
        .json({ message: `Şifreniz ${n} karakterden az olamaz...` });
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
      role: "user",
    };

    users.push(newUser);
    return res.status(201).json({
      message: "Yeni kullanıcı oluşturuldu :)",
      newUser,
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


const deleteUser = async (req, res) => {
  try {
    const req_user = users.find((c) => c.id === req.user.id);
    if (!req_user || req_user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Sadece admin kullanıcı silebilir..." });
    }

    const userId = parseInt(req.params.id);
    const index = users.findIndex((c) => c.id === userId);

    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Bu id'ye ait kullanıcı bulunamadı..." });
    }

    if (userId === 1) {
      return res
        .status(403)
        .json({ message: "Bu kullanıcı silinemez..." });
    }

    const deletedUser = users.splice(index, 1);

    return res.status(200).json({
      message: "Kullanıcı silindi :)",
      deleted: deletedUser[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const changeRole = async (req, res) => {
  try {
    const req_user = users.find((c) => c.id === req.user.id);
    if ( !req_user || req_user.role !== "admin" ) {
      return res
        .status(403)
        .json({ message: "Sadece admin rol değiştirebilir..." });
    }

    const { newRole } = req.body;
    const userId = parseInt(req.params.id);
    const user = users.find((c) => c.id === userId);

    if (!user) {
      return res.status(404).json({ message: "Bu id'de bir kullanıcı yok..." });
    }

    if (user.id === 1) {
      return res
        .status(403)
        .json({ message: "Bu kullanıcının rolü değiştirilemez..." });
    }

    if (user.role === newRole) {
      return res
        .status(500)
        .json({ message: "Kullanıcının rolünde bir değişiklik yapılmadı..." });
    }

    user.role = newRole;

    return res.status(200).json({
      message: "Kullanıcının rolü güncellendi :)",
      user: user,
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports = {
  searchUser,
  getAllUsers,
  getUserById,
  register,
  login,
  deleteUser,
  changeRole,
};
