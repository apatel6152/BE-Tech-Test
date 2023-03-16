const Acronym = require('../models/acronym.js');

// Retrieve and return all acronyms from the database.
exports.findAll = (req, res) => {
  Acronym.find()
    .then((acronyms) => {
      res.send(acronyms);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving acronyms.',
      });
    });
};

exports.get = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
  
      // Calculate skip and limit values for pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const limitValue = parseInt(limit);
  
      // Query the database for acronyms that match the search string
      const regex = new RegExp(search, 'i');
      const acronyms = await Acronym.find({ acronym: regex })
        .skip(skip)
        .limit(limitValue)
        .sort({ name: 'asc' });
  
      // Count the total number of acronyms that match the search string
      const count = await Acronym.countDocuments({ acronym: regex });
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(count / limitValue);
  
      // Set response headers
      res.set('X-Total-Count', count);
      res.set('X-Total-Pages', totalPages);
      if (page < totalPages) {
        res.set('Link', `<${req.baseUrl}/acronym?page=${parseInt(page) + 1}&limit=${limitValue}&search=${search}>; rel="next"`);
      }
  
      // Return the list of acronyms
      res.send(acronyms);
    } catch (error) {
      res.status(500).send(error);
    }
}
// Create and Save a new Acronym
exports.create = (req, res) => {
  if (!req.body.acronym) {
    return res.status(400).send({
      message: 'Acronym can not be empty',
    });
  }

  // Create a Acronym
  const acronym = new Acronym({
    acronym: req.body.acronym,
    definition: req.body.definition,
  });

  // Save Acronym in the database
  acronym
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Acronym.',
      });
    });
};

exports.update = async (req, res) => {
    try {
      const acronym = await Acronym.findByIdAndUpdate(req.params.acronymId, req.body, { new: true });
      if (!acronym) {
        return res.status(404).send();
      }
      res.send(acronym);
    } catch (error) {
      res.status(500).send(error);
    }
  }
// exports.update = (req, res) => {
//   Acronym.findByIdAndUpdate(
//     req.params.acronymId,
//     {
//       acronym: req.body.acronym,
//       definition: req.body.definition,
//     },
//     { new: true }
//   )
//     .then((acronym) => {
//       if (!acronym) {
//         return res.status(404).send({
//           message: 'Acronym not found with id ' + req.params.acronymId,
//         });
//       }
//       res.send(acronym);
//     })
//     .catch((err) => {
//       if (err.kind === 'ObjectId') {
//         return res.status(404).send({
//           message: 'Acronym not found with id ' + req.params.acronymId,
//         });
//       }
//     });
// };

exports.delete = async (req, res) => {
    try {
      const acronym = await Acronym.findByIdAndDelete(req.params.acronymId);
      if (!acronym) {
        return res.status(404).send();
      }
      res.send(acronym);
    } catch (error) {
      res.status(500).send(error);
    }
  }