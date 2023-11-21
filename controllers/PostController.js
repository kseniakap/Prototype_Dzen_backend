//CRUD

import PostModel from "./../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось создать новую запись",
    });
  }
};

// Получение всех записей
export const getAll = async (req, res) => {
  try {
    //Связка
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить все записи",
    });
  }
};

// Получение одной записи
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Запись не найдена",
      });
    }

    res.json(updatedPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить данную запись",
    });
  }
};

//Удаление записи
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось удалить данную запись",
    });
  }
};

//Обновление записи
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Не удалось обновить данную запись",
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(7).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 7);
    res.json(tags);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось получить все записи",
    });
  }
};

// export const getOne = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: "after",
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: "Не удалось вернуть статью",
//           });
//         }
//         if (!doc) {
//           return res.status(404).json({
//             message: "Статья не найдена",
//           });
//         }
//         res.json(doc);
//       }
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       message: "Не удалось получить данную статью",
//     });
//   }
// };
