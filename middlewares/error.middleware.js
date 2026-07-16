
export const errorH = (err, req, res, next) => {
    const { status = 500, type = 'server error' } = err;
  
    let s = null;
    // דרך לבדוק אם המצב פיתוח הוא DEV
if (process.env.NODE_ENV === 'development') {
    s = err.stack;
}
    const errorrrrr = {
        status, 
        type,
        message: err.message,
        stack: s,
       
    };

    res.status(status).send({ error: errorrrrr });
};

export const notFound = (req, res, next) => {
  const err = new Error('route not found');
  err.status = 404;
  err.type = 'not found';
  next(err);
};