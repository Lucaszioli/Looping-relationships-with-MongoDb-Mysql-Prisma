import app  from './config/expressConfig';

console.log('Starting server...');

app.listen(3030, () => {
    console.log('Connection sucessefully established on port ' +  3030);
});