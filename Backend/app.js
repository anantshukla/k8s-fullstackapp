//Express
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');

var router = express.Router();

router.use(cors())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async function (req, res) {
    try {
        res.json(successMessage('This is the inital text that is loaded by the GET request'));
    }
    catch (e) {
        res.json(failureMessage(e));
    }
});

router.post('/postReq', async function (req, res) {
    try {
        res.json(successMessage(`${req.body.msg} from POST request`));
    } catch (e) {
        res.json(failureMessage(e));
    }
});

app.use('/api', router);

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running on PORT: " + (process.env.PORT || 3001))
});


function successMessage(msg) {
    console.log(msg)
    return success = {
        message: msg,
        status: 1
    }
}

function failureMessage(msg) {
    console.log(msg)
    return success = {
        message: msg,
        status: 0
    }
}