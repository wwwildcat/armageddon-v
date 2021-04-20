import cookie from 'cookie';
import { NextApiRequest } from 'next';

const parseCookies = (req: NextApiRequest) => {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
};

export default parseCookies;
