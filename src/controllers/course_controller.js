const courses = [];

const searchCourse = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "İsim parametresi gerekli." });
    }

    const filtered = courses.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filtered.length === 0) {
      return res.status(404).json({ message: "Bu filtreye uygun kurs yok..." });
    }

    return res.status(200).json(filtered);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCourse = async (req, res) => {
  try {
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "Henüz bir kursumuz bulunmamakta..." });
    }
    res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if(!course) {(404).json({ message: "Bu id ye ait kurs bulunamadı..."});
    }

    return res.status(200).json(course);
}


const createCourse = async (req, res) => {
  try {
    const { name, description, stock } = req.body;
    if (!name || !description || !stock) {
      return res
        .status(400)
        .json({ message: "Eksik bilgileri tamamlayıp tekrar deneyiniz..." });
    }

    const newCourse = {
      id: courses.length + 1,
      name,
      description,
      stock,
    };

    courses.push(newCourse);
    return res.status(201).json({ message: "Kurs başarıyla oluşturuldu :)" });
  } catch (error) {
    return res.status(500).json({ message: "Kurs oluşturulamadı..." });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const { name, description, stock } = req.body;

    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return res
        .status(404)
        .json({ message: "Bu id'ye ait kurs bulunamadı..." });
    }

    if (name) course.name = name;
    if (description) course.description = description;
    if (stock) course.stock = stock;

    res.status(200).json({ message: "Kurs düzenlendi :)", updated: course });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const index = courses.findIndex((c) => c.id === courseId);

    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Bu id'ye ait kurs bulunamadı..." });
    }

    const deletedCourse = courses.splice(index, 1);

    return res.status(200).json({
      message: "Kurs silindi :)",
      deleted: deletedCourse[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
};
