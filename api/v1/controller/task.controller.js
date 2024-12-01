const Task = require("../models/task.model");
const paginationHelper = require("../../../helper/pagination");
//[get] /api/v1/task
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  //sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  //end sort
  //pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTask = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTask
  );
  //end pagination
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.json(tasks);
};
//[get]/api/vi/task/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};
