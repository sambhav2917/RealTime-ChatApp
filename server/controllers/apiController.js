import axios from 'axios';

const generateavatar =async (req, res) => {
    try {
        const response = await axios.get(`http://api.multiavatar.com/${req.params.id}`, {
            responseType: 'arraybuffer',
        });
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching avatar:', error.message);
        res.status(500).send('Error fetching avatar' + error);
    }
}

export default generateavatar;