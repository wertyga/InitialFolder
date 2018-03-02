export default function(req, res, next) {
    if(!req.session.user) {
        req.session.user = req.sessionID;
        req.session.save();
    };
    next();
};