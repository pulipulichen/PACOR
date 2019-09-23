// Initializes the `uploads` service on path `/uploads`
const createService = require('feathers-sequelize');
const { Uploads } = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7 //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
});

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    multi: true // allowing us to store multiple instances of the model, in the same request
  };

  // Initialize our service with any options it requires
  //app.use('/uploads', new Uploads(options, app));
  app.use('/uploads',
    upload.array('files'), (req, _res, next) => {
      const { method } = req;
      if (method === 'POST' || method === 'PATCH') {
        // I believe this middleware should only transfer
        // files to feathers and call next();
        // and the mapping of data to the model shape
        // should be in a hook.
        // this code is only for this demo.
        req.feathers.files = req.files; // transfer the received files to feathers
        // for transforming the request to the model shape
        const body = [];
        for (const file of req.files)
          body.push({
            description: req.body.description,
            orignalName: file.originalname,
            newNameWithPath: file.path,
            userId: req.user.id
          });
        req.body = method === 'POST' ? body : body[0];
      }
      next();
    }, createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
