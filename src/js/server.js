import express from 'express';
import path from 'path';
import compression from 'compression';
import api from './api';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(compression());

// Use API
app.use('/api', api);

// serve static stuff
app.use(express.static(path.join(__dirname, '../../public')));

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});
