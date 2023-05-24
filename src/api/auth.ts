import axios from 'axios';

export async function login() {
  const response = await axios.post('/au', {
    userId: 'admin',
    userPwd: 'admin',
  });
  return response;
}
